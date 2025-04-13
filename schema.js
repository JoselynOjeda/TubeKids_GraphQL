const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Country {
    _id: ID!
    name: String!
    code: String!
  }

  type RestrictedUser {
    _id: ID!
    name: String!
    pin: String!
    avatar: String!
    parentUser: ID!
  }

  

  type Query {
    getCountries: [Country!]!
    getRestrictedUsers: [RestrictedUser!]!
  }
`);

module.exports = { schema };
