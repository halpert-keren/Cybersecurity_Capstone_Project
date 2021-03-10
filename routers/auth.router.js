const {Router} = require('express');
const router = new Router();

const authController = require('../controllers/auth.ctrl');

router.get('/logout', authController.logout);
router.post('/', authController.login);

module.exports = {router};