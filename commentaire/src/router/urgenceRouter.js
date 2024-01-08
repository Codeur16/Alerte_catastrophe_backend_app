const express = require("express");
const router = express.Router();


const { addComment, updateComment, deleteComment, getAllComments } = require("../controller/comment-Controller");


// Commenter une urgence signalée
router.post("/:urgenceId/comments", addComment);
// modifier un commentaire 
router.put("/:commentId", updateComment);
//supprimer un commentaire
router.delete("/:commentId", deleteComment);
// get all comments
router.get("/:urgenceId/comments", getAllComments);
module.exports = router;
