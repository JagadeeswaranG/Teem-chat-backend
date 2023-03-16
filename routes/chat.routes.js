var express = require('express');
const { authenticate } = require('../config/authentication');
const { accessChat, fetchChat, createGroupChat, renameGroup, addTOGroup, removeFromGroup } = require('../controller/chat.controller');
var router = express.Router();

/* Chat Routes */
router.post('/', authenticate, accessChat);
router.get('/', authenticate, fetchChat);
router.post('/group', authenticate, createGroupChat);
router.put('/rename', authenticate, renameGroup);
router.put('/groupadd', authenticate, addTOGroup);
router.put('/groupremove', authenticate, removeFromGroup);


module.exports = router;
