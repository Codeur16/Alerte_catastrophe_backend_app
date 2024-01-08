const { commentTable } = require("../config/database");

const createCommentWithPost = async (req, res) => {

    const { contenu, urgenceId } = req.body;
    if(!contenu || !urgenceId){
        return res.status(201).json({ message: "donnee insufisant" });
    }
  try {
    

    // Créer le commentaire
    const createCommentaire = await commentTable.create({ contenu, urgenceId });

    // Associer les images créées au commentaire
   

    return res
      .status(201)
      .json({ message: "commentaire créé avec succès", data: createCommentaire });
  } catch (error) {
    console.error("Erreur lors de la création du commentaire:", error);
    res.status(500).json({ error: "Erreur lors de la création du commentaire niveau commentaire" });
  }

};

module.exports = { createCommentWithPost };
