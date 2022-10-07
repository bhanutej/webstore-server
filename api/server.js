const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser= require('body-parser');
const { createServer } = require('http');
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('../graphql/schemas');
const resolvers = require('../graphql/resolvers');
const context = require('../graphql/context');
const productRoutes = require('./routes/product');

const app = express();

app.use('/public', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(cors());

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  introspection: true,
  playground: {
    settings: {
      'schema.polling.enable': false,
    },
  },
});

apolloServer.start().then(() => {
  apolloServer.applyMiddleware({ app, path: '/api'});
});

app.use('/product', productRoutes);

const server = createServer(app);

module.exports = server;
