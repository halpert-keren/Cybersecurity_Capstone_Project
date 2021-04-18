const User = require('../models/user');
const Crypt = require('cryptr');
const crypt = new Crypt(process.env.encryptionKey);
const userController = require('../controllers/user.ctrl');

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

login = async (req, res) => {
    const {body} = req
    // password, username/email
    console.log(body)
    await User.find({})
        .then(docs => {
            for (const doc of docs) {
                if (body.username === doc.username || body.username === doc.email) {
                    if (body.password === crypt.decrypt(doc.password)) {
                        res.json(doc)
                    } else {
                        res.json({fail: 'bad password'})
                    }
                }
            }
        })
        .catch(err => console.log(err))
}

signup = (req, res) => {
    // password, email, username
    userController.createUser(req, res)
}

getPassCode = (req, res) => {
    const {body} = req
    // email
    const code = Math.floor(Math.random() * Math.floor(1000000));

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: body.email,
        subject: 'One time pass code for the message app',
        text: 'This is a one time pass code in the event of forgotten password.\n' +
            'Use this code to login and then change your password.\n' +
            'Pass code: ' + code + ' \n'
    }

    User.updateOne({email: body.email}, {$set: {passCode: crypt.encrypt(code)}})
        .then(() => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.sendStatus(500)
                } else {
                    res.sendStatus(200)
                }
            })
        })
        .catch(err => console.log(err))
}

loginPassCode = async (req, res) => {
    const {body} = req
    // passCode, email
    console.log(body.email)
    await User.findOne({email: body.email})
        .then(doc => {
            console.log(doc)
            if(doc == null) {
                res.json({fail: "No user with this username or email"})
            }
            else if (body.passCode === crypt.decrypt(doc.passCode)) {
                res.json(doc)
            } else {
                res.json({fail: "Bad Pass Code"})
            }
        })
        .catch(err => console.log(err))

// await User.find({})
//     .then(docs => {
//         for (const doc of docs) {
//             if (body.email === doc.email) {
//                 if (body.passCode === crypt.decrypt(doc.passCode)) {
//                     res.json(doc)
//                 } else {
//                     res.json({fail: "Bad Pass Code"})
//                 }
//             }
//         }
//     })
//     .catch(err => console.log(err)
}

module.exports = {
    login,
    signup,
    getPassCode,
    loginPassCode
}