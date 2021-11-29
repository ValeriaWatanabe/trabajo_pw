'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Distrito extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Distrito.belongsTo(models.Provincia, {
        foreignKey : 'id_prov'
      })
    }
  };
  Distrito.init({
    nombre: DataTypes.STRING,
    id_prov: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Distrito',
    freezeTableName : true
  });
  return Distrito;
};