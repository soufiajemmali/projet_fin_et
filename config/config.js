const Sequelize = require("sequelize");

const database = new Sequelize("pfe", "postgres", "bhsiset2020", {
  host: "localhost",
  port: "5433",
  dialect: "postgres",
  define: {
    timestamps: false,
  },
});
module.exports = database;
