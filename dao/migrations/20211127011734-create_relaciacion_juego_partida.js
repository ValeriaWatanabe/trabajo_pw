'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn('Partida','id_juego', {
      type : Sequelize.INTEGER,
      allowNull : true
    })
    await queryInterface.addConstraint('Partida',{
      fields : ['id_juego'],
      type : 'FOREIGN KEY',
      name : 'FK_juego_partida',
      references : {
        table : 'Juego',
        field : 'id'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.removeConstraint('Partida', 'FK_juego_partida')
     await queryInterface.removeColumn('Partida', 'id_juego')
  }
};
