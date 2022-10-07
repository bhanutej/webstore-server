'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.ProductKeyWord, { foreignKey: 'productId' });
      this.hasMany(models.ProductFeature, { foreignKey: 'productId' });
      this.hasMany(models.ProductAttachment, { foreignKey: 'productId' });
      this.belongsTo(models.User, { foreignKey: 'userId' })
      this.belongsTo(models.Category, { foreignKey: 'categoryId' })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    companyName: DataTypes.STRING,
    email: DataTypes.STRING,
    contactPerson: DataTypes.STRING,
    contact: DataTypes.STRING,
    description: DataTypes.STRING,
    companyUrl: DataTypes.STRING,
    logo: DataTypes.STRING,
    status: DataTypes.ENUM("pending", "published"),
    publishedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};