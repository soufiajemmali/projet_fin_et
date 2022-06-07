
const Categorie = require("../model/categorie");
const Question = require("../model/question");
const Type = require("../model/type");
const router = require("../Routes/question.routes");

const create_question = async (req, res) => {
    let verifType, verifCategorie = null; 

   await Type.findOne({where:{type:req.body.type.type},}).then((r)=>{
        verifType=r
    }).catch((err)=>{
        console.log(err)
    });
   

  await Categorie.findOne({where:{categorie:req.body.categorie.categorie},}).then((r)=>{
        verifCategorie=r
    }).catch((err)=>{
        console.log(err)
    });


    console.log("verif success",verifCategorie,'||',verifType)

    if (id_categorie !== "undefined") {
      const categorie = await Categorie.create
    ({    categorie: req.body.categorie.categorie})
   
  }

   
  if (id_type !== "undefined") {
    const type = await Type.create
  ({    type: req.body.type.type})
 
} 
    
    
    
    /*     let typ,
    cat = null; try {  
        const type = await Type.create({
      type: req.body.type.type,
    })
      .then((r) => {
        typ = r;
        console.log("type success ", r);
      })
      .catch((e) => console.log("type failed : ", e));

    const categorie = await Categorie.create({
      categorie: req.body.categorie.categorie,
    })
      .then((r) => {
        cat = r;
        console.log("categorie success ", r);
      })
      .catch((e) => console.log("categorie failed : ", e));

    const question = await Question.create({
      titre: req.body.question.titre,
      sujet: req.body.question.sujet,
      difficulty: req.body.question.difficulty,
      success_rate: req.body.question.success_rate,
      etat: req.body.question.etat,
      id_employeur: req.body.question.employeur,
      id_type: typ?.dataValues?.id,
      id_categorie: cat?.dataValues?.id,
    });
    return res.status(200).json({message:"question created successfully"})
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  } */
};



const delete_question = (req,res)=>{
    Question.destroy({ where: { id: req.params.id } })
    .then((r) => {
      res.status(200).send({message:"qst effacé",})
      console.log('success',r)
    })
    .catch((e) => {
      res.status(400).send({message:"fail"})
      console.log("failed : ",e)});
}

module.exports = {
  create_question,
  delete_question
};
