const express = require("express");
const router = express.Router();

const { searchEmergencies } = require("../controller/rechercher-Controller");
const { getAllUrgence, getUrgenceByDate } = require("../controller/consulter-Controller");
const { createUrgenceWithImages } = require("../controller/signaler-Controller");
const { newCommentaire } = require("../controller/comment-Controller");

const multer = require('multer');
// Middleware pour la gestion du téléchargement des fichiers
const upload = multer({ dest: 'uploads/' });
// Route pour la création d'un post avec des images
router.post('/create', upload.array('images', 5), createUrgenceWithImages);

//commentaire d'une urgence

router.post("/:urgenceId/comments", newCommentaire);



// Obtenir toutes les urgences
router.get("/", getAllUrgence);

// Rechercher une urgence par titre ou description
router.get("/search", searchEmergencies);

module.exports = router;
