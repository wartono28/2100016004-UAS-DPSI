const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const Course = sequelize.define("Course", {
  courseID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name_course: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description_course: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  file_materi: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Course;
