'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductFeature extends Model {
    
    static associate(models) {
      this.belongsTo(models.Product, { foreignKey: 'productId' });
    }
  }
  ProductFeature.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductFeature',
  });
  return ProductFeature;
};