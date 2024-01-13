const { adresseCommentaire } = require("../config/adresse");
const { urgenceTable, imageTable } = require("../config/database");
const axios = require("axios");
// Supprimer une urgence et ses images associées
async function deleteUrgence(req, res) {
  const urgenceIdToDelete = req.params.urgenceId;

  // Désactiver temporairement les contraintes de clé étrangère
  await urgenceTable.sequelize.query("PRAGMA foreign_keys=OFF;");

  try {
    // Supprimer l'urgence
    const deletedUrgence = await urgenceTable.destroy({
      where: { urgenceId: urgenceIdToDelete },
    });

    if (deletedUrgence === 0) {
      // Aucune urgence supprimée (peut-être parce qu'elle n'existe pas)
      return res
        .status(404)
        .json({ message: "Aucune urgence trouvée pour la suppression." });
    }

    // Supprimer toutes les images associées à l'urgence
    await imageTable.destroy({
      where: { urgence_Id: urgenceIdToDelete },
    });
    // Supprimer les commentaires associés à l'urgence (via une requête Axios DELETE)
    try{
    await axios.delete(
      adresseCommentaire+"/comment/"+urgenceIdToDelete+"/delete" 
    );
    }
    catch(err){console.log(err)}


    return res
      .status(200)
      .json({ message: "Urgence et images associées supprimées avec succès." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur lors de la suppression." });
  } finally {
    // Réactiver les contraintes de clé étrangère
    await urgenceTable.sequelize.query("PRAGMA foreign_keys=ON;");
  }
}

// update urgence and images

// Mettre à jour une urgence et ses images associées
async function updateUrgence(req, res) {
  const urgenceIdToUpdate = req.params.urgenceId;
  const updatedUrgenceData = req.body; // Assurez-vous que le corps de la requête contient les nouvelles données de l'urgence

  // Désactiver temporairement les contraintes de clé étrangère
  await urgenceTable.sequelize.query("PRAGMA foreign_keys=OFF;");

  try {
    // Mettre à jour l'urgence
    const [updatedRows] = await urgenceTable.update(updatedUrgenceData, {
      where: { urgenceId: urgenceIdToUpdate },
    });

    if (updatedRows === 0) {
      // Aucune urgence mise à jour (peut-être parce qu'elle n'existe pas)
      return res
        .status(404)
        .json({ message: "Aucune urgence trouvée pour la mise à jour." });
    }

    // Supprimer toutes les images associées à l'urgence
    await imageTable.destroy({
      where: { urgenceId: urgenceIdToUpdate },
    });

    // Insérer les nouvelles images associées à l'urgence
    const newImages = req.body.images; // Assurez-vous que le corps de la requête contient les nouvelles images
    if (newImages && newImages.length > 0) {
      await imageTable.bulkCreate(
        newImages.map((image) => ({ ...image, urgenceId: urgenceIdToUpdate }))
      );
    }

    return res
      .status(200)
      .json({
        message: "Urgence et images associées mises à jour avec succès.",
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur lors de la mise à jour." });
  } finally {
    // Réactiver les contraintes de clé étrangère
    await urgenceTable.sequelize.query("PRAGMA foreign_keys=ON;");
  }
}

module.exports = { updateUrgence, deleteUrgence };
