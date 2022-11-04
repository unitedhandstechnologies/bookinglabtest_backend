'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class discount_amount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  discount_amount.init({
    amount: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'discount_amount',
  });
  return discount_amount;
};