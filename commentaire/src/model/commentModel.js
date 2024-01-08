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
  urgenceId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'comment',
  timestamps: true
});
return Comment;
};


module.exports = comment;