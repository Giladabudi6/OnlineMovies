/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { SET_TAB } from "../../redux/tabSlice";
import { SET_MOVIES_SEARCH_QUERY } from "../../redux/searchSlice";


const SubscriptionList = ({ user, memberId }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const subscriptions = useSelector((state) => state.subscriptions.subscriptions);
  const memberSubscription = subscriptions.find((sub) => sub.memberId === memberId);

  const handleMovieClick = (movieName) => {
    dispatch(SET_TAB("movies"));
    dispatch(SET_MOVIES_SEARCH_QUERY(movieName));
  };

  return (
    <Box
      sx={{
        padding: "10px",
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: "4px",
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
    >
      {/* List of subscribed movies */}
      {memberSubscription?.movies.length > 0 ? (
        <Box
          sx={{
            maxHeight: "80px",
            overflowY: "auto",
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
          {memberSubscription.movies.map((sub, index) => {
            const movie = movies.find((m) => m._id === sub.movieId);
            return movie ? (
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
                    user.permissions?.includes("View Movies") &&
                    handleMovieClick(movie.name)
                  }
                  disabled={!user.permissions?.includes("View Movies")}
                  sx={{
                    textDecoration: "underline",
                    color: user.permissions?.includes("View Movies")
                      ? theme.palette.primary.main
                      : theme.palette.text.disabled,
                    fontSize: "0.8rem",
                    padding: 0,
                    minWidth: "auto",
                    textAlign: "left",
                  }}
                >
                  {movie.name}
                </Button>
                <Typography
                  variant="caption"
                  color={theme.palette.text.secondary}
                >
                  {sub.date}
                </Typography>
              </Box>
            ) : null;
          })}
        </Box>
      ) : (
        /* Message if no subscriptions */
        <Typography variant="body2" color={theme.palette.text.secondary}>
          No movies subscribed yet.
        </Typography>
      )}
    </Box>
  );
};

export default SubscriptionList;