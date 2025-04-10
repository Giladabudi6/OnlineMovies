/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_MOVIE, FETCH_MOVIES } from "../../redux/moviesSlice";
import { Button, Box, Typography, Checkbox, FormControlLabel, TextField, useTheme } from "@mui/material";

const genresList =[ "Action", "Adventure", "Anime", "Comedy", "Crime", "Drama", "Espionage", "Family", "Fantasy", 
  "History", "Horror", "Legal", "Medical", "Music", "Mystery", "Romance", "Science-Fiction", "Sports", "Supernatural",
  "Thriller", "War", "Western" ];


const AddMovie = ({ setSelectedTab }) => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const [newMovie, setNewMovie] = useState({
    name: "",
    premiered: "",
    image: "",
    selectedGenres: [],
  });

  const today = new Date().toISOString().split("T")[0];
  const theme = useTheme();

  useEffect(() => {
    dispatch(FETCH_MOVIES());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name" && value.length > 30) return;
    setNewMovie((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenresChange = (e) => {
    const { name, checked } = e.target;
    setNewMovie((prev) => {
      if (checked && prev.selectedGenres.length >= 3) return prev;
      const updatedGenres = checked
        ? [...prev.selectedGenres, name]
        : prev.selectedGenres.filter((genre) => genre !== name);
      return { ...prev, selectedGenres: updatedGenres };
    });
  };
  
  // Validate and submit a new movie
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMovie.name.trim()) return alert("Please enter a valid movie name");

    if (newMovie.name.length > 40)
      return alert("Movie name must be less than 40 characters");

    if (
      movies.some((m) => m.name.toLowerCase() === newMovie.name.toLowerCase())
    )
      return alert("A movie with this name already exists");

    if (!newMovie.premiered)
      return alert("Please select a valid premiered date");

    if (newMovie.premiered > today)
      return alert("Premiered date cannot be in the future");

    if (
      newMovie.selectedGenres.length === 0 ||
      newMovie.selectedGenres.length > 3
    )
      return alert("Please select between 1 and 3 genres");

    if (!newMovie.image) return alert("Please select a valid image");

    dispatch(ADD_MOVIE({ ...newMovie, genres: newMovie.selectedGenres }))
      .then(() => {
        alert("Movie added successfully!");
        handleReset();
        setSelectedTab("allMovies");
      })
      .catch(() => alert("Failed to add movie"));
  };

  const handleReset = () => {
    setNewMovie({ name: "", premiered: "", image: "", selectedGenres: [] });
  };

  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: theme.palette.background.paper,
        borderRadius: "10px",
        border: "1px solid white",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        width: "880px",
        height: "520px",
        margin: "0 auto",
        mt: 3,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginBottom: "20px",
          textAlign: "center",
          color: theme.palette.text.primary,
        }}
      >
        Add a New Movie
      </Typography>

      {/* Add Movie Form */}
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          {/* Input Fields */}
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
              value={newMovie.name}
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
              value={newMovie.premiered}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              color="primary"
              InputLabelProps={{ shrink: true }}
              inputProps={{ max: today }}
              sx={{
                "& .MuiInputBase-input": {
                  color: newMovie.premiered
                    ? theme.palette.text.primary
                    : "rgba(255, 255, 255, 0.7)",
                },
              }}
            />
            <TextField
              label="Image URL"
              name="image"
              value={newMovie.image}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              color="primary"
            />
          </Box>

          {/* Genre Selection */}
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
                      checked={newMovie.selectedGenres.includes(genre)}
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

        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 1 }}>
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
            sx={{ padding: "10px 20px", borderRadius: "8px" }}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setSelectedTab("allMovies")}
            sx={{
              padding: "10px 20px",
              borderRadius: "8px",
              marginLeft: "10px",
            }}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddMovie;