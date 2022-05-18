const Formation=require('../model/formation')

const post_formation=(req,res)=>{
   Formation.create({diplome:req.body.diplome,
    formation:req.body.formation,
    date_debut:req.body.date_debut,
    date_fin:req.body.date_fin})
    .then((responce)=>{ 
      res.status(200).send(responce)
    })
    .catch((err)=>{
     res.status(400).send(err)
    })
}

const get_all_formation=(req,res)=>{
   Formation.findAll().then((responce)=>{
        res.status(200).send(responce)
    })
    .catch((err)=>{
        res.status(400).send(err)
    })
}

const get_formation_by_id=(req,res)=>{
   Formation.findOne({where :{id:req.params.id}})
    .then((responce)=>{
    res.status(200).send(responce)
    })
    .catch((err)=>{
    res.status(400).send(err)
    })
}


const update_formation = (req,res)=> {
   Formation.update({diplome:req.body.diplome,
    formation:req.body.formation,
    date_debut:req.body.date_debut,
    date_fin:req.body.date_fin},
    {where:{id:req.params.id}})
    .then((responce)=>{ 
    res.status(200).send(responce)
    })
    .catch((err)=>{
    res.status(400).send(err)
    })
}



const delete_formation = (req,res) => {
   Formation.destroy (
    {where :{id:req.params.id}})
    .then((responce)=>{ 
        res.sendStatus(200)
        })
        .catch((err)=>{
        res.status(400).send(err)
        })
}
  





module.exports={
    get_formation_by_id,
    get_all_formation,
    post_formation,
    update_formation,
    delete_formation
}