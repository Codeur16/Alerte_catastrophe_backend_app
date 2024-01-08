const { userTable } = require('../config/database');

    const login =(req,res)=>{
        userTable.findOne({where:{username:req.body.username}})
        .then(clients=>{
            if(!clients){
                const message="l'utilisateur demandé est inexistant";
                return res.status(404).json({message});
            }
           
                const message="L'utilisateur a ete connecte avec succes!";
                    return res.status(200).json({message, data:clients});
             
        })
        .catch(err=>{
            const message="La connexion a echoue! réessayez dans quelques instants";
                    return res.status(500).json({message, data:err});
        })
    }
module.exports={ login}