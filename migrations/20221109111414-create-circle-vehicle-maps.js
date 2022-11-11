'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('circle_vehicle_maps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      circle_id: {
        type: Sequelize.INTEGER
      },
      vehicle_id: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      } ,
      updated_at:{
        allowNull: true,
        type: Sequelize.DATE
      }     
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('circle_vehicle_maps');
  }
};