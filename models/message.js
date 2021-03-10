const {Schema, model} = require('mongoose');

const messageSchema = new Schema({
    senderID: {type: String, required: true},
    receiverID: {type: String, required: true},
    textMessage: {type: String, required: true},
}, {collection: 'messages'});

const Message = model('User', messageSchema);
module.exports = Message;