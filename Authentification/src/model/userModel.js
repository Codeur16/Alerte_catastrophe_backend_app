const user =(sequelize, DataTypes)=>{
    const User= sequelize.define('user', {
        userid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg:"l'email est déjà utilisé"
            },
        },
        email: {
            type: DataTypes.STRING,
            unique: {
                msg:"l'email est déjà utilisé"
            },
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                min:6
            }
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
