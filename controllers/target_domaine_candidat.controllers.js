const Target_domaine_candidat=require('../model/target_domaine_candidat')

const post_target_domaine_candidat=(req,res)=>{
   Target_domaine_candidat.create({annees_exp:req.body.annees_exp})
    .then((responce)=>{ 
      res.status(200).send(responce)
    })
    .catch((err)=>{
     res.status(400).send(err)
    })
}

const get_all_target_domaine_candidat=(req,res)=>{
   Target_domaine_candidat.findAll().then((responce)=>{
        res.status(200).send(responce)
    })
    .catch((err)=>{
        res.status(400).send(err)
    })
}

const get_target_domaine_candidat_by_id=(req,res)=>{
   Target_domaine_candidat.findOne({where :{id:req.params.id}})
    .then((responce)=>{
    res.status(200).send(responce)
    })
    .catch((err)=>{
    res.status(400).send(err)
    })
}


const update_target_domaine_candidat= (req,res)=> {
   Target_domaine_candidat.update({annees_exp:req.body.annees_exp})
    .then((responce)=>{ 
    res.status(200).send(responce)
    })
    .catch((err)=>{
    res.status(400).send(err)
    })
}



const delete_target_domaine_candidat = (req,res) => {
   Target_domaine_candidat.destroy (
    {where :{id:req.params.id}})
    .then((responce)=>{ 
        res.sendStatus(200)
        })
        .catch((err)=>{
        res.status(400).send(err)
        })
}
  





module.exports={
    get_target_domaine_candidat_by_id,
    get_all_target_domaine_candidat,
    post_target_domaine_candidat,
    update_target_domaine_candidat,
    delete_target_domaine_candidat
}