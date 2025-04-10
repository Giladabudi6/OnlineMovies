const moviesRepoWS = require("../repositories/moviesRepoWS");
const moviesRepoDB = require("../repositories/moviesRepoDB");

// Initialize movies data from WS to DB
const initializeMoviesData = async () => {
  try {
    await moviesRepoDB.deleteAllMovies();
    let { data } = await moviesRepoWS.getAllMovies();
    const moviesData = data.map(({ name, genres, image, premiered }) => ({
      name,
      genres,
      image: image.medium,
      premiered,
    }));
    const insertions = moviesData.map((movie) => moviesRepoDB.addMovie(movie));
    await Promise.all(insertions);
    console.log("Movies data initialized and saved to DB.");
    return moviesData;
  } catch (error) {
    console.error("Error initializing movies data:", error);
    throw error;
  }
};

// Get all movies
const getAllMovies = () => {
  return moviesRepoDB.getAllMovies();
};

// Get movie by ID
const getMovieById = (id) => {
  return moviesRepoDB.getMovieById(id);
};

// Add a new movie
const addMovie = async (movieData) => {
  try {
    const allMovies = await moviesRepoDB.getAllMovies();
    const existingMovie = allMovies.find(
      (movie) => movie.name === movieData.name
    );
    if (existingMovie) {
      throw new Error("Movie with the same name already exists");
    }
    const newMovie = await moviesRepoDB.addMovie(movieData);
    return newMovie;
  } catch (error) {
    console.error("Error in addMovie Service:", error.message);
    throw error;
  }
};

// Update an existing movie
const updateMovie = (id, movieData) => {
  return moviesRepoDB.updateMovie(id, movieData);
};

// Delete a movie
const deleteMovie = (id) => {
  return moviesRepoDB.deleteMovie(id);
};

module.exports = {
  initializeMoviesData,
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
};
