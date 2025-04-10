const axios = require("axios");

const MOVIES_URL = "http://localhost:3000/movies";

// Get All Movies
const getAllMovies = () => {
  return axios.get(MOVIES_URL);
};

// Get Movie By ID
const getMovieById = (id) => {
  return axios.get(`${MOVIES_URL}/${id}`);
};

// Add Movie
const addMovie = (movieData) => {
  return axios.post(MOVIES_URL, movieData);
};

// Update Movie
const updateMovie = (id, movieData) => {
  return axios.put(`${MOVIES_URL}/${id}`, movieData);
};

// Delete Movie
const deleteMovie = (id) => {
  return axios.delete(`${MOVIES_URL}/${id}`);
};

module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
};
