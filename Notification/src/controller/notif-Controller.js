const { notifTable } = require("../config/database");

const createNotif= (req, res) => {
  // Logique de création de l'urgence
 const { titre, message, type} = req.body;
  // Création d'une nouvelle notification
  notifTable.create({
    titre: titre,
    message:message,
    type:type
    // Autres attributs de la notification si nécessaire
  })
    .then((notification) => {
      // Traitement supplémentaire si nécessaire
      return res.status(200).send({ message: 'Urgence créée avec succès', data:notification });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: 'Erreur serveur lors de la création de la notif' });
    });
};

// get all notification
const getAllNotif= (req, res) => {
  // Logique de récupération de toutes les notifications
  notifTable.findAll({
    order: [['createdAt', 'DESC']],
  })
    .then((notifications) => {
      if(!notifications){
        res.status(200).json({message:"erreur lors de la recuperation des notificatons"})
      }
      return res.status(200).send(notifications);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: 'Erreur serveur lors de la récupération des notifications' });
    });
};
module.exports={ createNotif, getAllNotif }