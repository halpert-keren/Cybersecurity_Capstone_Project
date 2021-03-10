const {Router} = require('express');
const router = new Router();

const messageController = require('../controllers/message.ctrl');

router.get('/', messageController.getMessages);
router.get('/:id', messageController.getMessage);
router.post('/', messageController.createMessage);
router.put('/:id', messageController.updateMessage);
router.delete('/:id', messageController.deleteMessage);

module.exports = {router};