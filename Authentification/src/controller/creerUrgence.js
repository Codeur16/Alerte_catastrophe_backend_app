const axios = require("axios");

const newUrgence = (req, res) => {
  // Récupérer l'ID de l'utilisateur à partir des paramètres de l'URL
  const userId = req.params.userId;

  // Récupérer les données du corps de la requête
  const body = req.body;

  // Exemple : Utilisation de la bibliothèque 'axios' pour faire une requête HTTP
  // const axios = require('axios');

  axios
    .post("http://localhost:3000/urgence/create", {
      ...body, // Copie tous les champs du corps de la requête
      userId: userId, // Remplace la valeur du champ userId
    })
    .then((response) => {
      // Répondre à la demande
      res.status(201).json({ message: "Article créé avec succès par le user" });
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la création de l'article" });
    });
};

module.exports = { newUrgence };