const urgence =(sequelize, DataTypes)=>{
    const Urgence = sequelize.define('urgence', {
        urgenceId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        titre: {
          type: DataTypes.STRING,
          allowNull: false
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false
        },
        ville: {
          type: DataTypes.STRING,
          allowNull: false
        },
        etat_urgence: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },
        niveau_gravite: {
          type: DataTypes.STRING,
          allowNull: true
        },
        statut: {
          type: DataTypes.STRING,
          allowNull: false
        }
      }, {
        tableName: 'urgence', // Nom de la table dans la base de données (facultatif)
        timestamps: true // Ajouter automatiquement les champs createdAt et updatedAt (facultatif)
      });
      Urgence.associate = (models)=>{
        Urgence.hasMany(models.comment, {
            foreignKey: 'urgence_Id',
            sourceKey:'urgenceId'
        });
    }
  
    return Urgence;
    };
      
      // Exporter le modèle Urgence
      module.exports = urgence;