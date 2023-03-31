const { gql } = require('apollo-server-express');

module.exports = gql`
    scalar Date
    scalar Object

    type Products {
        id: Int!
        name: String!
        companyName: String!
        email: String!
        contactPerson: String!
        contact: String!
        description: String!
        logo: String
        companyUrl: String!
        status: String!
        publishedAt: Date!
        keyWords: [String!]!
    }

    type productCategory {
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
        logo: String
        companyUrl: String!
        status: String!
        publishedAt: Date!
        keyWords: [Object!]!
        features: [Object!]!
        category: productCategory!
    }

    extend type Mutation {
        addProduct(input: ProductInput!): ProductResponse!
        updateProduct(input: UpdateProductInput!): ProductResponse!
        publish(input: PublishProductInput!): PublishProductResponse!
        unPublish(input: PublishProductInput!): PublishProductResponse!
    }

    extend type Query {
        products(limit: Int!, status: String!): [Products!]!
        product(productId: Int!): Product!
    }

    type ProductResponse {
        id: Int!
        name: String!
        companyName: String!
        email: String!
        contactPerson: String!
        contact: String!
        description: String!
        logo: String
        companyUrl: String!
        status: String!
        publishedAt: Date
        keyWords: [String!]!
        features: [Object!]!
        # attachments: [String!]!
        categoryId: Int!
    }

    type PublishProductResponse {
        message: String!
    }

    input ProductInput {
        name: String!
        companyName: String!
        email: String!
        contactPerson: String!
        contact: String!
        description: String!
        logo: String
        categoryId: Int!
        companyUrl: String!
        keyWords: [String!]!
        features: [Object!]!
        # attachments: [String!]!
    }
    
    input UpdateProductInput {
        id: Int!
        name: String!
        companyName: String!
        email: String!
        contactPerson: String!
        contact: String!
        description: String!
        logo: String
        categoryId: Int!
        companyUrl: String!
        keyWords: [String!]!
        features: [Object!]!
        # attachments: [String!]!
    }

    input PublishProductInput {
        productId: Int!
    }
`;
