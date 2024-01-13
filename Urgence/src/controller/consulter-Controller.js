// const { urgenceTable, imageTable } = require('../config/database');

// // Récupérer toutes les urgences avec leurs images
// async function getAllUrgence(req, res) {
//   try {
//     const urgencesWithImages = await urgenceTable.findAll({
//       order: [['createdAt', 'DESC']],
//       // include: [{ model: imageTable, as: "Image" }],
//     });
    
//     if (!urgencesWithImages || urgencesWithImages.length === 0) {
//       return res.status(404).json({ message: "Aucune urgence trouvée." });
//     }

//     return res.status(200).json(urgencesWithImages);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Erreur serveur' });
//   }
// }

const { urgenceTable, imageTable } = require('../config/database');

// Récupérer toutes les urgences avec leurs images
async function getAllUrgence(req, res) {
  try {
    const allUrgences = await urgenceTable.findAll({
      order: [['createdAt', 'DESC']],
    });

    if (!allUrgences || allUrgences.length === 0) {
      return res.status(404).json({ message: "Aucune urgence trouvée." });
    }

    // Pour chaque urgence, récupérer les images associées
    const urgencesWithImages = await Promise.all(allUrgences.map(async (urgence) => {
      const images = await imageTable.findAll({
        where: { urgence_Id: urgence.urgenceId },
      });

      return {
        ...urgence.toJSON(),
        images: images.map(image => image.toJSON()),
      };
    }));

    return res.status(200).json(urgencesWithImages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}



// obtenir les urgenges par ordre decroissant de date de creation
async function getUrgenceByDate(req, res) {
  try {
    const emergencies = await urgenceTable.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(emergencies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}

// Récupérer toutes les urgences avec leurs images
async function getAllUrgencesWithImages(req, res) {
  try {
    const urgencesWithImages = await urgenceTable.findAll({
      include: [{ model: imageTable }],
    });

    if (!urgencesWithImages || urgencesWithImages.length === 0) {
      return res.status(404).json({ message: "Aucune urgence trouvée." });
    }

    return res.status(200).json(urgencesWithImages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}
module.exports = {
    getAllUrgence,
    getUrgenceByDate,
    getAllUrgencesWithImages
  };