'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sample extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  sample.init({
    barcode_id: DataTypes.INTEGER,
    emp_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    result_id: DataTypes.INTEGER,
    test_details_id: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'sample',
  });
  return sample;
};