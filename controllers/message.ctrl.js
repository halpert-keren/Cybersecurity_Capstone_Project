const Message = require('../models/message');
const Crypt = require('cryptr');
const crypt = new Crypt(process.env.encryptionKey);

getMessages = (req, res) => {
    if(req.query.username) {
        Message.find({
            $or: [{sender: req.query.username}, {receiver: req.query.username}]
        }).sort({_id: -1})
            .then(docs => {
                let results = []
                for (const doc of docs) {
                    results.push({
                        sender: doc.sender,
                        receiver: doc.receiver,
                        textMessage: crypt.decrypt(doc.textMessage),
                    })
                }
                res.json(results)
            })
            .catch(err => console.log(err))
    } else {
        Message.find({}).sort({_id: -1})
            .then(docs => {
                let results = []
                for (const doc of docs) {
                    results.push({
                        sender: doc.sender,
                        receiver: doc.receiver,
                        textMessage: crypt.decrypt(doc.textMessage),
                    })
                }
                res.json(results)
            })
            .catch(err => console.log(err))
    }
}

getMessage = (req, res) => {
    Message.findOne({_id: req.params.id})
        .then(docs => res.json({
            sender: docs.sender,
            receiver: docs.receiver,
            textMessage: crypt.decrypt(docs.textMessage),
        }))
        .catch(err => console.log(err))
}

createMessage = (req, res) => {
    const {body} = req
    // sender, receiver, textMessage
    const message = new Message();

    message.sender = body.sender
    message.receiver = body.receiver
    message.textMessage = crypt.encrypt(body.textMessage);

    message.save()
        .then(() => res.json({_id: `${message._id}`}))
        .catch(err => console.log(err))
}

updateMessage = (req, res) => {
    const {body} = req
    // textMessage

    Message.updateOne({_id: req.params.id}, {$set: {textMessage: crypt.encrypt(body.textMessage)}})
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