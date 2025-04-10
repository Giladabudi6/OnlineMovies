/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ADD_USER, FETCH_USERS } from "../../redux/usersSlice";
import { Button, Box, Typography, Checkbox, FormControlLabel, TextField, useTheme } from "@mui/material";

const permissionsList = [ "View Movies", "Create Movies", "Update Movies", "Delete Movies",
  "View Subscriptions", "Create Subscriptions", "Update Subscriptions", "Delete Subscriptions" ];


const AddUser = ({ setSelectedTab }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    sessionTimeOut: "",
    userName: "",
    permissions: [],
  });

  useEffect(() => {
    dispatch(FETCH_USERS());
  }, [dispatch]);

  const theme = useTheme();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (value.length > 30) return;
    setNewUser({ ...newUser, [name]: value });
  };

  const handlePermissionChange = (e) => {
    const { name, checked } = e.target;
    let updatedPermissions = checked
      ? [...newUser.permissions, name]
      : newUser.permissions.filter((perm) => perm !== name);

    // Logic for handling Movies permissions dependencies
    if (name.includes("Movies")) {
      const viewPermission = "View Movies";
      if (checked && name !== viewPermission && !updatedPermissions.includes(viewPermission)) {
        updatedPermissions.push(viewPermission);
      } else if (!checked && name === viewPermission) {
        updatedPermissions = updatedPermissions.filter(
          (perm) => !perm.includes("Movies") || perm === viewPermission
        );
      }
    }

    // Logic for handling Subscriptions permissions dependencies
    if (name.includes("Subscriptions")) {
      const viewPermission = "View Subscriptions";
      if (checked && name !== viewPermission && !updatedPermissions.includes(viewPermission)) {
        updatedPermissions.push(viewPermission);
      } else if (!checked && name === viewPermission) {
        updatedPermissions = updatedPermissions.filter(
          (perm) => !perm.includes("Subscriptions") || perm === viewPermission
        );
      }
    }

    setNewUser({ ...newUser, permissions: updatedPermissions });
  };

  // Validate and submit a new user
  const handleSubmit = (e) => {
    e.preventDefault();
    if (users.some((u) => u.userName.toLowerCase() === newUser.userName.toLowerCase())) {
      alert("Username already exists");
      return;
    }
    if (!newUser.firstName.trim()) {
      alert("First name is required");
      return;
    }
    if (!newUser.lastName.trim()) {
      alert("Last name is required");
      return;
    }
    if (!newUser.userName.trim()) {
      alert("Username is required");
      return;
    }
    if (newUser.sessionTimeOut < 5 || newUser.sessionTimeOut > 60) {
      alert("Session Timeout must be between 5 and 60 minutes");
      return;
    }
    dispatch(ADD_USER(newUser));
    alert("User added successfully!");
    handleClear();
    setSelectedTab("allUsers");
  };

  const handleClear = () => {
    setNewUser({
      firstName: "",
      lastName: "",
      sessionTimeOut: "",
      userName: "",
      permissions: [],
    });
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
        Add a New User
      </Typography>

      {/* Add User Form */}
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
              width: "53%",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              mt: "2px",
              ml: "44px",
              alignItems: "center",
            }}
          >
            <TextField
              label="First Name"
              name="firstName"
              value={newUser.firstName}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              color="primary"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={newUser.lastName}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              color="primary"
            />
            <TextField
              label="Username"
              name="userName"
              value={newUser.userName}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              color="primary"
            />
            <TextField
              label="Session Timeout (minutes)"
              name="sessionTimeOut"
              type="number"
              value={newUser.sessionTimeOut}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              color="primary"
              inputProps={{ min: 5, max: 60 }}
            />
          </Box>

          {/* Permissions Section */}
          <Box
            sx={{
              width: "35%",
              mt: -1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.primary,
                marginBottom: "1px",
                textAlign: "left",
              }}
            >
              Permissions
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                mt: 1,
              }}
            >
              {permissionsList.map((permission) => (
                <FormControlLabel
                  key={permission}
                  control={
                    <Checkbox
                      name={permission}
                      checked={newUser.permissions.includes(permission)}
                      onChange={handlePermissionChange}
                      color="primary"
                    />
                  }
                  label={permission}
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
            sx={{ padding: "10px 20px", borderRadius: "8px", marginRight: "10px" }}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClear}
            sx={{ padding: "10px 20px", borderRadius: "8px" }}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setSelectedTab("allUsers")}
            sx={{ padding: "10px 20px", borderRadius: "8px", marginLeft: "10px" }}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddUser;