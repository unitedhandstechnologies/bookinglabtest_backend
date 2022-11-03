'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class circle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  circle.init({
    circle_name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    tableName:'circles',
    modelName: 'circles',
  });
  return circle;
};