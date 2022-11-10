'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vehicle_employee_mappings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  vehicle_employee_mappings.init({
    employee_id: DataTypes.INTEGER,
    vehicle_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'vehicle_employee_mappings',
  });
  return vehicle_employee_mappings;
};