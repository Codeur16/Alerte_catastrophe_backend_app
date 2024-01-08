const image = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "image",
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
        allowNull: false,
        references: {
          model: "urgence",
          key: "urgenceId",
        },
      },
    },
    {
      tableName: "Image",
      timestamps: true,
    }
  );
  Image.associate = (models) => {
    Image.belongsTo(models.urgence, {
      foreignKey: "Urgence_Id",
      sourceKey: "urgenceId",
    });
  };
  return Image;
};

module.exports = image;
