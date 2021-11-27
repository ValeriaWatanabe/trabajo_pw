'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn('Juego','id_categoria', {
      type : Sequelize.INTEGER,
      allowNull : true
    })
    await queryInterface.addConstraint('Juego',{
      fields : ['id_categoria'],
      type : 'FOREIGN KEY',
      name : 'FK_categoria_juego',
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
     await queryInterface.removeConstraint('Juego', 'FK_categoria_juego')
     await queryInterface.removeColumn('Juego', 'id_categoria')
  }
};
