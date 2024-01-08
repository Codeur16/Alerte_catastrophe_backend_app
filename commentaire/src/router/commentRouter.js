const express = require("express");
const router = express.Router();
const auth= require("../middleware/auth")

const { addComment, updateComment, deleteComment, getAllComments } = require("../controller/comment-Controller");
const { createCommentWithPost } = require("../controller/createComment");

// Commenter une urgence signalée
router.post("/create",auth, createCommentWithPost);
// modifier un commentaire 
router.put("/update/:commentId" ,auth, updateComment);
//supprimer un commentaire
router.delete("/delete/:commentId",auth, deleteComment);
// get all comments
router.get("/:urgenceId/comments", getAllComments);
module.exports = router;
