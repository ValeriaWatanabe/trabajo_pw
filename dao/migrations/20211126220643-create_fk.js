'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn('Cliente','id_dep', {
      type : Sequelize.INTEGER,
      allowNull : true
    })
    await queryInterface.addConstraint('Cliente',{
      fields : ['id_dep'],
      type : 'FOREIGN KEY',
      name : 'FK_DEPARTAMENTO_CLIENTE',
      references : {
        table : 'Departamento',
        field : 'id'
      }
    })

    await queryInterface.addColumn('Cliente','id_prov', {
      type : Sequelize.INTEGER,
      allowNull : true
    })
    await queryInterface.addConstraint('Cliente',{
      fields : ['id_prov'],
      type : 'FOREIGN KEY',
      name : 'FK_PROVINCIA_CLIENTE',
      references : {
        table : 'Provincia',
        field : 'id'
      }
    })

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

await queryInterface.addColumn('Apuesta','id_partida', {
      type : Sequelize.INTEGER,
      allowNull : true
    })
    await queryInterface.addConstraint('Juego',{
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
     await queryInterface.removeConstraint('Cliente', 'FK_DEPARTAMENTO_CLIENTE')
     await queryInterface.removeColumn('Cliente', 'id_dep')

     await queryInterface.removeConstraint('Cliente', 'FK_PROVINCIA_CLIENTE')
     await queryInterface.removeColumn('Cliente', 'id_prov')

     await queryInterface.removeConstraint('Cliente', 'FK_DISTRITO_CLIENTE')
     await queryInterface.removeColumn('Cliente', 'id_dist')

     await queryInterface.removeConstraint('Provincia', 'FK_departamento_provincia')
     await queryInterface.removeColumn('Provincia', 'id_dep')

     await queryInterface.removeConstraint('Distrito', 'FK_PROVINCIA_Distrito')
     await queryInterface.removeColumn('Distrito', 'id_prov')

     await queryInterface.removeConstraint('Juego', 'FK_categoria_juego')
     await queryInterface.removeColumn('Juego', 'id_categoria')

     await queryInterface.removeConstraint('Partida', 'FK_categoria_partida')
     await queryInterface.removeColumn('Partida', 'id_categoria')

     await queryInterface.removeConstraint('Partida', 'FK_juego_partida')
     await queryInterface.removeColumn('Partida', 'id_juego')

     await queryInterface.removeConstraint('Apuesta', 'FK_partida_apuesta')
     await queryInterface.removeColumn('Apuesta', 'id_partida')
  }
};
