'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_addresses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_addresses.init({
    address_line1: DataTypes.STRING,
    address_line2: DataTypes.STRING,
    address_line3: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    pincode: DataTypes.STRING,
    map_location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_addresses',
    tableName: 'user_addresses'
  });
  return user_addresses;
};