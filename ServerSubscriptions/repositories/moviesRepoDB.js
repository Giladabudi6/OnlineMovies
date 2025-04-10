const movie = require("../models/movieModel");

// Get All Movie
const getAllMovies = () => {
  return movie.find();
};

// Get Movie By ID
const getMovieById = (id) => {
  return movie.findById(id);
};

// Create Movie
const addMovie = (movieData) => {
  const sub = new movie(movieData);
  return sub.save();
};

// Update Movie
const updateMovie = (id, movieData) => {
  return movie.findByIdAndUpdate(id, movieData, { new: true });
};

// Delete Movie
const deleteMovie = (id) => {
  return movie.findByIdAndDelete(id);
};

// Delete All Movies
const deleteAllMovies = () => {
  return movie.deleteMany({});
};

module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
  deleteAllMovies,
};
