const Message = require('../models/message');
const Crypt = require('cryptr');
const crypt = new Crypt(process.env.encryptionKey);

getMessages = (req, res) => {
    if(req.query.email) {
        Message.find({
            $or: [{sender: req.query.email}, {receiver: req.query.email}]
        })
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
        Message.find({})
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