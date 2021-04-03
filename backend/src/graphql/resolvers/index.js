const { GetUserById } = require('./queries/User');

// Provide resolver functions for all queries and mutations
const resolvers = {
  Query: {
    GetUserById,
  },
};

module.exports = resolvers;
