/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_USER } from "../../redux/usersSlice";
import { useTheme } from "@mui/material/styles";
import { Box, TextField, Checkbox, FormControlLabel, Button, Typography } from "@mui/material";

const permissionsList = [ "View Movies", "Create Movies", "Update Movies", "Delete Movies",
  "View Subscriptions", "Create Subscriptions", "Update Subscriptions", "Delete Subscriptions" ];

const EditUser = ({ userId, closeEditing }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const user = users.find((u) => u._id === userId);
  const [editedUser, setEditedUser] = useState(user ? { ...user } : null);
  const [originalUser, setOriginalUser] = useState(user ? { ...user } : null);
  const theme = useTheme();

  useEffect(() => {
    if (user) {
      setEditedUser({ ...user });
      setOriginalUser({ ...user });
    }
  }, [user]);

  // Effect to automatically include "View" permission if other related permissions are checked
  useEffect(() => {
    if (!editedUser) return;
    const updatePermissions = () => {
      if (
        (editedUser.permissions.includes("Create Subscriptions") ||
          editedUser.permissions.includes("Update Subscriptions") ||
          editedUser.permissions.includes("Delete Subscriptions")) &&
        !editedUser.permissions.includes("View Subscriptions")
      ) {
        setEditedUser((prevState) => ({
          ...prevState,
          permissions: [...prevState.permissions, "View Subscriptions"],
        }));
      }
      if (
        (editedUser.permissions.includes("Create Movies") ||
          editedUser.permissions.includes("Update Movies") ||
          editedUser.permissions.includes("Delete Movies")) &&
        !editedUser.permissions.includes("View Movies")
      ) {
        setEditedUser((prevState) => ({
          ...prevState,
          permissions: [...prevState.permissions, "View Movies"],
        }));
      }
    };
    updatePermissions();
  }, [editedUser?.permissions]);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    let updatedPermissions = checked
      ? [...editedUser.permissions, name]
      : editedUser.permissions.filter((perm) => perm !== name);

    // Logic for Movies permissions dependency
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

    // Logic for Subscriptions permissions dependency
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
    setEditedUser((prevState) => ({
      ...prevState,
      permissions: updatedPermissions,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (value.length > 30) return;
    setEditedUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleReset = () => {
    if (originalUser) {
      setEditedUser({ ...originalUser });
    }
  };

  // Validate and submit user changes
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      users.some(
        (u) =>
          u._id !== editedUser._id &&
          u.userName.toLowerCase() === editedUser.userName.toLowerCase()
      )
    ) {
      alert("Username already exists");
      return;
    }

    if (!editedUser.firstName.trim()) {
      alert("First name is required");
      return;
    }
    if (!editedUser.lastName.trim()) {
      alert("Last name is required");
      return;
    }
    if (!editedUser.userName.trim()) {
      alert("Username is required");
      return;
    }
    if (editedUser.sessionTimeOut < 5 || editedUser.sessionTimeOut > 60) {
      alert("Session Timeout must be between 5 and 60 minutes");
      return;
    }

    dispatch(UPDATE_USER({ userId: editedUser._id, updatedUser: editedUser }));
    alert("User updated successfully!");
    closeEditing();
  };

  if (!editedUser) return <div>User not found</div>;

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
      {/* Edit User Form */}
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          {/* User Details Section */}
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
              value={editedUser.firstName || ""}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              color="primary"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={editedUser.lastName || ""}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              color="primary"
            />
            <TextField
              label="Username"
              name="userName"
              value={editedUser.userName || ""}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              color="primary"
            />
            <TextField
              label="Session Timeout (minutes)"
              name="sessionTimeOut"
              type="number"
              value={editedUser.sessionTimeOut || ""}
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
                      checked={editedUser.permissions?.includes(permission) || false}
                      onChange={handleChange}
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
            onClick={handleReset}
            sx={{ padding: "10px 20px", borderRadius: "8px", marginRight: "10px" }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={closeEditing}
            sx={{ padding: "10px 20px", borderRadius: "8px", marginRight: "10px" }}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditUser;