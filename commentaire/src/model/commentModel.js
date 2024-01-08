const comment =(sequelize, DataTypes)=>{

const Comment = sequelize.define('comment', {
  commentId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  contenu: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  auteur: {
    type: DataTypes.STRING,
    allowNull: false
  },
  urgence_Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'urgence',
      key: 'urgenceId'
    }
  }
}, {
  tableName: 'comment',
  timestamps: true
});
Comment.associate = (models) => {
    Comment.belongsTo( models.urgence, { foreignKey: 'Urgence_Id',   sourceKey: 'urgenceId' });
};
return Comment;
};


module.exports = comment;