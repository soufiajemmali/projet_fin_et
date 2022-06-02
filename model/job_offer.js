const Sequelize = require("sequelize");
const sequelize = require("../config/config");
const Domaine = require("./domaine");
const Employeur = require("./employeur");

const tableName = "job_offer";

const Job_offer = sequelize.define(
  "Job_offer",
  {
    titre: { type: Sequelize.STRING },
    description: { type: Sequelize.STRING },
    teletravail: { type: Sequelize.BOOLEAN },
    salaire: { type: Sequelize.INTEGER },
    position: { type: Sequelize.STRING },
    created_at: { type: Sequelize.DATE },
    updated_at: { type: Sequelize.DATE },
    fermer: { type: Sequelize.BOOLEAN },
    id_employeur: { type: Sequelize.INTEGER },
    id_domaine: { type: Sequelize.INTEGER } /* 
    id_candidats:{type:Sequelize.ARRAY(Sequelize.INTEGER)} */,
  },
  { tableName }
);

Job_offer.belongsTo(Employeur, { as: "Employeur", foreignKey: "id_employeur" });
Job_offer.belongsTo(Domaine, { as: "Domaine", foreignKey: "id_domaine" });

Job_offer.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = Job_offer;
