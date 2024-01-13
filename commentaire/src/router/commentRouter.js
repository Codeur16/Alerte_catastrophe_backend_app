const express = require("express");
const router = express.Router();
const auth= require("../middleware/auth")

const { updateComment, deleteComment, getAllComments, deleteAllforUrgence } = require("../controller/comment-Controller");
const { createCommentWithPost } = require("../controller/createComment");

// Commenter une urgence signalée
router.post("/:urgenceId/create", createCommentWithPost);
// modifier un commentaire 
router.put("/update/:commentId" ,auth, updateComment);
//supprimer un commentaire
router.delete("/delete/:commentId",auth, deleteComment);
//delete all for urgence
router.delete('/:urgenceId/delete', deleteAllforUrgence)
// get all comments
router.get("/:urgenceId/comments", getAllComments);
module.exports = router;
