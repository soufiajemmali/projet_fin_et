const Candidat = require("../model/candidat");
const Formation = require("../model/formation");
const Experience = require("../model/experience");
const Adress = require("../model/adress");
const Postulation = require("../model/postulation");
const Job_offer = require("../model/job_offer");
const { Op } = require("sequelize");

const Authservice = require("../service/auth.service");
const jwt =require("jsonwebtoken")
const bcrypt = require("bcrypt");
const router = require("../Routes/candidat.routes");

const register = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashpass = await bcrypt.hash(req.body.candidat.mdp, salt);

  const candidatExist = await Candidat.findOne({
    where: { email: req.body.candidat.email },
  });
  if (candidatExist)
    return res.status(203).json("email is already registered.");
  let ad,
    form,
    exper = null;
  try {
    const adress = await Adress.create({
      code_postal: req.body.adresse.code_postal,
      ville: req.body.adresse.ville,
      pays: req.body.adresse.pays,
      rue: req.body.adresse.rue,
    })
      .then((r) => {
        ad = r;
        console.log("adress success ", r);
      })
      .catch((e) => console.log("adress fail : ", e));

    const candidat = await Candidat.create({
      nom: req.body.candidat.lastname,
      prenom: req.body.candidat.firstname,
      date_naissance: req.body.candidat.date_naissance,
      email: req.body.candidat.email,
      password: hashpass,
      tel: req.body.candidat.tel,
      type: "candidat",
      active: true,
      id_adress: ad?.dataValues?.id,
    
       /* imageprofil:req.body.imageprofil*/
    })
      .then((r) => {
        exper = r;
      })
      .catch((e) => console.log("candidat fail : ", e));

    const experience = Experience.create({
      poste_plus_recent: req.body.experience.poste,
      nom_entreprise: req.body.experience.societe,
      date_debut: req.body.experience.date_debut_exp,
      date_fin: req.body.experience.date_fin_exp,
      description: req.body.experience.description,
      id_candidat: exper?.dataValues?.id,
    });

    const formation = await Formation.create({
      diplome: req.body.formation.diplome,
      university: req.body.formation.universite,
      date_debut: req.body.formation.date_debut,
      date_fin: req.body.formation.date_fin,
      id_candidat: exper?.dataValues?.id,
    });

    return res.status(200).send(experience);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

const login = async (req, res) => {
  const { email } = req.body;

  const candidat = await Candidat.findOne({ where: { email: email } }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );

  if (!candidat) {
    return res.status(400).json({ message: "Email does not match!" });
  } else {
    const validPass = await bcrypt.compare(req.body.mdp, candidat.password);
    if (!validPass) {
      return res.status(400).json({ message: "password does not match!" });
    } else {

      let accessToken = Authservice.accessToken(candidat)
      let refreshToken = Authservice.refreshToken(candidat)

      return res.status(200).cookie('refreshToken', refreshToken, { httpOnly: true, expires: new Date(new Date().getTime() + (3600 * 24 * 2 * 1000)) })
      .send({
          new: candidat,
          accessToken: accessToken,
          /*  refreshToken: refreshToken, */       
      });
    }
  }
};

const refreshToken = async (req, res) => {
  if (req?.cookies?.refreshToken !== undefined) {
     jwt.verify(req.cookies.refreshToken,'$2a$12$/8EzGDLZe8xJGCEgJ6RTnORT.X8qXTJC/MK/Thd6nq959v8x/Viiq',async(err,decode)=>{
         if(err)
         return res.status(400).send({message:'token expired'})
         else {
          let Cand=null
          console.log('cand',decode)
           await Candidat.findOne({where: {id:decode.id}}).then((r)=>{
              Cand=r
             
           }).catch((err)=>{
             res.status(400).send({message:'Error in getting candidat'})
           })
          
           if(Cand.id===undefined)
           {return res.status(400).send({message:'there is no candidat'})}
           else {
               let accessToken = Authservice.accessToken(Cand)
               res.status(200).send({
                data: Cand,
                accessToken: accessToken,
            })
           }
         }
     }) 
  }
  else
      res.status(402).send({ message: 'no refresh provided' })
}




const logout=async(req,res)=>{
  res.status(200).clearCookie('refreshToken').send({message:'cookies cleared'})
}

const getPostulation_by_candidate = async (req, res) => {
  const { id } = req.params;
  let posutaltion = [];

  await Postulation.findAll({
    where: {
      id_candidat: id,
    },
  })
    .then((r) => {
      r?.map((el) => {
        posutaltion = [...posutaltion, parseInt(el?.id_joboffer)];
      }); /* res.status(200).send(posutaltion) */
      /* posutaltion=r; */
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  console.log("ressdqds", posutaltion);

  Job_offer.findAll({
    where: {
      id: {
        [Op.in]: posutaltion,
      },
    },
  })
    .then((r2) => {
      res.status(200).send(r2);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

/* const get_all_candidat=(req,res)=>{
    Candidat.findAll().then((responce)=>{
        res.status(200).send(responce)
    })
    .catch((err)=>{
        res.status(400).send(err)
    })
} */
/* retun candidates which ids are in the array given by the front-end(usecase :get candidates related to one job offer)*/

/* const  get_candidats_by_ids= (req,res)=>{
  let cadidats_ids = req.body.candidats_ids;
  Candidat.findAll().then(async (responce)=>{
    await responce.filter(id=>cadidats_ids.includes(id));
      res.status(200).send(responce)
  })
  .catch((err)=>{
      res.status(400).send(err)
  })
} */
/*
const get_candidat_by_id=(req,res)=>{
    Candidat.findOne({where :{id:req.params.id}})
    .then((responce)=>{
    res.status(200).send(responce)
    })
    .catch((err)=>{
    res.status(400).send(err)
    })
}



const update_candidat = (req,res)=> {
    Candidat.update({nom:req.body.nom,prenom:req.body.prenom,
        date_naissance:req.body.date_naissance,
        email:req.body.email,
        password:req.body.password,
        confirmationpassword:req.body.confirmationpassword,
        type:"candidat",
        active:true},
       /* refresh_token:req.body.refresh_token,
        imageprofil:req.body.imageprofil},
    .then((responce)=>{ 
    res.status(200).send(responce)
    })
    .catch((err)=>{
    res.status(400).send(err)
    })
}



const delete_candidat = (req,res) => {
    Candidat.destroy (
    {where :{id:req.params.id}})
    .then((responce)=>{ 
        res.sendStatus(200)
        })
        .catch((err)=>{
        res.status(400).send(err)
        })
}*/

module.exports = {
  /*  get_candidat_by_id,
    get_all_candidat,*/
  register,
  login,
  getPostulation_by_candidate,
  refreshToken,
  logout
  /* update_candidat,
    delete_candidat*/
};
