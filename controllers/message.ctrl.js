const Message = require('../models/message');
const Crypt = require('cryptr');
const crypt = new Crypt(process.env.encryptionKey);

getMessages = (req, res) => {
    if(req.query.userID) {
        Message.find({
            $or: [{senderID: req.query.userID}, {receiverID: req.query.userID}]
        })
            .then(docs => {
                let results = []
                for (const doc of docs) {
                    results.push({
                        senderID: doc.senderID,
                        receiverID: doc.receiverID,
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
                        senderID: doc.senderID,
                        receiverID: doc.receiverID,
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
            senderID: docs.senderID,
            receiverID: docs.receiverID,
            textMessage: crypt.decrypt(docs.textMessage),
        }))
        .catch(err => console.log(err))
}

createMessage = (req, res) => {
    const {body} = req
    const message = new Message();

    message.senderID = body.senderID
    message.receiverID = body.receiverID
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