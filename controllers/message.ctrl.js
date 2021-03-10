const Message = require('../models/message');

getMessages = (req, res) => {
    Message.find({})
        .then(docs => res.json(docs))
        .catch(err => console.log(err))
}

getMessage = (req, res) => {
    Message.findOne({_id: req.params.id})
        .then(docs => res.json(docs))
        .catch(err => console.log(err))
}

createMessage = (token, req, res) => {
    const {body} = req
    const message = new Message();

    message.senderID = body.senderID
    message.receiverID = body.receiverID
    message.textMessage = body.textMessage

    message.save()
        .then(() => docs => res.json(docs))
        .catch(err => console.log(err))
}

updateMessage = (req, res) => {
    const {body} = req

    Message.updateOne({_id: req.params.id}, body)
        .then(() => docs => res.json(docs))
        .catch(err => console.log(err))
}

deleteMessage = (req, res) => {
    Message.deleteOne({_id: req.params.id})
        .then(() => res.json({success: true}))
        .catch(err => console.log(err))
}

module.exports = {
    getMessages,
    getMessage,
    createMessage,
    updateMessage,
    deleteMessage
}