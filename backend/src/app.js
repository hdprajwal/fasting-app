const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const favicon = require('serve-favicon');
const path = require('path');
// const helmet = require('helmet');
// const multer = require('multer');
const config = require('./config/config');
const morgan = require('./config/morgan');

// Routes imports
const router = require('./routes');

// GraphQL imports
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/schema');

// JWT Verification middleware
const auth = require('./middleware/auth');

// Initializing a Express application
const app = express();

/**
 * Applying Middlewares
 */

// Morgan middleware for HTTP logging
if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// Secures Express apps with different HTTP headers
// app.enable('trust proxy');
// app.use(helmet());

// Parse json request Body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Enable Sanitization on Mongo
app.use(mongoSanitize());

// Enable Cors middleware
app.use(cors());
app.options('*', cors());

app.use('/', router);

// Creating a ApolloServer with the Type definition and Resolver functions for GraphQL Queries
const server = new ApolloServer({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});

// Assigning Apollo Server as Middleware to express app
server.applyMiddleware({ app });

module.exports = app;
