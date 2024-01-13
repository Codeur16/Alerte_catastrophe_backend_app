const Urgence = (sequelize, DataTypes) => {
  const Urgence = sequelize.define('Urgence', {
    urgenceId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    lieu: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'Urgence',
    timestamps: true
  });


  return Urgence;
};

const Image = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      ImageId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      urgence_Id: {  
        type: DataTypes.INTEGER,
        allowNull: true,
        
      },
    },
    {
      tableName: "Image",
      timestamps: true,
    }
  );


  return Image;
};

module.exports = { Urgence, Image };

