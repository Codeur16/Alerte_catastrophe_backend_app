const express = require("express");
const router = express.Router();

const { Hello } = require("../controller/notif-Controller");

// racine
router.post('/hello', Hello);

module.exports = router;
