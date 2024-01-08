const { urgenceTable, imageTable } = require("../config/database");

// Définissez votre fonction de création de urgence avec des images
const createUrgenceWithImages = async (req, res) => {
  // const { userId, type, description, lieu, date } = req.body;
  // const images = req.files;

  try {
    const { userId, type, description, lieu, date, images } = req.body;

    // Créer le urgence
    const createdurgence = await urgenceTable.create({ userId, type, description, lieu, date });

    // Enregistrer les images associées au urgence
    const imagePromises = images.map(async (image) => {
      // const { filename, contentType, data } = image;
      const createdImage = await imageTable.create({
        url:image,
        // contentType,
        // data,
        urgence_Id: createdurgence.urgenceId,
      });
      return createdImage;
    });

    const createdImages = await Promise.all(imagePromises);

    // Associer les images créées au urgence
   

    res
      .status(201)
      .json({ message: "urgence créé avec succès", data: createdurgence });
  } catch (error) {
    console.error("Erreur lors de la création du urgence:", error);
    res.status(500).json({ error: "Erreur lors de la création du urgence" });
  }

  // try {
  //   // Création du urgence
  //   const newUrgence = await urgenceTable.create({
  //     userId,
  //     type,
  //     description,
  //     lieu,
  //     date,
  //   });

  //     // Enregistrement des images dans la table Image
  //     const imageRecords = await Promise.all(
  //       images.map(async (image) => {
  //         const createdImage = await imageTable.create({
  //           url: image ,
  //           urgenceId: newUrgence.urgenceId, // Correction ici
  //         });
  //         console.log(image)
  //         return createdImage;
  //       })
  //     );

  //     // Association des images au urgence
  //     await newUrgence.setImages(imageRecords);

  //   res.status(201).json({ message: "urgence créé avec succès" });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: "Erreur lors de la création du urgence" });
  // }
};

module.exports = { createUrgenceWithImages };
