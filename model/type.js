const Sequelize = require("sequelize");
const sequelize = require("../config/config");

const tableName = "type";

const Type = sequelize.define(
  "type",
  {
    type: { type: Sequelize.STRING },
  },
  { tableName }
);

Type.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = Type;
