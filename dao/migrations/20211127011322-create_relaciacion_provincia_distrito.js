'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn('Distrito','id_prov', {
      type : Sequelize.INTEGER,
      allowNull : true
    })
    await queryInterface.addConstraint('Distrito',{
      fields : ['id_prov'],
      type : 'FOREIGN KEY',
      name : 'FK_PROVINCIA_Distrito',
      references : {
        table : 'Provincia',
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
     await queryInterface.removeConstraint('Distrito', 'FK_PROVINCIA_Distrito')
     await queryInterface.removeColumn('Distrito', 'id_prov')
  }
};
