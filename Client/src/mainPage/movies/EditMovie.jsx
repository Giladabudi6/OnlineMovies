/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_MOVIE, FETCH_MOVIES } from "../../redux/moviesSlice";
import { useTheme } from "@mui/material/styles";
import { Box, TextField, Checkbox, FormControlLabel, Button, Typography } from "@mui/material";

const genresList = [
  "Action", "Crime", "Science-Fiction", "Adventure", "Drama", "Thriller", "Espionage",
  "Music", "Romance", "Mystery", "Supernatural", "Fantasy", "Horror", "Family", 
  "Anime", "Comedy", "History", "Medical", "Legal", "Western", "War", "Sports"
];


const EditMovie = ({ movie, closeEditing }) => {
  const [editedMovie, setEditedMovie] = useState({ ...movie, selectedGenres: movie.genres || [] });
  const [originalMovie, setOriginalMovie] = useState({ ...movie, selectedGenres: movie.genres || [] });
  const theme = useTheme();

  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);

  useEffect(() => {
    if (!movies.length) {
      dispatch(FETCH_MOVIES());
    }
  }, [dispatch, movies.length]);

  useEffect(() => {
    setOriginalMovie({ ...movie, selectedGenres: movie.genres || [] });
    setEditedMovie({ ...movie, selectedGenres: movie.genres || [] });
  }, [movie]);

  const today = new Date().toISOString().split("T")[0];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name" && value.length > 30) return;
    setEditedMovie((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenresChange = (e) => {
    const { name, checked } = e.target;
    setEditedMovie((prev) => {
      if (checked && prev.selectedGenres.length >= 3) return prev;
      const updatedGenres = checked
        ? [...prev.selectedGenres, name]
        : prev.selectedGenres.filter((genre) => genre !== name);
      return { ...prev, selectedGenres: updatedGenres };
    });
  };

  const handleReset = () => {
    setEditedMovie({ ...originalMovie });
  };

  // Validate and submit movie changes
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!editedMovie.name.trim()) {
      alert("Please enter a valid movie name");
      return;
    }
    if (editedMovie.name.length > 40) {
      alert("Movie name must be less than 40 characters");
      return;
    }

    if (
      movies.some(
        (m) =>
          m.name.toLowerCase() === editedMovie.name.toLowerCase() &&
          m._id !== editedMovie._id
      )
    ) {
      alert("A movie with this name already exists");
      return;
    }

    if (!editedMovie.premiered) {
      alert("Please select a valid premiered date");
      return;
    }
    if (editedMovie.premiered > today) {
      alert("Premiered date cannot be in the future");
      return;
    }
    if (
      editedMovie.selectedGenres.length === 0 ||
      editedMovie.selectedGenres.length > 3
    ) {
      alert("Please select between 1 and 3 genres");
      return;
    }

    dispatch(
      UPDATE_MOVIE({
        movieId: editedMovie._id,
        updatedMovie: { ...editedMovie, genres: editedMovie.selectedGenres },
      })
    );
    alert("Movie updated successfully!");
    closeEditing();
  };

  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: theme.palette.background.paper,
        borderRadius: "10px",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        width: "880px",
        margin: "0 auto",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          {/* Movie Details Section */}
          <Box
            sx={{
              width: "48%",
              mt: 4,
              display: "flex",
              flexDirection: "column",
              gap: "25px",
            }}
          >
            <TextField
              label="Movie Name"
              name="name"
              value={editedMovie.name || ""}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              color="primary"
              inputProps={{ maxLength: 40 }}
            />
            <TextField
              label="Premiered"
              name="premiered"
              type="date"
              value={
                editedMovie.premiered ? editedMovie.premiered.split("T")[0] : ""
              }
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              color="primary"
              InputLabelProps={{ shrink: true }}
              inputProps={{ max: today }}
            />
            <TextField
              label="Image URL"
              name="image"
              value={editedMovie.image || ""}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              color="primary"
            />
          </Box>

          {/* Genre Selection Section */}
          <Box sx={{ width: "48%", mt: -1 }}>
            <Typography
              variant="h6"
              sx={{ color: theme.palette.text.primary, marginBottom: "1px" }}
            >
              Genres (Select 1-3)
            </Typography>
            <Box
              sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}
            >
              {genresList.map((genre) => (
                <FormControlLabel
                  key={genre}
                  control={
                    <Checkbox
                      name={genre}
                      checked={
                        editedMovie.selectedGenres?.includes(genre) || false
                      }
                      onChange={handleGenresChange}
                      color="primary"
                    />
                  }
                  label={genre}
                />
              ))}
            </Box>
          </Box>
        </Box>

        {/* Form Buttons */}
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              padding: "10px 20px",
              borderRadius: "8px",
              marginRight: "10px",
            }}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleReset}
            sx={{
              padding: "10px 20px",
              borderRadius: "8px",
              marginRight: "10px",
            }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={closeEditing}
            sx={{
              padding: "10px 20px",
              borderRadius: "8px",
              marginRight: "10px",
            }}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditMovie;
