'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class addresses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  addresses.init({
    address_line1: DataTypes.STRING,
    address_line2: DataTypes.STRING,
    address_line3: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    pincode: DataTypes.STRING,
    mobile_number: DataTypes.STRING,
    map_location: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'addresses',
    tableName: 'addresses'
  });
  return addresses;
};