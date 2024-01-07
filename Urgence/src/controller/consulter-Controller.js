const {urgenceTable} = require('../config/database');

// Obtenir toutes les urgences
async function getAllUrgence(req, res) {
  try {
    const emergencies = await urgenceTable.findAll();
    res.json(emergencies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
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

module.exports = {
    getAllUrgence,
    getUrgenceByDate
  };