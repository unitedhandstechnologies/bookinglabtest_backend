'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_notification.init({
    notification: DataTypes.STRING,
    users_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_notification',
  });
  return user_notification;
};