const { gql } = require('apollo-server-express');

module.exports = gql`
  type NewsSubscriber {
    email: String!
  }

  extend type Mutation {
    addNewsSubscriber(input: NewsSubscriberInput!): NewsSubscriberResponse!
  }

  input NewsSubscriberInput {
    email: String!
  }

  type NewsSubscriberResponse {
    message: String!
  }
`;