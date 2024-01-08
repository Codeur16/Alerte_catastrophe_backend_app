const urgence =(sequelize, DataTypes)=>{
    const Urgence = sequelize.define('urgence', {
        urgenceId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        userId:{
          type: DataTypes.INTEGER,
          allowNull: false
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        lieu:{
          type: DataTypes.STRING,
          allowNull: false
        },
        date:{
          type: DataTypes.DATE,
          allowNull: false
        }
        
      }, {
        tableName: 'urgence', // Nom de la table dans la base de données (facultatif)
        timestamps: true // Ajouter automatiquement les champs createdAt et updatedAt (facultatif)
      });
      Urgence.associate = (models)=>{
        Urgence.hasMany(models.image , {
            foreignKey: 'urgence_Id',
            sourceKey:'urgenceId'
        });
    }
  
    return Urgence;
    };
      
      // Exporter le modèle Urgence
      module.exports = urgence;



