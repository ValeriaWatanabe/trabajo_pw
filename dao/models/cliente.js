'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cliente.belongsTo(models.Departamento, {
        foreignKey : 'id_dep'
      })

      Cliente.belongsTo(models.Provincia, {
        foreignKey : 'id_prov'
      })

      Cliente.belongsTo(models.Distrito, {
        foreignKey : 'id_dist'
      })
    }
  };
  Cliente.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    dni: DataTypes.STRING,
    correo: DataTypes.STRING,
    numero: DataTypes.STRING,
    direccion: DataTypes.STRING,
    pep: DataTypes.BOOLEAN,
    estado: DataTypes.STRING,
    contrasena: DataTypes.STRING,
    id_dep: DataTypes.INTEGER,
    id_prov: DataTypes.INTEGER,
    id_dist: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Cliente',
    freezeTableName : true
  });
  return Cliente;
};