'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn('Partida','id_categoria', {
      type : Sequelize.INTEGER,
      allowNull : true
    })
    await queryInterface.addConstraint('Partida',{
      fields : ['id_categoria'],
      type : 'FOREIGN KEY',
      name : 'FK_categoria_partida',
      references : {
        table : 'Categoria',
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
     await queryInterface.removeConstraint('Partida', 'FK_categoria_partida')
     await queryInterface.removeColumn('Partida', 'id_categoria')
  }
};
