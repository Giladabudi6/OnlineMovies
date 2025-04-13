import { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_USER_BY_ID, RESET_CURRENT_USER } from "../redux/usersSlice";
import { SET_TAB } from "../redux/tabSlice";
import { CLEAR_MOVIES_SEARCH_QUERY, CLEAR_MEMBERS_SEARCH_QUERY } from "../redux/searchSlice";
import MoviesTab from "./movies/MoviesTab";
import SubscriptionsTab from "./subscriptions/SubscriptionsTab";
import UsersTab from "./users/UsersTab";
import { Button, Box, Typography, CircularProgress, Tabs, Tab, useTheme } from "@mui/material";

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sessionExpired, setSessionExpired] = useState(false);
  const [logoutWarning, setLogoutWarning] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const user = useSelector((state) => state.users.currentUser);
  const selectedTab = useSelector((state) => state.tab.activeTab);
  const status = useSelector((state) => state.users.status);
  const theme = useTheme();

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      dispatch(FETCH_USER_BY_ID(userId));
    }
  }, [dispatch]);

  useEffect(() => {
    if (user && selectedTab === null && !isLoggingOut) {
      if (user.permissions?.includes("View Movies")) {
        dispatch(SET_TAB("movies"));
      } else if (user.permissions?.includes("View Subscriptions")) {
        dispatch(SET_TAB("subscriptions"));
      } else {
        dispatch(SET_TAB("no-permissions"));
      }
    }
  }, [user, selectedTab, dispatch, status, isLoggingOut]);

  const handleLogout = useCallback(
    (expired = false) => {
      setIsLoggingOut(true);
      dispatch(SET_TAB(null));
      dispatch(CLEAR_MOVIES_SEARCH_QUERY());
      dispatch(CLEAR_MEMBERS_SEARCH_QUERY());
      dispatch(RESET_CURRENT_USER());
      sessionStorage.removeItem("userId");
      if (expired) setSessionExpired(true);
      navigate("/");
    },
    [dispatch, navigate]
  );

  useEffect(() => {
    if (user && user.sessionTimeOut) {
      const timeoutDuration = user.sessionTimeOut * 60 * 1000;
      const warningDuration = timeoutDuration - 60000;

      const timeoutId = setTimeout(() => handleLogout(true), timeoutDuration);

      let countdownInterval;
      const warningId = setTimeout(() => {
        setLogoutWarning(true);
        setSecondsRemaining(60);
        countdownInterval = setInterval(() => {
          setSecondsRemaining((prev) => {
            if (prev <= 1) {
              clearInterval(countdownInterval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }, warningDuration);

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(warningId);
        clearInterval(countdownInterval);
      };
    }
  }, [user, handleLogout]);

  const handleTabChange = (event, newTab) => {
    dispatch(SET_TAB(newTab));
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {status === "loading" && <CircularProgress />}

      {sessionExpired && (
        <Typography variant="h6" color="error">
          Your session has expired. Please log in again.
        </Typography>
      )}

      {logoutWarning && (
        <Typography variant="h6" color="red">
          Your session will expire in {secondsRemaining} seconds
        </Typography>
      )}

      {/* Header */}
      <Box
        sx={{
          flexShrink: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          backgroundColor: "transparent",
        }}
      >
        {user && (
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", backgroundColor: "transparent" }}
          >
            Hello {user.firstName}
          </Typography>
        )}
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleLogout(false)}
        >
          Logout
        </Button>
      </Box>

      {/* Navigation Tabs */}
      {user?.permissions?.length > 0 && (
        <Box sx={{ flexShrink: 0, backgroundColor: "transparent" }}>
          <Box
            sx={{ display: "flex", justifyContent: "center", mt: 1, mb: -5 }}
          >
            <Tabs
              value={selectedTab || "movies"}
              onChange={handleTabChange}
              variant="standard"
              aria-label="Tabs example"
              sx={theme.components?.MuiTabs?.styleOverrides?.root}
            >
              <Tab
                label="Movies"
                value="movies"
                disabled={!user.permissions.includes("View Movies")}
              />
              <Tab
                label="Subscriptions"
                value="subscriptions"
                disabled={!user.permissions.includes("View Subscriptions")}
              />
              {user.userName === "admin" && (
                <Tab label="Manage Users" value="Users" />
              )}
            </Tabs>
          </Box>
        </Box>
      )}

      {/* Content */}
      <Box sx={{ flexGrow: 1, marginTop: "20px" }}>
        {user && (
          <>
            {selectedTab === "movies" && <MoviesTab user={user} />}
            {selectedTab === "subscriptions" && (
              <SubscriptionsTab user={user} />
            )}
            {selectedTab === "Users" && <UsersTab />}
          </>
        )}
        {selectedTab === "no-permissions" && (
          <Typography variant="h6">No available permissions</Typography>
        )}
      </Box>
    </Box>
  );
};

export default MainPage;
