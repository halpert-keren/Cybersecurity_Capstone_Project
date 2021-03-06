const User = require('../models/user');
const Crypt = require('cryptr');
const crypt = new Crypt(process.env.encryptionKey);

getUsers = (req, res) => {
    User.find({})
        .then(docs => res.json(docs))
        .catch(err => console.log(err))
}

getUser = (req, res) => {
    User.findOne({_id: req.params.id})
        .then(docs => res.json(docs))
        .catch(err => console.log(err))
}

createUser = (req, res) => {
    const {body} = req
    // username, password, email

    User.findOne({email: body.email})
        .then(doc => {
            if(doc !== null)
                res.json({fail: "email exists"})
        })
        .catch(err => console.log(err))

    const user = new User();

    user.username = body.username
    user.email = body.email
    user.password = crypt.encrypt(body.password)

    user.save()
        .then(() => res.json({_id: `${user._id}`}))
        .catch(err => console.log(err))
}

updateUser = (req, res) => {
    const {body} = req
    // password

    User.updateOne({_id: req.params.id}, {$set: {password: crypt.encrypt(body.password), passCode: ''}})
        .then(docs => res.json(docs))
        .catch(err => console.log(err))
}

deleteUser = (req, res) => {
    User.deleteOne({_id: req.params.id})
        .then(() => res.json({success: true}))
        .catch(err => console.log(err))
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}