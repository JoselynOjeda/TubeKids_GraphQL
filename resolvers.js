const Country = require('./models/countryModel');

const root = {
  getCountries: async () => {
    return await Country.find(); // Devuelve todos los países
  }
};

module.exports = { root };
