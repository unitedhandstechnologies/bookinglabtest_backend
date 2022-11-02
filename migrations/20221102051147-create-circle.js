'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('circles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      circle_name: {
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
    await queryInterface.dropTable('circles');
  }
};