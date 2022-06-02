const Sequelize = require("sequelize");
const sequelize = require("../config/config");

const tableName = "target_domaine_candidat";
const Target_domaine_candidat = sequelize.define(
  "target_domaine_candidat",
  {
    code_postal: { type: Sequelize.INTEGER },
    ville: { type: Sequelize.STRING },
    pays: { type: Sequelize.STRING },
    rue: { type: Sequelize.STRING },
  },
  { tableName }
);

module.exports = Target_domaine_candidat;
