const Sequelize = require("sequelize");
const sequelize = require("../config/config");
const Employeur = require("./employeur");

const tableName = "test";

const Test = sequelize.define(
  "test",
  {
    titre: { type: Sequelize.STRING },
    score_total: { type: Sequelize.FLOAT },
    etat: { type: Sequelize.STRING },
    id_employeur: { type: Sequelize.INTEGER },
  },

  { tableName }
);

Test.belongsTo(Employeur, { as: "Employeur", foreignKey: "id_employeur" });

Test.associate = function(models) {
    Test.belongsToMany(models.Question, {through: 'question_test', foreignKey: 'id_test', as: 'test'})
  };

Test.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = Test;
