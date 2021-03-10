const User = require('../models/user');

const bcrypt = require('bcrypt');
const saltRounds = 10;

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
    const user = new User();

    bcrypt.hash(body.password, saltRounds, (err, hash) => {
        user.firstName = body.firstName
        user.lastName = body.lastName
        user.email = body.email
        user.password = hash

        user.save()
            .then(() => {
                User.findOne({email: body.email})
                    .then(docs => res.json(docs))
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    });
}

updateUser = (req, res) => {
    const {body} = req

    User.updateOne({_id: req.params.id}, body)
        .then(() => docs => res.json(docs))
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