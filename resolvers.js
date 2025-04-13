const Country = require('./models/countryModel');
const RestrictedUser = require('./models/restrictedModel');

const root = {
  getCountries: async () => {
    return await Country.find(); 
  },

  getRestrictedUsers: async (args, context) => {
    if (!context.user || !context.user.id) {
      throw new Error("Unauthorized");
    }

    return await RestrictedUser.find({ parentUser: context.user.id });
  }
};

module.exports = { root };
