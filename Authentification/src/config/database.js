
const {Sequelize, DataTypes} =require('sequelize');
const userModel = require('../model/userModel');


// Créer une instance Sequelize avec les informations de connexion
const DB = new Sequelize({
  dialect: 'sqlite',
  storage: './auth.db', // Chemin vers le fichier de la base de données SQLite
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
const userTable = userModel(DB, DataTypes);

module.exports = {DB, initDB, userTable};