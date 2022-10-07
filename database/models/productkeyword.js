'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductKeyWord extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Product, { foreignKey: 'productId' });
    }
  }
  ProductKeyWord.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductKeyWord',
  });
  return ProductKeyWord;
};