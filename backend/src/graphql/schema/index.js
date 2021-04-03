const { gql } = require('apollo-server-express');
const fs = require('fs');
const path = require('path');

// Construct a schema, using GraphQL schema language
const schema = fs.readFileSync(path.join(__dirname, './schema.graphql'));
const typeDefs = gql`
  ${schema}
`;

module.exports = typeDefs;
