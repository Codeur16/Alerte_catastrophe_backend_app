const {urgenceTable, imageTable} = require('../config/database');
const { Op } = require('sequelize');

// Rechercher une urgence par titre ou description
async function searchEmergencies(req, res) {
  const name = req.query.name;
  try {
    const emergencies = await urgenceTable.findAll({
      where: {
        [Op.or]: [
          { type: { [Op.like]: `%${name}%` } },
          { description: { [Op.like]: `%${name}%` } },
          { lieu: { [Op.like]: `%${name}%` } },
          // Ajoutez d'autres conditions pour chaque champ que vous souhaitez rechercher
        ],
      },
      include: [{ model: imageTable, as: "Image" }],
    });
    res.json(emergencies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}



module.exports = {
  searchEmergencies
};

 // description: { [Op.like]: `%${name}%` },
          // lieu: { [Op.like]: `%${name}%` },