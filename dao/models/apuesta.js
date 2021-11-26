'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Apuesta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Apuesta.init({
    fecha_hora: DataTypes.DATE,
    numero: DataTypes.INTEGER,
    resultado_Apostado: DataTypes.STRING,
    monto: DataTypes.FLOAT,
    estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Apuesta',
    freezeTableName : true
  });
  return Apuesta;
};