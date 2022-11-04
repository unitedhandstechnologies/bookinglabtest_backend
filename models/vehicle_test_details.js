'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vehicle_test_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  vehicle_test_details.init({
    vehicle_id: DataTypes.INTEGER,
    test_details_id: DataTypes.INTEGER,
    test_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'vehicle_test_details',
  });
  return vehicle_test_details;
};