const Country = require("models/web/country.model");

module.exports = {
    countryList,
};

// Get all countries data
async function countryList() {
    try {
        const countries = await Country.find({}).select("name iso2 id").sort({ id: 1 });

        const list = countries.map((country) => ({
            value: country._id,
            label: country.name,
            iso2: country.iso2,
        }));

        return { status: 200, data: list, message: "Country list received successfully" };
    } catch (err) {
        throw err;
    }
}
