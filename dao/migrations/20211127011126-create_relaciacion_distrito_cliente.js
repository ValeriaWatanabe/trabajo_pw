'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn('Cliente','id_dist', {
      type : Sequelize.INTEGER,
      allowNull : true
    })
    await queryInterface.addConstraint('Cliente',{
      fields : ['id_dist'],
      type : 'FOREIGN KEY',
      name : 'FK_DISTRITO_CLIENTE',
      references : {
        table : 'Distrito',
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
     await queryInterface.removeConstraint('Cliente', 'FK_DISTRITO_CLIENTE')
     await queryInterface.removeColumn('Cliente', 'id_dist')
  }
};
