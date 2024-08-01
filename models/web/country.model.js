const mongoose = require("mongoose");

// Country Schema
const CountrySchema = new mongoose.Schema({
    id: String,
    name: String,
    iso3: String,
    numeric_code: String,
    iso2: String,
    phonecode: String,
    capital: String,
    currency: String,
    currency_name: String,
    currency_symbol: String,
    tld: String,
    native: String,
    region: String,
    subregion: String,
    latitude: String,
    longitude: String,
    emoji: String,
    emojiU: String,
    flag: String,
    wikiDataId: String,
    isActive: String,
});

const Country = mongoose.model("Country", CountrySchema);

module.exports = Country;
