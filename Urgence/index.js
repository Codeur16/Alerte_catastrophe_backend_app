const { DB, initDB } = require('./src/config/database')
const express = require('express');
const app = express();
const port=3000;
initDB(DB);


const UrgenceRoutes = require('./src/router/urgenceRouter');
const errorHandler = require('./src/middleware/errorHalder');

// Middleware pour la prise en charge du corps des requêtes au format JSON
app.use(express.json());

// Routes pour les urgences
app.use('/urgence', UrgenceRoutes);

// Gestionnaire d'erreurs
app.use(errorHandler);

app.get('/', function (req, res) {
    res.send("Welocme to Emergency service!");
    });



app.listen(port, () => {
    console.log(`Le serveur est en écoute sur le port ${port}`);
  });