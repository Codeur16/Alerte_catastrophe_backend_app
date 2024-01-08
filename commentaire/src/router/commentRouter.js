const express = require("express");
const router = express.Router();


const { addComment, updateComment, deleteComment, getAllComments } = require("../controller/comment-Controller");
const { createCommentWithPost } = require("../controller/createComment");

// Commenter une urgence signalée
router.post("/create", createCommentWithPost);
// modifier un commentaire 
router.put("/:commentId", updateComment);
//supprimer un commentaire
router.delete("/:commentId", deleteComment);
// get all comments
router.get("/:urgenceId/comments", getAllComments);
module.exports = router;
