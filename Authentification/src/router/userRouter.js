const express = require("express");
const router = express.Router();

const { login } = require("../controller/login-Controller");
const { signup } = require("../controller/signup-Controller");

// Obtenir toutes les urgences
router.post("/login", login);

// Rechercher une urgence par titre ou description
router.post("/signup", signup);

module.exports = router;
