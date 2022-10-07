'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NewsSubscriber extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NewsSubscriber.init({
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'NewsSubscriber',
  });
  return NewsSubscriber;
};