'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pincode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pincode.init({
    pincode: DataTypes.STRING,
    circle_id: DataTypes.INTEGER
  }, {
    sequelize,
    tableName:'pincode',
    modelName: 'pincode',
  });
  return pincode;
};