const { gql } = require('apollo-server-express');

module.exports = gql`

    type User {
        id: Int!
        name: String!
        email: String!
        password: String!
        role: String!
    }

    extend type Mutation {
        register(input: RegisterInput!): RegisterResponse
        login(input: LoginInput!): LoginResponse
    }

    type RegisterResponse {
        id: Int!
        name: String!
        email: String!
        role: String!
        token: String
    }

    input RegisterInput {
        name: String!
        email: String!
        password: String!
        role: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    type LoginResponse {
        id: Int!
        name: String!
        email: String!
        token: String!
        role: String!
    }
`;
