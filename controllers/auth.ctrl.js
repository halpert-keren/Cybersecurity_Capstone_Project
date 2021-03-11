const User = require('../models/user');
const Crypt = require('cryptr');
const crypt = new Crypt(process.env.encryptionKey);
const userController = require('../controllers/user.ctrl');

login = async (req, res) => {
    const {body} = req

    await User.find({})
        .then(docs => {
            for (const doc of docs) {
                if (body.email === doc.email)
                    if (body.password === crypt.decrypt(doc.password)) {
                        res.json(doc)
                    } else {
                        res.json({fail: "Bad Password"})
                    }
            }
        })
        .catch(err => console.log(err))

    res.json({fail: "No username"})
}

signup = (req, res) => {

}

logout = (req, res) => {

}

module.exports = {
    login,
    signup,
    logout
}