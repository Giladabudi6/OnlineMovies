const moviesRepo = require("../repositories/moviesRepoWS");

// Get All Movies
const getAllMovies = async () => {
  const { data: moviesData } = await moviesRepo.getAllMovies();
  return moviesData;
};

// Get Movie By ID
const getMovieById = async (id) => {
  const { data: movieData } = await moviesRepo.getMovieById(id);
  return movieData;
};

// Add Movie
const addMovie = async (movieData) => {
  const { data: newMovie } = await moviesRepo.addMovie(movieData);
  return newMovie;
};

// Update Movie
const updateMovie = async (id, movieData) => {
  const { data: updateMovie } = await moviesRepo.updateMovie(id, movieData);
  return updateMovie;
};

// Delete Movie
const deleteMovie = async (id) => {
  const { data: deleteMovie } = await moviesRepo.deleteMovie(id);
  return deleteMovie;
};

module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
};
