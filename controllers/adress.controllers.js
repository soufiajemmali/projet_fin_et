const Adress=require('../model/adress')

const post_adress=(req,res)=>{
    Adress.create({
        code_postal:req.body.code_ppstal,
        ville:req.body.ville,
        pays:req.body.pays,
        rue:req.body.rue})
    .then((responce)=>{ 
      res.status(200).send(responce)
    })
    .catch((err)=>{
     res.status(400).send(err)
    })
}

const get_all_adress=(req,res)=>{
    Adress.findAll().then((responce)=>{
        res.status(200).send(responce)
    })
    .catch((err)=>{
        res.status(400).send(err)
    })
}

const get_adress_by_id=(req,res)=>{
    Adress.findOne({where :{id:req.params.id}})
    .then((responce)=>{
    res.status(200).send(responce)
    })
    .catch((err)=>{
    res.status(400).send(err)
    })
}


const update_adress = (req,res)=> {
    Adress.update({
        code_postal:req.body.code_postal,
        ville:req.body.ville,
        pays:req.body.pays,
        rue:req.body.rue},
    {where:{id:req.params.id}})
    .then((responce)=>{ 
    res.status(200).send(responce)
    })
    .catch((err)=>{
    res.status(400).send(err)
    })
}



const delete_adress = (req,res) => {
    Adress.destroy (
    {where :{id:req.params.id}})
    .then((responce)=>{ 
        res.sendStatus(200)
        })
        .catch((err)=>{
        res.status(400).send(err)
        })
}
  





module.exports={
    get_adress_by_id,
    get_all_adress,
    post_adress,
    update_adress,
    delete_adress
}