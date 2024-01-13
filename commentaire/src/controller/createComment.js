const { commentTable } = require("../config/database");
const axios = require("axios");
const { adresseNotification } = require("../config/adresse")
const createCommentWithPost = async (req, res) => {
  // recuperation de l'd de l'urgence a commenter
  const urgenceID= req.params.urgenceId;
  const { contenu, urgenceId } = req.body;
  if (!contenu) {
    return res.status(201).json({ message: "donnee insufisant" });
  }
  try {
    // Créer le commentaire
    const createCommentaire = await commentTable.create({ contenu, urgenceId:urgenceID });

    try{
    if (createCommentaire) {
      // creation d'une notification
      axios.post( adresseNotification+"/notificaton/create", {
        titre: "Nouveau commentaire", // Copie tous les champs du corps de la requête
        message: contenu, // Remplace la valeur du champ userId
        type: "commentaire",
      });
    }
    }
    catch(err){console.log(err)}
    
    // Associer les images créées au commentaire

    return res
      .status(201)
      .json({
        message: "commentaire créé avec succès",
        data: createCommentaire,
      });
  } catch (error) {
    console.error("Erreur lors de la création du commentaire:", error);
    res
      .status(500)
      .json({
        error: "Erreur lors de la création du commentaire niveau commentaire",
      });
  }
};

module.exports = { createCommentWithPost };
