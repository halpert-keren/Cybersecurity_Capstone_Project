const {Router} = require('express');
const router = new Router();

const messageController = require('../controllers/message.ctrl');

router.get('/', messageController.getUsers);
router.get('/:id', messageController.getUser);
router.post('/', messageController.createUser);
router.put('/:id', messageController.updateUser);
router.delete('/:id', messageController.deleteUser);

module.exports = {router};