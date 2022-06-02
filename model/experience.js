const Sequelize = require("sequelize");
const sequelize = require("../config/config");

const Candidat = require("./candidat");

const tableName = "experience";
const Experience = sequelize.define(
  "experience",
  {
    poste_plus_recent: { type: Sequelize.STRING },
    nom_entreprise: { type: Sequelize.STRING },
    date_debut: { type: Sequelize.DATE },
    date_fin: { type: Sequelize.DATE },
    description: { type: Sequelize.STRING },
    id_candidat: { type: Sequelize.INTEGER },
  },
  { tableName }
);

Experience.hasOne(Candidat, { as: "Candidat", foreignKey: "id" });

Experience.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  delete values.password;
  delete values.refresh_token;
  return values;
};

module.exports = Experience;
