const {urgenceTable} = require('../config/database');
const { Op } = require('sequelize');

// Rechercher une urgence par titre ou description
async function searchEmergencies(req, res) {
  const name = req.query.name;
  try {
    const emergencies = await urgenceTable.findAll({
      where: {
        [Op.or]: [
          { titre: { [Op.like]: `%${name}%` } }
          // { description: { [Op.like]: `%${query}%` } },
        ],
      },
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