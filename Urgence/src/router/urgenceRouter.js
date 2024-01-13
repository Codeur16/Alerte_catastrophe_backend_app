const express = require("express");
const router = express.Router();

const { searchEmergencies } = require("../controller/rechercher-Controller");
const { getAllUrgence, getUrgenceByDate } = require("../controller/consulter-Controller");
const { createUrgenceWithImages } = require("../controller/signaler-Controller");
const { deleteUrgence, updateUrgence } = require("../controller/deleteUrgence");
const auth = require("../middleware/auth")
const multer = require('multer');
// Middleware pour la gestion du téléchargement des fichiers
const upload = multer({ dest: 'uploads/' });
// Route pour la création d'un post avec des images
router.post('/:userId/create',auth, upload.array('images', 5), createUrgenceWithImages);
// Obtenir toutes les urgences
router.get("/", getAllUrgence);

// Rechercher une urgence par titre ou description
router.get("/search", searchEmergencies);
 // delete urgence
 router.delete("/delete/:urgenceId", deleteUrgence)
 //update urgence
 router.put("/update/:urgenceId", updateUrgence)

module.exports = router;
