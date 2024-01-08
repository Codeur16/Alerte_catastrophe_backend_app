const express = require("express");
const router = express.Router();

const { searchEmergencies } = require("../controller/rechercher-Controller");
const { getAllUrgence, getUrgenceByDate } = require("../controller/consulter-Controller");
const { addComment, updateComment, deleteComment, getAllComments } = require("../controller/comment-Controller");
// const { createUrgence } = require("../controller/signaler-Controller");
const { createUrgenceWithImages } = require("../controller/signaler-Controller");

const multer = require('multer');
// Middleware pour la gestion du téléchargement des fichiers
const upload = multer({ dest: 'uploads/' });
// Route pour la création d'un post avec des images
router.post('/create', upload.array('images', 5), createUrgenceWithImages);




// Obtenir toutes les urgences
router.get("/", getAllUrgence);

// Rechercher une urgence par titre ou description
router.get("/search", searchEmergencies);

// // Signaler une urgence
// router.post("/create", createUrgence);

// Commenter une urgence signalée
router.post("/:urgenceId/comments", addComment);
// modifier un commentaire 
router.put("/:commentId", updateComment);
//supprimer un commentaire
router.delete("/:commentId", deleteComment);
// get all comments
router.get("/:urgenceId/comments", getAllComments);
module.exports = router;
