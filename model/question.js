const Sequelize = require("sequelize");
const sequelize = require("../config/config");
const Categorie = require("./categorie");
const Employeur = require("./employeur");
const Type = require("./type");

const tableName = "question";

const Question = sequelize.define(
  "question",
  {
    titre: { type: Sequelize.STRING },
    sujet: { type: Sequelize.STRING },
    difficulty: { type: Sequelize.INTEGER },
    success_rate: { type: Sequelize.FLOAT },
    etat: { type: Sequelize.STRING },
    id_categorie: { type: Sequelize.INTEGER },
    id_type: { type: Sequelize.INTEGER },
    id_employeur: { type: Sequelize.INTEGER },
  },
  { tableName }
);

Question.belongsTo(Categorie, { as: "Categorie", foreignKey: "id_categorie" });
Question.belongsTo(Type, { as: "Type", foreignKey: "id_type" });
Question.belongsTo(Employeur, { as: "Employeur", foreignKey: "id_employeur" });

Question.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};
module.exports = Question;
