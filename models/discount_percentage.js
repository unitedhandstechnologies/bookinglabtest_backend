'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class discount_percentage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  discount_percentage.init({
    percentage: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'discount_percentage',
  });
  return discount_percentage;
};