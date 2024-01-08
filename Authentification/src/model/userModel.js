const user =(sequelize, DataTypes)=>{
    const User= sequelize.define('user', {
        userid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg:"Ce nom d'utilisateur est déjà utilisé"
            },
        }
        },
        {
            timestamps: true,
            createdAt:true,
            updateAt: 'updateTimestamp'

        }
        );
       
        return User;
}
module.exports = user;
