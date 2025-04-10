/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_MOVIES } from "../../redux/moviesSlice";
import { FETCH_SUBSCRIPTIONS } from "../../redux/subscriptionsSlice";
import { FETCH_MEMBERS } from "../../redux/membersSlice";
import {
  SET_MOVIES_SEARCH_QUERY,
  CLEAR_MOVIES_SEARCH_QUERY,
} from "../../redux/searchSlice";
import Movie from "./Movie";
import { Box, Input, Select, MenuItem, Button, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AllMovies = ({ user, setShowAdd }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const movies = useSelector((state) => state.movies.movies);
  const searchQuery = useSelector((state) => state.moviesSearch.searchQuery);

  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    dispatch(FETCH_MOVIES());
    dispatch(FETCH_SUBSCRIPTIONS());
    dispatch(FETCH_MEMBERS());
  }, [dispatch]);

  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    dispatch(SET_MOVIES_SEARCH_QUERY(e.target.value));
  };

  const handleClear = () => {
    setSearchTerm("");
    setSelectedGenre("");
    dispatch(CLEAR_MOVIES_SEARCH_QUERY());
  };

  const allGenres = [...new Set(movies.flatMap((movie) => movie.genres))];
  const filteredMovies = movies.filter(
    (movie) =>
      movie.name.toLowerCase().includes(searchTerm?.toLowerCase()) &&
      (selectedGenre === "" || movie.genres.includes(selectedGenre))
  );

  return (
    <Box
      sx={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "transparent",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Search and Filter */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            marginBottom: "15px",
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
              flexGrow: 1,
              mb: -4,
            }}
          >
            {/* Search by name */}
            <Input
              sx={{ width: "250px", height: "40px" }}
              type="text"
              placeholder="Search movie..."
              value={searchTerm}
              onChange={handleSearchChange}
            />

            {/* Search by genre */}
            <Select
              sx={{
                width: "250px",
                height: "40px",
                backgroundColor: "#676767",
                color: selectedGenre
                  ? theme.palette.text.primary
                  : "rgba(255, 255, 255, 0.5)",
              }}
              value={selectedGenre}
              displayEmpty
              onChange={(e) => setSelectedGenre(e.target.value)}
              renderValue={(selected) => selected || "All Genres"}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                  },
                },
              }}
            >
              <MenuItem
                value=""
                disabled
                sx={{
                  color: "rgba(255, 255, 255, 0.5)",
                }}
              >
                All Genres
              </MenuItem>
              {allGenres
                .sort((a, b) => {
                  const genreA = a.toUpperCase();
                  const genreB = b.toUpperCase();
                  if (genreA < genreB) {
                    return -1;
                  }
                  if (genreA > genreB) {
                    return 1;
                  }
                  return 0;
                })
                .map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
            </Select>

            {/* Clear button */}
            <Button
              sx={{ height: "40px" }}
              variant="outlined"
              color="secondary"
              onClick={handleClear}
            >
              Clear
            </Button>
          </Box>
        </Box>

        {/* Add Movie Button */}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() =>
            user.permissions.includes("Create Movies") && setShowAdd(true)
          }
          sx={{
            fontSize: "1rem",
            padding: "10px 24px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            height: "60px",
            position: "absolute",
            right: "180px",
            top: "172px",
            pointerEvents: user.permissions.includes("Create Movies")
              ? "auto"
              : "none",
            backgroundColor: user.permissions.includes("Create Movies")
              ? "primary.main"
              : "gray",
            "&:hover": {
              backgroundColor: user.permissions.includes("Create Movies")
                ? "primary.dark"
                : "gray",
            },
          }}
        >
          Add Movie
        </Button>
      </Box>

      {/* Movies List */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          marginTop: "18px",
          padding: "0 2px",
        }}
      >
        {filteredMovies.map((movie) => (
          <Movie key={movie._id} movie={movie} user={user} />
        ))}
      </Box>
    </Box>
  );
};

export default AllMovies;
