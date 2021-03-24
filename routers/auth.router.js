const {Router} = require('express');
const router = new Router();

const authController = require('../controllers/auth.ctrl');

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.post('/get-passcode', authController.getPassCode);
router.post('/login-passcode', authController.loginPassCode);

module.exports = {router};