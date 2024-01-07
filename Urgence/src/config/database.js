
const {Sequelize, DataTypes} =require('sequelize');
const urgence = require('../model/urgenceModel');
const comment = require('../model/commentModel');


// Créer une instance Sequelize avec les informations de connexion
const DB = new Sequelize({
  dialect: 'sqlite',
  storage: './Urgence.db', // Chemin vers le fichier de la base de données SQLite
});

// Tester la connexion à la base de données
DB
  .authenticate()
  .then(() => {
    console.log('Connexion à la base de données SQLite établie avec succès.');
  })
  .catch((error) => {
    console.error('Impossible de se connecter à la base de données SQLite:', error);
  });
  function initDB(db){
    console.log("initialisation des tables de la base de donnees");
    // return db.sync({ alter: true })
    return db.sync({ force: true })
    
  }
//creation des tables  
const commentTable = comment(DB, DataTypes);
const urgenceTable = urgence(DB, DataTypes);

module.exports = {DB, initDB, commentTable, urgenceTable};