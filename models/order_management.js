'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_management extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  order_management.init({
    slots_id: DataTypes.STRING,
    user_details_id: DataTypes.STRING,
    test_details_id: DataTypes.STRING,
    address_id: DataTypes.STRING,
    payment_id: DataTypes.STRING,
    ref_doctor: DataTypes.STRING,
    Description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'order_management',
  });
  return order_management;
};