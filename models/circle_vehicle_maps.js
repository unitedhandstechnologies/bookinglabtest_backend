'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class circle_vehicle_maps extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  circle_vehicle_maps.init({
    circle_id: DataTypes.INTEGER,
    vehicles: DataTypes.INTEGER,
    vehicle_name: DataTypes.STRING,
    vehicle_type: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'circle_vehicle_maps',
    modelName: 'circle_vehicle_maps',
  });
  return circle_vehicle_maps;
};