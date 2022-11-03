'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class slot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  slot.init({
    date: DataTypes.DATE,
    time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'slot',
  });
  return slot;
};