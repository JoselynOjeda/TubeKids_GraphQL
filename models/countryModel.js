const mongoose = require('mongoose')

const CountrySchema = new mongoose.Schema({
  name: String,
  code: String,
  phone_code: String
})

module.exports = mongoose.model("Country", CountrySchema)
