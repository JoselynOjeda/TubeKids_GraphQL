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
        },

        getPlaylistsForRestrictedUser: async (_, { profileId }, context) => {
            if (!context.user) throw new Error("Not authenticated");
            return await Playlist.find({
                userId: context.user.id,
                assignedProfiles: profileId,
            });
        },

        getVideosForRestrictedUser: async (_, { profileId }, context) => {
            if (!context.user) throw new Error("Not authenticated");

            const playlists = await Playlist.find({
                userId: context.user.id,
                assignedProfiles: profileId,
            });

            const videoIds = playlists.flatMap((p) => p.videos);
            const uniqueVideoIds = [...new Set(videoIds.map(id => id.toString()))];

            return await Video.find({
                _id: { $in: uniqueVideoIds },
                userId: context.user.id,
            });
        },

        searchVideosForRestrictedUser: async (_, { profileId, searchTerm }, context) => {
            if (!context.user) throw new Error("Not authenticated");

            // 1. Obtener playlists del usuario asignadas a ese perfil
            const playlists = await Playlist.find({
                userId: context.user.id,
                assignedProfiles: profileId,
            });

            // 2. Obtener IDs únicos de videos en esas playlists
            const videoIds = playlists.flatMap((p) => p.videos);
            const uniqueVideoIds = [...new Set(videoIds.map((id) => id.toString()))];

            // 3. Buscar videos por nombre o descripción que coincidan con searchTerm
            return await Video.find({
                _id: { $in: uniqueVideoIds },
                userId: context.user.id,
                $or: [
                    { name: { $regex: searchTerm, $options: "i" } },
                    { description: { $regex: searchTerm, $options: "i" } }
                ]
            });
        }
    }
};

module.exports = resolvers;
