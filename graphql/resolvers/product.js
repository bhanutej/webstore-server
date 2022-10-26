require('dotenv').config();
const { AuthenticationError } = require('apollo-server-express');
const { Product, ProductKeyWord, Category, ProductFeature } = require('../../database/models');

module.exports = {
  Query: {
    async products(root, args, context) {
      const { limit } = args;
      return await Product.findAll({ limit });
    },

    async product(root, args, context) {
      const { productId } = args;
      const product = await Product.findOne({ where: { id: productId } });
      if (product) {
        const keyWords = await ProductKeyWord.findAll({ where: { productId } });
        const features = await ProductFeature.findAll({ where: { productId } });
        const category = await Category.findOne({ attributes: ['id', 'name'], where: { id: product.categoryId } });
        return Object.assign(product, { keyWords, features, category }, { logo: 'asdasd' });
      }

      const error = new Error("Product not found!");
      error.name = 'NOT_FOUND'
      error.code = 404
      return error;
    }
  },

  Mutation: {
    async publish(root, args, { user = null }) {
      if (!user) {
        throw new AuthenticationError('Unauthorized access');
      }
      if ( user.role !== 'superadmin') {
        throw new AuthenticationError('Unauthorized access');
      }

      const { productId } = args.input;
      const product = await Product.findOne({ where: { id: productId } });

      if(!product) {
        throw new AuthenticationError('Product not found');
      }

      product.status = "published";
      product.publishedAt = new Date();
      await product.save();
      return {
        message: "Application published sucessfully!"
      }
    },

    async addProduct(root, args, { user = null }) {
      if (!user) {
        throw new AuthenticationError('Unauthorized access');
      }
      if ( user.role !== 'superadmin' && user.role !== 'admin') {
        throw new AuthenticationError('Unauthorized access');
      }
      const { name, companyName, email, contactPerson, contact, description, 
        logo, categoryId, companyUrl, keyWords, features } = args.input;
      const product = await Product.create({ name, companyName, email, contactPerson, contact, 
        description, logo, categoryId, companyUrl });
      if (product) {
        product.userId = user.id;
        product.status = "pending";
        await product.save();
        const category = await Category.findOne({ where: { id: categoryId } })
        if (category) {
          await category.addProducts([product]);
        }
        for(let i = 0; i < keyWords.length; i++) {
          await ProductKeyWord.create({ name: keyWords[i], productId: product.id });
        }
        for(let i = 0; i < features.length; i++) {
          await ProductFeature.create({ label: features[i]['label'], name: features[i]['name'], attachmentUrl: features[i]['url'], attachmentPath: features[i]['path'], productId: product.id });
        }
      }
      return Object.assign(product, { keyWords, features, categoryId: categoryId });
    },
    
    async updateProduct(root, args, { user = null }) {
      if (!user) {
        throw new AuthenticationError('Unauthorized access');
      }
      if ( user.role !== 'superadmin' && user.role !== 'admin') {
        throw new AuthenticationError('Unauthorized access');
      }
      const { id, name, companyName, email, contactPerson, contact, description, logo, categoryId, companyUrl, keyWords, features } = args.input;
      const product = await Product.findOne({ where: { id } });
      if (!product) {
        throw new AuthenticationError('Application not found');
      }
      if (product) {
        console.log(">>>>>", product);
        product.set({ name, companyName, email, contactPerson, contact, 
          description, logo, categoryId, companyUrl, userId: user.id, status: 'pending' });
        await product.save();
        const category = await Category.findOne({ where: { id: categoryId } })
        if (category) {
          await category.addProducts([product]);
        }

        await ProductKeyWord.destroy({ where: { productId: product.id } });
        await ProductFeature.destroy({ where: { productId: product.id } });

        for(let i = 0; i < keyWords.length; i++) {
          await ProductKeyWord.create({ name: keyWords[i], productId: product.id });
        }
        for(let i = 0; i < features.length; i++) {
          await ProductFeature.create({ label: features[i]['label'], name: features[i]['name'], attachmentUrl: features[i]['url'], attachmentPath: features[i]['path'], productId: product.id });
        }
      }
      
      return Object.assign(product, { keyWords, features, categoryId: categoryId });
    },
  },
};
