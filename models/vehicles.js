'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vehicles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  vehicles.init({
    vehicle_number: DataTypes.STRING,
    vehicle_name: DataTypes.STRING,
    vehicle_type: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'vehicles',
    tableName: 'vehicles'
  });
  return vehicles;
};