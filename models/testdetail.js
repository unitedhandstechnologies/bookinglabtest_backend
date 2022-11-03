'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class testDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  testDetail.init({
    test_name: DataTypes.STRING,
    amount: DataTypes.STRING,
    fasting_required: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'testDetail',
    tableName: 'test_details'
  });
  return testDetail;
};