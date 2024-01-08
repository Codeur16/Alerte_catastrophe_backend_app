const express = require("express");
const router = express.Router();

const { login } = require("../controller/login-Controller");
const { signup } = require("../controller/signup-Controller");
const { newUrgence } = require("../controller/creerUrgence");

// Obtenir toutes les urgences
router.post("/login", login);

// Rechercher une urgence par titre ou description
router.post("/signup", signup);
// creer une urgence 
router.post('/:userId/create-post', newUrgence );

module.exports = router;
