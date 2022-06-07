const Employeur = require("../model/employeur");

const sequelize = require("../config/config");
const { QueryTypes } = require("sequelize");

const Adress = require("../model/adress");
const Job_offer = require("../model/job_offer");
const Domaine = require("../model/domaine");

const Authservice = require("../service/auth.service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashpass = await bcrypt.hash(req.body.employeur.mdp, salt);

  const employeurExist = await Employeur.findOne({
    where: { email: req.body.employeur.email },
  });
  if (employeurExist)
    return res.status(203).json("email is already registered.");
  let ad = null;
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

    const employeur = await Employeur.create({
      nom_societe: req.body.employeur.nom_societe,
      site_officiel: req.body.employeur.site_officiel,
      email: req.body.employeur.email,
      password: hashpass,
      tel: req.body.employeur.tel,
      type: "employeur",
      active: true,
      id_adress: ad?.dataValues?.id,

      /* imageprofil:req.body.imageprofil*/
    });

    return res.status(200).send(employeur);
  } catch (e) {
    return res.status(500).send(e);
  }
};

const login = async (req, res) => {
  const { email } = req.body;

  const employeur = await Employeur.findOne({ where: { email: email } }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );

  if (!employeur) {
    return res.status(400).json({ message: "Email does not match!" });
  } else {
    const validPass = await bcrypt.compare(req.body.mdp, employeur.password);
    if (!validPass) {
      return res.status(400).json({ message: "password does not match!" });
    } else {
      let accessToken = Authservice.accessToken(employeur);
      let refreshToken = Authservice.refreshToken(employeur);

      return res
        .status(200)
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          expires: new Date(new Date().getTime() + 3600 * 24 * 2 * 1000),
        })
        .send({
          new: employeur,
          accessToken: accessToken,
          /*  refreshToken: refreshToken, */
        });
    }
  }
};

const refreshToken = async (req, res) => {
  if (req?.cookies?.refreshToken !== undefined) {
    jwt.verify(
      req.cookies.refreshToken,
      "$2a$12$/8EzGDLZe8xJGCEgJ6RTnORT.X8qXTJC/MK/Thd6nq959v8x/Viiq",
      async (err, decode) => {
        if (err) return res.status(400).send({ message: "token expired" });
        else {
          let Emp = null;
          console.log("empls", decode);
          await Employeur.findOne({ where: { id: decode.id } })
            .then((r) => {
              Emp = r;
            })
            .catch((err) => {
              res.status(400).send({ message: "Error in getting candidat" });
            });

          if (Emp.id === undefined) {
            return res.status(400).send({ message: "there is no employer" });
          } else {
            let accessToken = Authservice.accessToken(Emp);
            res.status(200).send({
              data: Emp,
              accessToken: accessToken,
            });
          }
        }
      }
    );
  } else res.status(402).send({ message: "no refresh provided" });
};

const logout = async (req, res) => {
  res
    .status(200)
    .clearCookie("refreshToken")
    .send({ message: "cookies cleared" });
};

const publication = async (req, res) => {
  let dom = null;
  try {
    const domaine = await Domaine.create({ nom: req.body.domaine.nom })
      .then((r) => {
        dom = r;
        console.log("success ", r);
      })
      .catch((e) => console.log(" fail : ", e));

    const job_offer = await Job_offer.create({
      titre: req.body.job_offer.titre,
      description: req.body.job_offer.description,
      salaire: req.body.job_offer.salaire,
      position: req.body.job_offer.position,
      id_employeur: req.body.job_offer.employeur,
      id_domaine: dom?.dataValues?.id,
      teletravail: req.body.job_offer.teletravail,
      fermer: "false",
    }).catch((e) => console.log("job offer fail : ", e));

    return res
      .status(200)
      .send({ message: "job_offer insered successfully", job_offer });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

const update_job_offer = async (req, res) => {
  const domaine = await Domaine.update({
    nom: req.body.domaine.nom,
  }).catch((e) => console.log("fail : ", e));

  const job_offer = await Job_offer.update(
    {
      titre: req.body.job_offer.titre,
      description: req.body.job_offer.description,
      salaire: req.body.job_offer.salaire,
      position: req.body.job_offer.position,
      id_employeur: req.body.job_offer.employeur,
      id_domaine: req.body.job_offer.domaine,
      teletravail: req.body.job_offer.teletravail,
      fermer: "false",
    },
    { where: { id: req.params.id } }
  )
    .then((r) => {
      res.status(200).send({ message: "job offer updated" });
      console.log("response if success", r);
    })
    .catch((e) => {
      res.status(400).send({ message: "fail" });
      console.log("fail update : ", e);
    });
};

const delete_job_offer = (req, res) => {
  Job_offer.destroy({ where: { id: req.params.id } })
    .then((r) => {
      res.status(200).send({ message: "job offer deleted" });
      console.log("response if success", r);
    })
    .catch((e) => {
      res.status(400).send({ message: "fail" });
      console.log("fail delete : ", e);
    });
};

const getjob_Offre_employeur = async (req, res) => {
  const { id } = req.params;
  sequelize
    .query(
      `select c.nom , jo.titre  from candidat c ,job_offer jo ,postulation p  
  where jo.id_employeur = ${id}
  and p.id_joboffer =jo.id and p.id_candidat =c.id group by jo.titre,c.nom  `,
      { type: QueryTypes.SELECT }
    )
    .then((r) => {
      res.status(200).send(r);
    })
    .catch((err) => {
      res.status(400).send({ message: "fail", err });
    });
};
const get_employeur_by_id = (req, res) => {
  Employeur.findOne({ where: { id: req.params.id }, include:[{model:Adress,as:'Adress'}] })
    .then((response) => {
      res.status(200).send({candidat:response});
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};


/*const post_employeur=(req,res)=>{
    Employeur.create({
        nom_societe:req.body.nom_societe,
        site_officiel:req.body.site_officiel,
        email:req.body.email,
        password:req.body.password,
        type:req.body.type,
        active:req.body.active,
        created_at:req.body.created_at,
        updated_at:req.body.updated_at,
       /* refresh_token:req.body.refresh_token,
    imageprofil:req.body.imageprofil
    })
    .then((responce)=>{ 
      res.status(200).send(responce)
    })
    .catch((err)=>{
     res.status(400).send(err)
    })
}*/

/* const get_all_employeur = (req, res) => {
  Employeur.findAll()
    .then((responce) => {
      res.status(200).send(responce);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};



const update_employeur = (req, res) => {
  Employeur.update(
    {
      nom_societe: req.body.nom_societe,
      site_officiel: req.body.site_officiel,
      email: req.body.email,
      password: req.body.password,
      type: req.body.type,
      active: req.body.active,
      created_at: req.body.created_at,
      updated_at: req.body.updated_at,
    },
    /* refresh_token:req.body.refresh_token,
        imageprofil:req.body.imageprofil},*/
/*  { where: { id: req.params.id } }
  )
    .then((responce) => {
      res.status(200).send(responce);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const delete_employeur = (req, res) => {
  Employeur.destroy({ where: { id: req.params.id } })
    .then((responce) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
}; */

module.exports = {
  /*  
  get_all_employeur,
  update_employeur,
  delete_employeur,*/
  get_employeur_by_id,
  register,
  login,
  publication,
  refreshToken,
  logout,
  update_job_offer,
  delete_job_offer,
  getjob_Offre_employeur,
};
