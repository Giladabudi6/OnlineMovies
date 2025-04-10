/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardMedia, Typography, Box, IconButton, Dialog, DialogContent, DialogTitle, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DELETE_MOVIE } from "../../redux/moviesSlice";
import { UPDATE_SUBSCRIPTION, DELETE_SUBSCRIPTION } from "../../redux/subscriptionsSlice";
import EditMovie from "./EditMovie";
import { SET_TAB } from "../../redux/tabSlice";
import { SET_MEMBERS_SEARCH_QUERY } from "../../redux/searchSlice";
import { Edit, Delete } from "@mui/icons-material";


const Movie = ({ user, movie }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [showSubscribers, setShowSubscribers] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();

  const subscriptions = useSelector(
    (state) => state.subscriptions.subscriptions
  );
  const members = useSelector((state) => state.members.members);

  const movieSubscribers = subscriptions
    .filter((sub) => sub.movies.some((m) => m.movieId === movie._id))
    .map((sub) => {
      const member = members.find((m) => m._id === sub.memberId);
      const movieData = sub.movies.find((m) => m.movieId === movie._id);
      return member ? { name: member.name, date: movieData.date } : null;
    })
    .filter(Boolean);

  const handleEdit = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

    // Deletes movie & related subscriptions.
  const handleDelete = async () => {
    const confirmed = await window.confirm(
      "Are you sure you want to delete this movie?"
    );
    if (confirmed) {
      dispatch(DELETE_MOVIE(movie._id));
      alert("Movie deleted successfully!");
      subscriptions
        .filter((sub) => sub.movies.some((m) => m.movieId === movie._id))
        .forEach((sub) => {
          const updatedMovies = sub.movies.filter(
            (movieItem) => movieItem.movieId !== movie._id
          );
          if (updatedMovies.length === 0) {
            dispatch(DELETE_SUBSCRIPTION(sub._id));
          } else {
            dispatch(
              UPDATE_SUBSCRIPTION({
                subscriptionId: sub._id,
                updatedSubscription: { ...sub, movies: updatedMovies },
              })
            );
          }
        });
    }
  };

  const handleMemberClick = (memberName) => {
    dispatch(SET_MEMBERS_SEARCH_QUERY(memberName));
    dispatch(SET_TAB("subscriptions"));
  };

  const toggleSubscribers = () => {
    setShowSubscribers(!showSubscribers);
  };

  return (
    <Card
      sx={{
        ...theme.components.MuiCard.styleOverrides.root,
        position: "relative",
      }}
    >
      <CardMedia
        component="img"
        height="220"
        image={movie.image || "/placeholder.jpg"}
        alt={movie.name}
        sx={{
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          mb: -1.5,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 20,
          left: 20,
          right: 20,
          display: "flex",
          justifyContent: "space-between",
          zIndex: 1,
        }}
      >
        {/* Action Buttons */}
        <IconButton
          onClick={handleDelete}
          disabled={!user.permissions?.includes("Delete Movies")}
          sx={{
            color: theme.palette.text.primary,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            border: `1px solid white`,
            padding: "12px",
            borderRadius: "40%",
            "&:hover": {
              backgroundColor: user.permissions?.includes("Delete Movies")
                ? "rgba(160, 0, 0, 0.7)"
                : "rgba(0, 0, 0, 0.4)",
            },
          }}
        >
          <Delete />
        </IconButton>

        <IconButton
          onClick={handleEdit}
          disabled={!user.permissions?.includes("Update Movies")}
          sx={{
            color: theme.palette.text.primary,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            border: `1px solid white`,
            padding: "12px",
            borderRadius: "40%",
            "&:hover": {
              backgroundColor: user.permissions?.includes("Update Movies")
                ? "rgba(58, 188, 235, 0.7)"
                : "rgba(0, 0, 0, 0.4)",
            },
          }}
        >
          <Edit />
        </IconButton>
      </Box>

      <CardContent>
        <Typography
          variant="h7"
          color={theme.palette.text.primary}
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          {movie.name} ({new Date(movie.premiered).getFullYear()})
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            mr: -1.5,
            ml: -1.5,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#b7e9f7",
              textAlign: "center",
              fontSize: "0.85rem",
              mt: "2px",
            }}
          >
            {movie.genres.join(" • ")}
          </Typography>
        </Box>

        {/* Show Subscribers Button */}
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={toggleSubscribers}
          >
            {showSubscribers ? "Hide Subscribers" : "Show Subscribers"}
          </Button>
        </Box>

        {/* Subscribers List */}
        {showSubscribers && (
          <Box
            sx={{
              mt: 2,
              mb: -2,
              ml: "-16px",
              fontSize: "0.75rem",
              overflowY: "auto",
              border: "1px solid",
              borderColor: "#b0b0b0",
              padding: "3px",
              borderRadius: "4px",
              width: "210px",
              maxHeight: "80px",
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f1f1f1",
              },
            }}
          >
            {movieSubscribers.length > 0 ? (
              movieSubscribers.map((sub, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "4px",
                    mr: 1,
                  }}
                >
                  <Button
                    onClick={() =>
                      user.permissions?.includes("View Subscriptions") &&
                      handleMemberClick(sub.name)
                    }
                    disabled={!user.permissions?.includes(
                      "View Subscriptions"
                    )}
                    sx={{
                      background: "none",
                      border: "none",
                      color: user.permissions?.includes("View Subscriptions")
                        ? "#03A9F4"
                        : theme.palette.text.disabled,
                      textDecoration: "underline",
                      cursor: user.permissions?.includes("View Subscriptions")
                        ? "pointer"
                        : "not-allowed",
                      padding: 0,
                      fontSize: "inherit",
                      textAlign: "left",
                      flexGrow: 1,
                      minWidth: 0,
                      justifyContent: "flex-start",
                    }}
                  >
                    {sub.name}
                  </Button>
                  <Typography
                    variant="caption"
                    color={theme.palette.text.secondary}
                    sx={{
                      textAlign: "right",
                      minWidth: "fit-content",
                    }}
                  >
                    {new Date(sub.date).toLocaleDateString()}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="caption" color="gray">
                No subscribers
              </Typography>
            )}
          </Box>
        )}
      </CardContent>

      {/* Edit Movie Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
        <DialogTitle sx={{ backgroundColor: "#0D1440" }}>Edit</DialogTitle>
        <DialogContent sx={{ overflowX: "hidden", backgroundColor: "#0D1440" }}>
          <EditMovie movie={movie} closeEditing={handleCloseDialog} />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default Movie;