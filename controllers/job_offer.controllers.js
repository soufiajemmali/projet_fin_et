const Job_offer=require('../model/job_offer')

/* const update_job_offer_candidats_ids = (req,res)=> {
    let new_candidat_id =req.body.id_candidat;
    Job_offer.update({
        id_candidats:id_candidats.push(new_candidat_id) */
        /*update the array of candidates_id when new application (postuler)is created*/ 
 /*    },
    {where:{id:req.params.id}})
    .then((responce)=>{ 
    res.status(200).send(responce)
    })
    .catch((err)=>{
    res.status(400).send(err)
    })
}
 */



/* const post_job_offer=(req,res)=>{
    Job_offer.create({titre:req.body.titre,
        description:req.body.description,
        teletravail:req.body.teletravail,
        salaire:req.body.salaire,
        position:req.body.position,
        creted_at:req.body.created_at,
        updated_at:req.body.updated_at,
        fermer:req.body.fermer})
    .then((responce)=>{ 
      res.status(200).send(responce)
    })
    .catch((err)=>{
     res.status(400).send(err)
    })
}

const get_all_job_offer=(req,res)=>{
    Job_offer.findAll().then((responce)=>{
        res.status(200).send(responce)
    })
    .catch((err)=>{
        res.status(400).send(err)
    })
}

const get_job_offer_by_id=(req,res)=>{
    Job_offer.findOne({where :{id:req.params.id}})
    .then((responce)=>{
    res.status(200).send(responce)
    })
    .catch((err)=>{
    res.status(400).send(err)
    })
}



}
   */





module.exports={   
  /*   get_job_offer_by_id,
    get_all_job_offer,
    post_job_offer,
 update_job_offer,
    update_job_offer_candidats_ids,
    delete_job_offer */
}