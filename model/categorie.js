const Sequelize = require("sequelize");
const sequelize = require("../config/config");

const tableName = "categorie";

const Categorie = sequelize.define(
  "categorie",
  {
    categorie: { type: Sequelize.STRING },
  },
  { tableName }
);

Categorie.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = Categorie;
