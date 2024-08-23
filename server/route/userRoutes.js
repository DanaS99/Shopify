const express = require('express');
const router = express.Router();
const { login, signup } = require('../controller/userController');
const { signupValidation, loginValidation } = require('../Middleware/AuthValidation');


router.post('/login', loginValidation ,login);

router.post('/signup', signupValidation, signup);

module.exports = router;