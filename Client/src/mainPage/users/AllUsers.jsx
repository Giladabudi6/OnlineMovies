/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_USERS } from "../../redux/usersSlice";
import User from "./User";
import { Box, Input, Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";


const AllUsers = ({ setShowAdd }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [searchTerm, setSearchTerm] = useState("");
  const [isActivated, setIsActivated] = useState(false);

  useEffect(() => {
    dispatch(FETCH_USERS());
  }, [dispatch]);

  const handleClear = () => {
    setSearchTerm("");
    setIsActivated(false);
  };

  const filteredUsers = users
    .filter((u) => u.userName !== "admin")
    .filter((u) =>
      `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((u) => (isActivated ? u.password !== "" : true));

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
          width: "100%",
          flexWrap: "wrap",
          flexGrow: 1,
        }}
      >
        <Input
          sx={{ width: "250px", height: "40px" }}
          type="text"
          placeholder="Search user..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FormControlLabel
          control={<Checkbox checked={isActivated} onChange={() => setIsActivated(!isActivated)} />}
          label="Activated Only"
        />
        <Button sx={{ height: "40px" }} variant="outlined" color="secondary" onClick={handleClear}>
          Clear
        </Button>
      </Box>

      {/* Add User Button */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setShowAdd(true)}
        sx={{
          fontSize: "1rem",
          padding: "10px 24px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          height: "60px",
          position: "absolute",
          right: "180px",
          top: "172px",
        }}
      >
        Add User
      </Button>

    {/* User Table Header */}
<Box
  sx={{
    width: "92%",
    marginTop: "20px",
    marginBottom: "5px",
    display: "flex",
    justifyContent: "space-between",
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
  <Box sx={{ width: "12%", textAlign: "center" }}>
    <Typography>Full Name</Typography>
  </Box>
  <Box sx={{ width: "20%", textAlign: "center" }}>
    <Typography>Username</Typography>
  </Box>
  <Box sx={{ width: "5%", textAlign: "center" }}>
    <Typography>Activated</Typography> 
  </Box>
  <Box sx={{ width: "10%", textAlign: "center" }}>
    <Typography>Created</Typography>
  </Box>
  <Box sx={{ width: "8%", textAlign: "center" }}>
    <Typography>Session</Typography>
  </Box>
  <Box sx={{ width: "38%", textAlign: "center" }}>
    <Typography>Permissions</Typography>
  </Box>
  <Box sx={{ width: "7%", textAlign: "center" }}>
    <Typography>Actions</Typography>
  </Box>
</Box>

      {/* Users list */}
      <Box sx={{ width: "100%" }}>
        {filteredUsers.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </Box>
    </Box>
  );
};

export default AllUsers;
