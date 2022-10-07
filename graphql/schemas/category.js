const { gql } = require('apollo-server-express');

module.exports = gql`
  type Category {
    id: Int!
    name: String!
  }

  type Product {
    id: Int!
    name: String!
    companyName: String!
    email: String!
    contactPerson: String!
    contact: String!
    description: String!
    logo: String!
  }

  extend type Query {
    categories: [Category!]!
    categoryProducts(categoryId: Int!): CategoryProductsResponse
  }

  extend type Mutation {
    add(input: CategoryInput!): CategoryResponse
    update(input: UpdateCategoryInput!): CategoryResponse
    delete(input: DeleteCategoryInput!): DeleteCategoryResponse
  }

  input CategoryInput {
    name: String!
  }
  
  input UpdateCategoryInput {
    name: String!
    categoryId: Int!
  }
  
  input DeleteCategoryInput {
    categoryId: Int!
  }

  type CategoryResponse {
    id: Int!
    name: String!
  }

  type CategoryProductsResponse {
    name: String!
    products: [Product]
  }

  type DeleteCategoryResponse {
    message: String!
  }
`;
