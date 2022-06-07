const Sequelize = require("sequelize");
const sequelize = require("../config/config");
const Question = require("./question");
const Test = require("./test");




const tableName = "question_test";

const Question_test = sequelize.define(
  "question_test",
  {
    duree: { type: Sequelize.DATE },
    score: { type: Sequelize.FLOAT },
    id_question: { type: Sequelize.INTEGER },
    id_test: { type: Sequelize.INTEGER }
  },
  { tableName }
);

Question_test.associate = function(models) {
    Question_test.belongsTo(models.Question, {foreignKey: 'id_question'})
    Question_test.belongsTo(models.Test, {foreignKey: 'id_test'})
  };


Question_test.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};
module.exports = Question_test;
