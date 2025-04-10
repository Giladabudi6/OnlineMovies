const express = require("express");
const movieService = require("../services/moviesService");

// Entry Point: http://localhost:4000/movies
const router = express.Router();

// Get All Movies
router.get("/", async (req, res) => {
  try {
    const movies = await movieService.getAllMovies();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Movie By ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await movieService.getMovieById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add New Movie
router.post("/", async (req, res) => {
  const movieData = req.body;
  try {
    const newMovie = await movieService.addMovie(movieData);
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Movie
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const movieData = req.body;
  try {
    const updatedMovie = await movieService.updateMovie(id, movieData);
    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Movie
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await movieService.deleteMovie(id);
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
