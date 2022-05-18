const Postulation = require("../model/postulation");

const postuler = async (req, res) => {
          console.log('req.body is ',req.body)
     await Postulation.create({
      etat: req.body.etat,
      id_candidat: req.body.id_candidat,
      id_joboffer: req.body.id_joboffer,
    }).then((r)=>{
        res.status(200).send({message:'postulated'})
         console.log('response if sucess',r)
    }).catch((e)=>{
        res.status(400).send({message:'failed'})
        console.log("postulation failed : ",e)});

 
};
const annuler_postulation = (req, res) => {
    Postulation.destroy({ where: { id: req.params.id } })
      .then((r) => {
        res.status(200).send({message:"postulation annulé",})
        console.log('response if success',r)
      })
      .catch((e) => {
        res.status(400).send({message:"fail"})
        console.log("annulation  failed : ",e)});
  }

/* const post_postulation=(req,res)=>{
    Postulation.create({etat:req.body.etat,cv:req.body.cv,created_at:req.body.created_at,updated_at:req.body.updated_at,})
    .then((responce)=>{ 
      res.status(200).send(responce)
    })
    .catch((err)=>{
     res.status(400).send(err)
    })
}

const get_all_postulation=(req,res)=>{
    Postulation.findAll().then((responce)=>{
        res.status(200).send(responce)
    })
    .catch((err)=>{
        res.status(400).send(err)
    })
}

const get_postulation_by_id=(req,res)=>{
    Postulation.findOne({where :{id:req.params.id}})
    .then((responce)=>{
    res.status(200).send(responce)
    })
    .catch((err)=>{
    res.status(400).send(err)
    })
}


const update_postulation = (req,res)=> {
    Postulation.update({etat:req.body.etat,cv:req.body.cv,created_at:req.body.created_at,updated_at:req.body.updated_at,},
    {where:{id:req.params.id}})
    .then((responce)=>{ 
    res.status(200).send(responce)
    })
    .catch((err)=>{
    res.status(400).send(err)
    })
}



const delete_postulation = (req,res) => {
    Postulation.destroy (
    {where :{id:req.params.id}})
    .then((responce)=>{ 
        res.sendStatus(200)
        })
        .catch((err)=>{
        res.status(400).send(err)
        })
}
  


 */

module.exports = {
  postuler,
  annuler_postulation
  /*     get_postulation_by_id,
    get_all_postulation,
,
    update_postulation,
    delete_postulation
*/
};
