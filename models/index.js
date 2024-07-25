const { Sequelize } = require("sequelize");
const mysql2 = require("mysql2");

const sequelize = new Sequelize("freedb_UAS_DPSI", "freedb_wartono", "9sbgB?!2&Fs9Zyn", {
  host: "sql.freedb.tech",
  dialectModule: mysql2,
  dialect: "mysql",
});

module.exports = sequelize;
