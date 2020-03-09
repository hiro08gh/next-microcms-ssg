require('dotenv').config();

module.exports = {
  env: {
    api_key: process.env.API_KEY,
    endpoint: process.env.ENDPOINT,
  },
};
