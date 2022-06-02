const Sequelize = require("sequelize");
const sequelize = require("../config/config");
const Adress = require("./adress");

const tableName = "candidat";

const Candidat = sequelize.define(
  "candidat",
  {
    email: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
    type: { type: Sequelize.STRING },
    active: { type: Sequelize.BOOLEAN },
    nom: { type: Sequelize.STRING },
    prenom: { type: Sequelize.STRING },
    date_naissance: { type: Sequelize.DATE },
    tel: { type: Sequelize.STRING },
    id_adress: { type: Sequelize.INTEGER },

    /* imageprofil:{type:Sequelize.STRING}, */
  },
  { tableName }
);

Candidat.belongsTo(Adress, { as: "Adress", foreignKey: "id_adress" });

Candidat.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  delete values.password;
  delete values.reefreshToken;
  return values;
};
module.exports = Candidat;
