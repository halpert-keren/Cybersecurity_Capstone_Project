const {Schema, model} = require('mongoose');

const messageSchema = new Schema({
    sender: {type: String, required: true},
    receiver: {type: String, required: true},
    textMessage: {type: String, required: true},
}, {collection: 'messages'});

const Message = model('Message', messageSchema);
module.exports = Message;