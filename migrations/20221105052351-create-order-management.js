'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order_managements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      slots_id: {
        type: Sequelize.INTEGER
      },
      user_details_id: {
        type: Sequelize.INTEGER
      },
      test_details_id: {
        type: Sequelize.INTEGER
      },
      address_id: {
        type: Sequelize.INTEGER
      },
      payment_id: {
        type: Sequelize.INTEGER
      },
      ref_doctor: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order_managements');
  }
};