const { gql } = require('apollo-server-express');

module.exports = gql`
  type NewsSubscriber {
    email: String!
  }

  extend type Mutation {
    addNewsSubscriber(input: NewsSubscriberInput!): NewsSubscriberResponse!
    deleteNewsSubscriber(input: DeleteSubscriberInput!): NewsSubscriberResponse!
  }

  extend type Query {
    newsLetterEmails(limit: Int!): [NewsSubscriberEmailListResponse!]!
  }

  input NewsSubscriberInput {
    email: String!
  }
  
  input DeleteSubscriberInput {
    id: Int!
  }

  type NewsSubscriberResponse {
    message: String!
  }
  
  type NewsSubscriberEmailListResponse {
    id: Int!
    email: String!
  }
`;