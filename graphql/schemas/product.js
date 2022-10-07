const { gql } = require('apollo-server-express');

module.exports = gql`
    scalar Date

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
        keyWords: [String!]!
    }

    extend type Mutation {
        addProduct(input: ProductInput!): ProductResponse!
        updateProduct(input: UpdateProductInput!): ProductResponse!
        publish(input: PublishProductInput!): PublishProductResponse!
    }

    extend type Query {
        products(limit: Int!): [Product!]!
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
        features: [String!]!
        attachments: [String!]!
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
        features: [String!]!
        attachments: [String!]!
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
        features: [String!]!
        attachments: [String!]!
    }

    input PublishProductInput {
        productId: Int!
    }
`;
