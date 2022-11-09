'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class result extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  result.init({
    user_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    test_details_id: DataTypes.INTEGER,
    employee_id: DataTypes.INTEGER,
    lis_id: DataTypes.STRING,
    result: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'result',
  });
  return result;
};