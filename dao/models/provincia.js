'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Provincia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Provincia.belongsTo(models.Departamento, {
        foreignKey : 'id_dep'
      })
    }
  };
  Provincia.init({
    nombre: DataTypes.STRING,
    id_dep: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Provincia',
    freezeTableName : true
  });
  return Provincia;
};