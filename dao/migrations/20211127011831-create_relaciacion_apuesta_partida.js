'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn('Apuesta','id_partida', {
      type : Sequelize.INTEGER,
      allowNull : true
    })
    await queryInterface.addConstraint('Apuesta',{
      fields : ['id_partida'],
      type : 'FOREIGN KEY',
      name : 'FK_partida_apuesta',
      references : {
        table : 'Partida',
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
     await queryInterface.removeConstraint('Apuesta', 'FK_partida_apuesta')
     await queryInterface.removeColumn('Apuesta', 'id_partida')
  }
};
