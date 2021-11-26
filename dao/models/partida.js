'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Partida extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Partida.init({
    fecha: DataTypes.DATE,
    hora_inicio: DataTypes.DATE,
    factor_A: DataTypes.FLOAT,
    factor_B: DataTypes.FLOAT,
    factor_X: DataTypes.FLOAT,
    equipo_A: DataTypes.STRING,
    equipo_B: DataTypes.STRING,
    estado: DataTypes.STRING,
    resultado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Partida',
    freezeTableName : true
  });
  return Partida;
};