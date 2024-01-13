const axios = require("axios");
const { userTable } = require("../config/database");
const { adresseUrgence } = require("../config/adresse")

const newUrgence = async (req, res) => {
  // Récupérer l'ID de l'utilisateur à partir des paramètres de l'URL
  const userId = req.params.userId;

  // Récupérer les données du corps de la requête
  const body = req.body;
  // verification de l'existence du user
  await userTable
    .findOne({ where: { userid: userId } })
    .then((users) => {
      if (!users) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }

      axios
        .post(adresseUrgence+"/urgence/create", {
          ...body, // Copie tous les champs du corps de la requête
          userId: userId, // Remplace la valeur du champ userId
        })
        .then((response) => {
          // Répondre à la demande
          res.status(201).json({data:response.data});
        })
        .catch((error) => {
          console.error(error);
          res
            .status(500)
            .json({ error: "Erreur lors de la création d'une urgence " });
        });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({
          error:
            "Erreur lors de la création de la verification d'un utilisateur",
        });
    });
};

module.exports = { newUrgence };
