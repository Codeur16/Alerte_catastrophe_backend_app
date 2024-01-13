const { commentTable } = require("../config/database");

// modifier un commentaire
const updateComment = (req, res) => {
  const { commentId } = req.params;

  commentTable
    .findByPk(commentId)
    .then((comment) => {
      if (!comment) {
        return res.status(404).send({ message: "Commentaire inexistant !" });
      }

      commentTable
        .update(
          { ...req.body },
          { where: { commentId: commentId } } // Ajoutez l'attribut "where" avec la condition pour spécifier quel commentaire mettre à jour
        )
        .then(() => {
          const message = `Le commentaire ${comment.contenu} a bien été modifié`;
          return res.status(200).json({ message, data: comment });
        })
        .catch((err) => {
          console.error(err);
          res
            .status(500)
            .json({
              message: "Erreur lors de la modification d'un commentaire",
            });
        });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ message: "Erreur lors de la recherche du commentaire" });
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

// delete where urgence id =


const deleteAllforUrgence = (req, res) => {
  const { urgenceId } = req.params;

  commentTable
    .destroy({
      where: { urgenceId: urgenceId },
    })
    .then((deletedRows) => {
      if (deletedRows === 0) {
        return res.status(404).json({ message: "Aucun commentaire trouvé pour la suppression." });
      }

      const message = `Tous les commentaires liés à l'urgenceId ${urgenceId} ont été supprimés avec succès.`;
      return res.status(200).json({ message });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Erreur lors de la suppression des commentaires." });
    });
};

// obtenier tous les commentaires d'un post
const getAllComments = (req, res) => {
  const { urgenceId } = req.params;

  commentTable
    .findAll({
      where: {
        urgenceId: urgenceId,
      },
      order: [["createdAt", "DESC"]],
    })
    .then((comments) => {
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
module.exports = { updateComment, deleteComment, getAllComments ,deleteAllforUrgence };
