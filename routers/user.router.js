const {Router} = require('express');
const router = new Router();

const userController = require('../controllers/user.ctrl');

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = {router};