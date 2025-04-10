const express = require("express");
const moviesService = require("../services/moviesService");

const router = express.Router();

// Entry Point: http://localhost:3000/movies

// Initialize Movies Data (Pull from WS and Save to DB)
router.get("/initializeMovies", async (req, res) => {
  try {
    const movies = await moviesService.initializeMoviesData();
    res
      .status(201)
      .json({ message: "Movies data initialized successfully", movies });
  } catch (error) {
    res.status(500).json({
      error: "Failed to initialize movies data",
      details: error.message,
    });
  }
});

// Get all movies from DB
router.get("/", async (req, res) => {
  try {
    const movies = await moviesService.getAllMovies();
    res.status(200).json(movies); // Changed from res.json(movies)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Movie by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await moviesService.getMovieById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" }); // Added 404 for not found
    }
    res.status(200).json(movie); // Changed from res.json(movie)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new Movie
router.post("/", async (req, res) => {
  try {
    const movData = req.body;
    const newMov = await moviesService.addMovie(movData);
    res.status(201).json(newMov);
  } catch (error) {
    res.status(409).json({ message: error.message }); // Changed from 400 to 409 for conflict (name exists)
  }
});

// Update a Movie
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movData = req.body;
    const result = await moviesService.updateMovie(id, movData);
    if (!result) {
      return res.status(404).json({ message: "Movie not found" }); // Added 404 for not found
    }
    res.status(200).json(result); // Changed from res.json(result)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a Movie
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMov = await moviesService.deleteMovie(id);
    if (!deletedMov) {
      return res.status(404).json({ message: "Movie not found" }); // Added 404 for not found
    }
    res.status(200).json(deletedMov); // Changed from res.json(deletedMov) - could also be 204 No Content
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
