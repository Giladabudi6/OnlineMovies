/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_SUBSCRIPTION, UPDATE_SUBSCRIPTION } from "../../redux/subscriptionsSlice";
import { Box, Button, Select, MenuItem, TextField, useTheme } from "@mui/material";

const AddSubscription = ({ user, memberId }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const movies = useSelector((state) => state.movies.movies);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [date, setDate] = useState("");
  const [showAddMovie, setShowAddMovie] = useState(false);
  const subscriptions = useSelector(
    (state) => state.subscriptions.subscriptions
  );
  const memberSubscription = subscriptions.find(
    (sub) => sub.memberId === memberId
  );

  const handleAddSubscription = () => {
    if (selectedMovie && date && new Date(date) > new Date()) {
      const updatedMovies = memberSubscription
        ? [...memberSubscription.movies, { movieId: selectedMovie, date }]
        : [{ movieId: selectedMovie, date }];
      if (memberSubscription) {
        dispatch(
          UPDATE_SUBSCRIPTION({
            subscriptionId: memberSubscription._id,
            updatedSubscription: { memberId, movies: updatedMovies },
          })
        );
      } else {
        dispatch(ADD_SUBSCRIPTION({ memberId, movies: updatedMovies }));
      }
      setSelectedMovie("");
      setDate("");
      setShowAddMovie(false);
      alert("Subscription added successfully!");
    }
  };

  const handleCancel = () => {
    setSelectedMovie("");
    setDate("");
    setShowAddMovie(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "6px",
        borderRadius: "4px",
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        width: "80%",
        height: "100%",
        alignSelf: "center",
        margintop: 2,
      }}
    >
      {/* Show Add Subscription button */}
      {!showAddMovie && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignSelf: "center",
            width: "90%",
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={() =>
              user.permissions.includes("Create Subscriptions") &&
              setShowAddMovie(true)
            }
            disabled={!user.permissions.includes("Create Subscriptions")}
            sx={{
              width: "90%",
              height: "100%",
              border: "2px solid #03A9F4",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            Add Subscription
          </Button>
        </Box>
      )}
      {/* Add Subscription form */}
      {showAddMovie && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "12px",
            width: "100%",
          }}
        >
          {/* Select Movie */}
          <Select
            value={selectedMovie}
            onChange={(e) => setSelectedMovie(e.target.value)}
            fullWidth
            displayEmpty
            sx={{
              backgroundColor: "#676767",
              color: theme.palette.text.primary,
              width: "250px",
              height: "55px",
            }}
            renderValue={(selected) =>
              !selected ? (
                <em
                  style={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontStyle: "normal",
                  }}
                >
                  Select movie
                </em>
              ) : (
                movies.find((m) => m._id === selected)?.name || ""
              )
            }
          >
            <MenuItem
              value=""
              disabled
              sx={{ color: "rgba(255, 255, 255, 0.7)", fontStyle: "normal" }}
            >
              <em>Select movie</em>
            </MenuItem>
            {movies
              .filter(
                (m) =>
                  !memberSubscription?.movies.some(
                    (sub) => sub.movieId === m._id
                  )
              )
              .sort((a, b) => {
                const nameA = a.name.toUpperCase(); 
                const nameB = b.name.toUpperCase(); 
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
                return 0; 
              })
              .map((movie) => (
                <MenuItem key={movie._id} value={movie._id}>
                  {movie.name}
                </MenuItem>
              ))}
          </Select>

          {/* Subscription Date */}
          <TextField
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            inputProps={{
              min: new Date().toISOString().split("T")[0],
              style: {
                color: date
                  ? theme.palette.text.primary
                  : "rgba(255, 255, 255, 0.7)",
              },
            }}
            InputLabelProps={{
              shrink: true,
              style: { color: theme.palette.text.primary },
            }}
            InputProps={{ style: { padding: "0px", height: "100%" } }}
            label="Subscription Date"
            sx={{
              width: "250px",
              height: "55px",
              zIndex: 0,
              "& .MuiInputBase-input::placeholder": {
                color: "rgba(255, 255, 255, 0.7)",
                opacity: 1,
              },
            }}
          />

          {/* Action Buttons */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: "8px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddSubscription}
              disabled={!selectedMovie || !date || new Date(date) <= new Date()}
            >
              Subscribe
            </Button>
            <Button onClick={handleCancel} color="primary" variant="contained">
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AddSubscription;
