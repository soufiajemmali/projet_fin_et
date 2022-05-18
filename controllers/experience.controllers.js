const Experience=require('../model/experience')

const post_experience=(req,res)=>{
   Experience.create({
    poste_plus_recent:req.body.poste_plus_recent,
    nom_entreprise:req.body.nom_entreprise,
    date_debut:req.body.date_debut,
    date_fin:req.body.date_fin,
    description:req.body.description})
    .then((responce)=>{ 
      res.status(200).send(responce)
    })
    .catch((err)=>{
     res.status(400).send(err)
    })
}

const get_all_experience=(req,res)=>{
   Experience.findAll().then((responce)=>{
        res.status(200).send(responce)
    })
    .catch((err)=>{
        res.status(400).send(err)
    })
}

const get_experience_by_id=(req,res)=>{
   Experience.findOne({where :{id:req.params.id}})
    .then((responce)=>{
    res.status(200).send(responce)
    })
    .catch((err)=>{
    res.status(400).send(err)
    })
}


const update_experience = (req,res)=> {
   Experience.update({
    poste_plus_recent:req.body.poste_plus_recent,
    nom_entreprise:req.body.nom_entreprise,
    date_debut:req.body.date_debut,
    date_fin:req.body.date_fin,
    description:req.body.description},
    {where:{id:req.params.id}})
    .then((responce)=>{ 
    res.status(200).send(responce)
    })
    .catch((err)=>{
    res.status(400).send(err)
    })
}



const delete_experience = (req,res) => {
   Experience.destroy (
    {where :{id:req.params.id}})
    .then((responce)=>{ 
        res.sendStatus(200)
        })
        .catch((err)=>{
        res.status(400).send(err)
        })
}
  





module.exports={
    get_experience_by_id,
    get_all_experience
,
    post_experience
,
    update_experience
,
    delete_experience

}