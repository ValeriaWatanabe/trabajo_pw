'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn('Provincia','id_dep', {
      type : Sequelize.INTEGER,
      allowNull : true
    })
    await queryInterface.addConstraint('Provincia',{
      fields : ['id_dep'],
      type : 'FOREIGN KEY',
      name : 'FK_departamento_provincia',
      references : {
        table : 'Departamento',
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
     await queryInterface.removeConstraint('Provincia', 'FK_departamento_provincia')
     await queryInterface.removeColumn('Provincia', 'id_dep')
  }
};
