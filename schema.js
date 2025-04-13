const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Country {
    _id: ID!
    name: String!
    code: String!
  }

  type Query {
    getCountries: [Country!]!
  }
`);

module.exports = { schema };
