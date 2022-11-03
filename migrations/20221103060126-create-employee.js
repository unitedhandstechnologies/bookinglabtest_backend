'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employee_name: {
        type: Sequelize.STRING
      },
      qualification: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.STRING
      },
      mobile_number: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      work_status: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at:{
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employees');
  }
};