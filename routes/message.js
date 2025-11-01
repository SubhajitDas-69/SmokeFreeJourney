const express = require("express");
const multer = require("multer");
const {storage} = require("../cloudConfig");
const router = express.Router();
const upload = multer({storage});
const messageController = require("../controllers/message");

router.post("/", messageController.message);
router.post("/stopMails", messageController.stopMessage);

module.exports = router;