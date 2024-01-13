const express = require('express');
const { DB, initDB } = require('./src/config/database')
const NotifRoutes = require('./src/router/notifRouter');
const errorHandler = require('./src/middleware/errorHalder');
initDB(DB);

const app = express();
const port = 3004;







// Middleware pour la prise en charge du corps des requêtes au format JSON
app.use(express.json());

// Routes pour les urgences
app.use('/notificaton', NotifRoutes);

// Gestionnaire d'erreurs
app.use(errorHandler);

app.get('/', function (req, res) {
    res.send("Welocme to notification service!");
    });



    app.listen(port, () => {
        console.log(`Le serveur est en écoute sur le port ${port}: localhost:3004`);
    });
    