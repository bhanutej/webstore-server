const { gql } = require('apollo-server-express');
const userType = require('./user');
const productType = require('./product');
const categoryType = require('./category');
const newsSubscriberType = require('./newsSubscriber');

const rootType = gql`
 type Query {
     root: String
 }
 type Mutation {
     root: String
 }

`;

module.exports = [rootType, userType, productType, categoryType, newsSubscriberType];
