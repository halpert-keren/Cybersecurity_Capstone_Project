const User = require('../models/user');

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

createUser = (token, req, res) => {
    const user = new User();

    user.firstName = token['f_name']
    user.lastName = token['l_name']
    user.email = token['email']
    user.password = token['avatar']

    user.save()
        .then(() => docs => res.json(docs))
        .catch(err => console.log(err))
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