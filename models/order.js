'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  order.init({
    user_id: DataTypes.INTEGER,
    circle_id: DataTypes.INTEGER,
    test_details: DataTypes.INTEGER,
    slot_id: DataTypes.INTEGER,
    vehicle_id: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};