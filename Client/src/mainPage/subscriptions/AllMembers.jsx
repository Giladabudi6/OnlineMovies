/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_MEMBERS } from "../../redux/membersSlice";
import { FETCH_SUBSCRIPTIONS } from "../../redux/subscriptionsSlice";
import { FETCH_MOVIES } from "../../redux/moviesSlice";
import { SET_MEMBERS_SEARCH_QUERY, CLEAR_MEMBERS_SEARCH_QUERY } from "../../redux/searchSlice";
import Member from "./Member";
import { Box, Input, Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AllMembers = ({ user, setShowAdd }) => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members.members);
  const subscriptions = useSelector((state) => state.subscriptions.subscriptions);
  const searchQuery = useSelector((state) => state.membersSearch.searchQuery);
  const [searchTerm, setSearchTerm] = useState(searchQuery || "");
  const [filterBySubscribers, setFilterBySubscribers] = useState(false);

  useEffect(() => {
    dispatch(FETCH_MEMBERS());
    dispatch(FETCH_SUBSCRIPTIONS());
    dispatch(FETCH_MOVIES());
  }, [dispatch]);

  useEffect(() => {
    setSearchTerm(searchQuery || "");
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    dispatch(SET_MEMBERS_SEARCH_QUERY(e.target.value));
  };

  const handleClear = () => {
    setSearchTerm("");
    setFilterBySubscribers(false);
    dispatch(CLEAR_MEMBERS_SEARCH_QUERY());
  };

  const filteredMembers = members
    .filter((m) => m.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((m) => !filterBySubscribers || subscriptions.some((s) => s.memberId === m._id));

  return (
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
          marginTop: "20px",
          width: "92%",
          flexWrap: "wrap",
        }}
      >
        <Input
          sx={{ width: "250px", height: "40px" }}
          type="text"
          placeholder="Search member..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filterBySubscribers}
              onChange={() => setFilterBySubscribers(!filterBySubscribers)}
            />
          }
          label="Subscribers Only"
        />
        <Button sx={{ height: "40px" }} variant="outlined" color="secondary" onClick={handleClear}>
          Clear
        </Button>
      </Box>

      {/* Add Member Button */}
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() =>
          user.permissions.includes("Create Subscriptions") && setShowAdd(true)
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
          pointerEvents: user.permissions.includes("Create Subscriptions") ? "auto" : "none",
          backgroundColor: user.permissions.includes("Create Subscriptions") ? "primary.main" : "gray",
          "&:hover": {
            backgroundColor: user.permissions.includes("Create Subscriptions") ? "primary.dark" : "gray",
          },
        }}
      >
        Add Member
      </Button>

      {/* Members Table Header */}
      <Box
        sx={{
          width: "92%",
          marginTop: "20px",
          marginBottom: "5px",
          display: "flex",
          alignItems: "center",
          padding: "10px",
          backgroundColor: "#0288D1",
          color: "white",
          borderRadius: "12px 12px 0 0",
          fontWeight: "bold",
          fontSize: "1rem",
          position: "sticky",
          top: 0,
          zIndex: 1,
        }}
      >
        <Box sx={{ width: "17%", textAlign: "center" }}>
          <Typography>Name</Typography>
        </Box>
        <Box sx={{ width: "16%", textAlign: "center" }}>
          <Typography>Email</Typography>
        </Box>
        <Box sx={{ width: "11%", textAlign: "center" }}>
          <Typography>City</Typography>
        </Box>
        <Box sx={{ width: "22%", textAlign: "center" }}>
          <Typography>Subscribed Movies</Typography>
        </Box>
        <Box sx={{ width: "25%", textAlign: "center" }}>
          <Typography>Add movie</Typography>
        </Box>
        <Box sx={{ width: "9%", textAlign: "center" }}>
          <Typography>Actions</Typography>
        </Box>
      </Box>

      {/* Members list */}
      <Box sx={{ width: "100%" }}>
        {filteredMembers.map((member) => (
          <Member key={member._id} user={user} member={member} />
        ))}
      </Box>
    </Box>
  );
};

export default AllMembers;