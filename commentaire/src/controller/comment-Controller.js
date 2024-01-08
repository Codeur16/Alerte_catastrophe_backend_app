const { commentTable } = require("../config/database");
// Ajouter un commentaire

// modifier un commentaire 
const updateComment = (req, res) => {
  const { commentId } = req.params;

  commentTable
    .findByPk(commentId)
    .then((comments) => {
      if (!comments) {
        return res.status(404).send({ message: "commentaire inexistante ! " });
      }

      const updatedComments = comments.update({
        ...req.body,
        contenu:comments.contenu
      });

      updatedComments.then((updatedComments) => {
        const message = `Le commentaire ${updatedComments.contenu} a bien été modifié`;
        return res.status(200).json({ message, data: updatedComments });
      });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ message: "Erreur lors de la modification d'un commentaire" });
    });
};

// supprimer un commantaire
const deleteComment = (req, res) => {
  const { commentId } = req.params;

  commentTable
    .findByPk(commentId)
    .then((comments) => {
      if (!comments) {
        return res.status(404).send({ message: "commentaire inexistante ! " });
      }

      const deletedComments = comments.destroy();

      deletedComments.then(() => {
        const message = `Le commentaire a bien été supprimé`;
        return res.status(200).json({ message });
      });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ message: "Erreur lors de la suppression d'un commentaire" });
    });
};
// obtenier tous les commentaires d'un post
const getAllComments = (req, res) => {
  const { urgenceId } = req.params;



       commentTable.findAll({where:{
        urgenceId:urgenceId
      }})
      .then((comments)=>{
        const message = `Les commentaires ont bien été récupérés`;
        return res.status(200).json({ message, data: comments });
      })

      // return res.status(200).json({ data: comments });
    // })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des commentaires" });
    });
};
module.exports = { updateComment, deleteComment, getAllComments
};
