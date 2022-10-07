require('dotenv').config();
const { AuthenticationError } = require('apollo-server-express');
const { Category, Product } = require('../../database/models');

module.exports = {
  Query: {
    async categories(root, args, context) {
      return await Category.findAll();
    },

    async categoryProducts(root, args, context) {
      const { categoryId } = args;
      const category = await Category.findOne({ wherer: { id: categoryId }, include: Product });
      const products = await category.getProducts();
      return {
        name: category.name,
        products
      };
    }
  },
  Mutation: {
    async add(root, args, { user = null }) {
      if (!user) {
        throw new AuthenticationError('Unauthorized access');
      }
      if ( user.role !== 'superadmin') {
        throw new AuthenticationError('Unauthorized access');
      }
      const { name } = args.input;
      const category = await Category.create({ name });
      return category;
    },
    
    async update(root, args, { user = null }) {
      if (!user) {
        throw new AuthenticationError('Unauthorized access');
      }
      if ( user.role !== 'superadmin') {
        throw new AuthenticationError('Unauthorized access');
      }
      
      const { name, categoryId } = args.input;
      const category = await Category.findOne({ where: { id: categoryId } });
      if (!category) {
        throw new AuthenticationError('Category not found');
      }
      category.name = name;
      await category.save();
      return category;
    },

    async delete(root, args, { user = null }) {
      const { categoryId } = args.input;
      if (!user) {
        throw new AuthenticationError('Unauthorized access');
      }
      if ( user.role !== 'superadmin') {
        throw new AuthenticationError('Unauthorized access');
      }
      await Category.destroy({ where: { id: categoryId } })
      return {
        message: "Category deleted sucessfully"
      }
    }
  }
};
