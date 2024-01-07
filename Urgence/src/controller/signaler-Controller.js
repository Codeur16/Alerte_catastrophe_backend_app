const {urgenceTable} = require('../config/database');

// Signaler une urgence
async function createUrgence(req, res) {
  const urgence = req.body;

  try {
    const Urgence = await urgenceTable.create(urgence);
    const message = `L'urgence ${urgence.titre} a bien été créé`;
      return res.status(200).json({ message, data: Urgence });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}


module.exports = {
  createUrgence
};