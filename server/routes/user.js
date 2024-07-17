const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// define the routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Define routes for 2FA
router.post('/setup-2fa', userController.setup2FA);
router.post('/verify-2fa-setup', userController.verify2FASetup);
router.post('/verity-otp', userController.verifyOTP);

module.exports = router;