const { urgenceTable, imageTable } = require("../config/database");
const { adresseNotification } = require("../config/adresse");
const axios = require("axios");
// Définissez votre fonction de création de urgence avec des images
const createUrgenceWithImages = async (req, res) => {
  // recuperation de l'id du user
  const userID = req.params.userId;
  try {
    const { type, description, lieu, date, images } = req.body;

    // Créer le urgence
    const createdurgence = await urgenceTable.create({
      userId: userID,
      type,
      description,
      lieu,
      date,
    });
    //Enregistrement des image dans la table image
     try {
      await axios.post(adresseNotification + "/notificaton/create", {
        titre: type,
        message: description,
        type: "urgence",
      });
      console.log("Une notification a été créée avec succès !");
    } catch (notificationError) {
      console.error("Erreur lors de la création de la notification :", notificationError);
      // Vous pouvez choisir d'ignorer l'erreur de notification et continuer
    }
    // Enregistrer les images associées au urgence
    const imagePromises = images.map(async (image) => {
      // const { filename, contentType, data } = image;
      const createdImage = await imageTable.create({
        url: image,
        urgence_Id: createdurgence.urgenceId,
      });
      return createdImage;
    });

    const createdImages = await Promise.all(imagePromises);

    // Associer les images créées au urgence
  
    return res.status(201).json({ message: "L'urgence a ete creer avec succes", data:createdurgence, images: createdImages });
  } catch (error) {
    console.error("Erreur lors de la création du urgence:", error);
    res.status(500).json({ error: "Erreur lors de la création du urgence" });
  }
};

module.exports = { createUrgenceWithImages };
