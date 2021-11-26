'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Partida', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha: {
        type: Sequelize.DATE
      },
      hora_inicio: {
        type: Sequelize.DATE
      },
      factor_A: {
        type: Sequelize.FLOAT
      },
      factor_B: {
        type: Sequelize.FLOAT
      },
      factor_X: {
        type: Sequelize.FLOAT
      },
      equipo_A: {
        type: Sequelize.STRING
      },
      equipo_B: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.STRING
      },
      resultado: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Partida');
  }
};