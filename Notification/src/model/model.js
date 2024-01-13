// Modèle Notification
const notification=(sequelize, DataTypes)=>{
const Notification = sequelize.define('Notification', {
    titre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type:{
        type:DataTypes.STRING,
        allowNull:false
    }
    // Autres attributs de la notification
  })
return Notification

}

module.exports={ notification }