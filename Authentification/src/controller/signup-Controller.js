const { ValidationError } = require('sequelize');
const bcrypt = require('bcrypt');
const { userTable }= require("../config/database");


   const signup=(req,res)=>{
        const {name,email,password} = req.body;
        if(!name ||!email ||!password){
            return res.status(400).json({
                message:"donnees incompletes"
            });
        }
        const hash = bcrypt.hashSync(password,10);
        const newuser = {
            name,
            email,
            password:hash
        };
        userTable.create(newuser)
        .then(users =>{
            const message="Le users "+req.body.name+" a bien été créé";
            res.status(200).json({message, data: users});

        })
        .catch(err =>{
            if(err instanceof ValidationError){
                return res.status(400).json({message: err.message, data: err});

            }
            
            res.status(500).json({message: "Erreur lors de l'ajout d'un user! Reessayer plus tard",err})
          })
}

module.exports={signup}