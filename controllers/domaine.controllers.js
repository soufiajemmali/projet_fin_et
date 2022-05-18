const Domaine = require('../model/domaine')


const post_domaine=(req,res)=>{
    Domaine.create({nom:req.body.nom,type:req.body.type})
    .then((responce)=>{ 
      res.status(200).send(responce)
    })
    .catch((err)=>{
     res.status(400).send(err)
    })
}

const get_all_domaine=(req,res)=>{
    Domaine.findAll().then((responce)=>{
        res.status(200).send(responce)
    })
    .catch((err)=>{
        res.status(400).send(err)
    })
}

const get_domaine_by_id=(req,res)=>{
    Domaine.findOne({where :{id:req.params.id}})
    .then((responce)=>{
    res.status(200).send(responce)
    })
    .catch((err)=>{
    res.status(400).send(err)
    })
}


const update_domaine = (req,res)=> {
    Domaine.update({nom:req.body.nom,type:req.body.type},
    {where:{id:req.params.id}})
    .then((responce)=>{ 
    res.status(200).send(responce)
    })
    .catch((err)=>{
    res.status(400).send(err)
    })
}



const delete_domaine = (req,res) => {
    Domaine.destroy (
    {where :{id:req.params.id}})
    .then((responce)=>{ 
        res.sendStatus(200)
        })
        .catch((err)=>{
        res.status(400).send(err)
        })
}

module.exports={
    get_domaine_by_id,
    get_all_domaine,
    post_domaine,
    update_domaine,
    delete_domaine
}