const express = require("express");
const router = express.Router();
const { getAllNotif, createNotif} = require("../controller/notif-Controller")

// Obtenir toutes les urgences
router.post("/create", createNotif);

// Rechercher une urgence par titre ou description
router.get("/get", getAllNotif);


module.exports = router;
