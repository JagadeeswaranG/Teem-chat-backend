var express = require('express');
const { authenticate } = require('../config/authentication');
const { userSignup, userLogin, allUsers } = require('../controller/users.controller');
var router = express.Router();

/* Users Routes */
router.post('/login', userLogin);

router.post('/signup', userSignup);

router.get("/", authenticate, allUsers);

module.exports = router;
