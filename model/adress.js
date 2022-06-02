const Sequelize = require("sequelize");
const sequelize = require("../config/config");

const tableName = "adress";
const Adress = sequelize.define(
  "adress",
  {
    code_postal: { type: Sequelize.INTEGER },
    ville: { type: Sequelize.STRING },
    pays: { type: Sequelize.STRING },
    rue: { type: Sequelize.STRING },
  },
  { tableName }
);

Adress.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = Adress;
