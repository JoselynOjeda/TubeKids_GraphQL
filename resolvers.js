const Country = require('./models/countryModel');
const RestrictedUser = require('./models/restrictedModel');
const Video = require('./models/videoModel');
const Playlist = require('./models/playlistModel');
const mongoose = require('mongoose');

const resolvers = {
  Query: {
    getCountries: async () => {
      return await Country.find();
    },

    getRestrictedUsers: async (_, __, context) => {
      console.log("🟢 Usuario en contexto:", context.user);
      if (!context.user || !context.user.id) throw new Error("Unauthorized");
      return await RestrictedUser.find({ parentUser: context.user.id });
    },

    getUserVideos: async (_, __, context) => {
      if (!context.user) throw new Error("Not authenticated");
      return await Video.find({ userId: new mongoose.Types.ObjectId(context.user.id) });
    },

    getUserPlaylists: async (_, __, context) => {
      if (!context.user) throw new Error("Not authenticated");
      return await Playlist.find({ userId: new mongoose.Types.ObjectId(context.user.id) });
    }
  }
};

module.exports = resolvers;
