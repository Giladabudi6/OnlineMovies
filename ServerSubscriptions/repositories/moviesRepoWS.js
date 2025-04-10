const axios = require("axios");

const MOVIES_URL = "https://api.tvmaze.com/shows";

// Get All Movies
const getAllMovies = () => {
  return axios.get(MOVIES_URL);
};

module.exports = {
  getAllMovies,
};
