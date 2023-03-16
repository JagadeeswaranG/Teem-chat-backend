var express = require("express");
const { authenticate } = require("../config/authentication");
const { sendMessage, allMessages } = require("../controller/message.controller");
var router = express.Router();

/* Message Routers */
router.post("/", authenticate, sendMessage);

router.get("/:chatId", authenticate, allMessages);

module.exports = router;
