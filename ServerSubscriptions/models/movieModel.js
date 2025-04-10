const mongoose = require("mongoose");

/* Movies Schema */
const moviesSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    genres: { type: [String], required: true },
    image: { type: String, required: true },
    premiered: { type: Date, required: true },
  },
  { versionKey: false }
);

/* Movie Model */
const Movie = mongoose.model('Movie', moviesSchema);

module.exports = Movie;