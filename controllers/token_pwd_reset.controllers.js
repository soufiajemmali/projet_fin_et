const Token_pwd_reset = require('../model/token_pwd_reset')


const post_token_pwd_reset=(req,res)=>{
    Token_pwd_reset.create({token:req.body.token,expires_in:req.body.expires_in})
    .then((responce)=>{ 
      res.status(200).send(responce)
    })
    .catch((err)=>{
     res.status(400).send(err)
    })
}

const get_all_token_pwd_reset=(req,res)=>{
    Token_pwd_reset.findAll().then((responce)=>{
        res.status(200).send(responce)
    })
    .catch((err)=>{
        res.status(400).send(err)
    })
}

const get_token_pwd_reset_by_id=(req,res)=>{
    Token_pwd_reset.findOne({where :{id:req.params.id}})
    .then((responce)=>{
    res.status(200).send(responce)
    })
    .catch((err)=>{
    res.status(400).send(err)
    })
}


const update_token_pwd_reset = (req,res)=> {
    Token_pwd_reset.update({token:req.body.token,expires_in:req.body.expires_in},
    {where:{id:req.params.id}})
    .then((responce)=>{ 
    res.status(200).send(responce)
    })
    .catch((err)=>{
    res.status(400).send(err)
    })
}



const delete_token_pwd_reset = (req,res) => {
    Token_pwd_reset.destroy (
    {where :{id:req.params.id}})
    .then((responce)=>{ 
        res.sendStatus(200)
        })
        .catch((err)=>{
        res.status(400).send(err)
        })
}

module.exports={
    get_token_pwd_reset_by_id,
    get_all_token_pwd_reset,
    post_token_pwd_reset,
    update_token_pwd_reset,
    delete_token_pwd_reset
}