'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  employee.init({
    employee_name: DataTypes.STRING,
    qualification: DataTypes.STRING,
    age: DataTypes.STRING,
    mobile_number: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    work_status: DataTypes.STRING
  }, {
    sequelize,
    tableName:'employee',
    modelName: 'employee',
  });
  return employee;
};