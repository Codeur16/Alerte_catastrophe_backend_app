const { DB, initDB } = require('./src/config/database')
const express = require('express');
const app = express();
const port=3006;
initDB(DB);


const commentRouter = require("./src/router/commentRouter")
const errorHandler = require('./src/middleware/errorHalder');

// Middleware pour la prise en charge du corps des requêtes au format JSON
app.use(express.json());

// Routes pour les urgences
app.use('/comment', commentRouter);

// Gestionnaire d'erreurs
app.use(errorHandler);

app.get('/', function (req, res) {
    res.send("Welocme to comments service!");
    });



app.listen(port, () => {
    console.log(`Le serveur est en écoute sur le port ${port}`);
  });