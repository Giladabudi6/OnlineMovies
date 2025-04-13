/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { DELETE_USER } from "../../redux/usersSlice";
import EditUser from "./EditUser";
import { Box, Typography, IconButton, Dialog, DialogContent, DialogTitle, Chip } from "@mui/material";
import { Edit, Delete, CheckCircle, Cancel } from "@mui/icons-material";


const User = ({ user }) => {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);

  const handleEdit = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleDelete = async () => {
    const confirmed = await window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      dispatch(DELETE_USER(user._id));
      alert("User deleted successfully!");
    }
  };

  return (
    <Box
      sx={{
        width: "92%",
        margin: "7px auto",
        padding: "0",
        border: "2px solid #b0b0b0",
        borderRadius: "12px",
        backgroundColor: "#0D1440",
      }}
    >
      {/* User Information Row */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          color: "white",
        }}
      >
        <Box sx={{ width: "12%", textAlign: "center", justifyContent: "center" }}>
          <Typography>
            {user.firstName} {user.lastName}
          </Typography>
        </Box>
        <Box sx={{ width: "20%", textAlign: "center", justifyContent: "center" }}>
          <Typography>{user.userName}</Typography>
        </Box>
        <Box sx={{ width: "5%", textAlign: "center", justifyContent: "center" }}>
          {user.password ? (
            <CheckCircle sx={{ color: "green" }} /> 
          ) : (
            <Cancel sx={{ color: "red" }} /> 
          )}
        </Box>
        <Box sx={{ width: "10%", textAlign: "center", justifyContent: "center" }}>
          <Typography>{user.createdDate}</Typography>
        </Box>
        <Box sx={{ width: "8%", textAlign: "center", justifyContent: "center" }}>
          <Typography>{user.sessionTimeOut} minutes</Typography>
        </Box>

        {/* User Permissions */}
        <Box
          sx={{
            width: "38%",
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            justifyContent: "center",
          }}
        >
          {user.permissions.length > 0 ? (
            user.permissions.map((perm, index) => (
              <Chip key={index} label={perm} color="white" variant="outlined" />
            ))
          ) : (
            <Chip label="No permissions" color="primary" variant="outlined" />
          )}
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            width: "7%",
            display: "flex",
            gap: 1,
            justifyContent: "center",
            mr: 1,
          }}
        >
          <IconButton
            onClick={handleDelete}
            sx={{
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              padding: "8px",
              borderRadius: "40%",
              border: "1px solid red",
              "&:hover": {
                backgroundColor: "rgba(160, 0, 0, 0.7)",
              },
            }}
          >
            <Delete />
          </IconButton>

          <IconButton
            onClick={handleEdit}
            sx={{
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              padding: "8px",
              borderRadius: "40%",
              border: "1px solid rgba(58, 188, 235, 0.7)",
              "&:hover": {
                backgroundColor: "rgba(58, 188, 235, 0.7)",
              },
            }}
          >
            <Edit />
          </IconButton>
        </Box>
      </Box>

      {/* Edit User Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
        <DialogTitle sx={{ backgroundColor: "#0D1440", color: "white" }}>Edit</DialogTitle>
        <DialogContent sx={{ overflowX: "hidden", backgroundColor: "#0D1440" }}>
          <EditUser userId={user._id} closeEditing={handleCloseDialog} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default User;
