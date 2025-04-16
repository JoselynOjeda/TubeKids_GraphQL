const { makeExecutableSchema } = require('@graphql-tools/schema');

const typeDefs = `
  type Country {
    _id: ID!
    name: String!
    code: String!
    phone_code: String!
  }

  type RestrictedUser {
    _id: ID!
    name: String!
    pin: String!
    avatar: String!
    parentUser: ID!
  }

  type Video {
    _id: ID!
    userId: ID!
    name: String!
    url: String!
    description: String
    thumbnail: String
  }

  type Playlist {
    _id: ID!
    name: String!
    description: String
    assignedProfiles: [String!]!
    videos: [ID!]!
    userId: ID!
  }

  type Query {
    getCountries: [Country!]!
    getRestrictedUsers: [RestrictedUser!]!
    getUserVideos: [Video]
    getUserPlaylists: [Playlist]
    getPlaylistsForRestrictedUser(profileId: ID!): [Playlist]
    getVideosForRestrictedUser(profileId: ID!): [Video]
    searchVideosForRestrictedUser(profileId: ID!, searchTerm: String!): [Video]
  }
`;

module.exports = typeDefs;
