/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_MEMBER } from "../../redux/membersSlice";
import { DELETE_SUBSCRIPTION } from "../../redux/subscriptionsSlice";
import EditMember from "./EditMember";
import AddSubscription from "./AddSubscription";
import SubscriptionList from "./SubscriptionList";
import { Box, Typography, IconButton, Dialog, DialogContent, DialogTitle, useTheme } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";


const Member = ({ user, member }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const subscriptions = useSelector((state) => state.subscriptions.subscriptions);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const memberSubscriptions = subscriptions.filter((sub) => sub.memberId === member._id);

  // Deletes member & related subscriptions
  const handleDelete = async () => {
    const confirmed = await window.confirm(
      "Are you sure you want to delete this member and their subscription?"
    );
    if (confirmed) {
      memberSubscriptions.forEach((sub) => dispatch(DELETE_SUBSCRIPTION(sub._id)));
      dispatch(DELETE_MEMBER(member._id));
      alert("Member deleted successfully!");
    }
  };

  const handleEditOpen = () => setOpenEditDialog(true);
  const handleEditClose = () => setOpenEditDialog(false);

  return (
    <Box
      sx={{
        width: "92%",
        margin: "7px auto",
        padding: "10px",
        border: "2px solid #b0b0b0",
        borderRadius: "12px",
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography sx={{ width: "17%", textAlign: "left" }}>{member.name}</Typography>
      <Typography sx={{ width: "16%", textAlign: "center" }}>{member.email}</Typography>
      <Typography sx={{ width: "11%", textAlign: "center" }}>{member.city}</Typography>

      {/* Subscription List */}
      <Box
        sx={{
          width: "22%",
          textAlign: "center",
          color: theme.palette.text.secondary,
        }}
      >
        <SubscriptionList user={user} memberId={member._id} />
      </Box>

      {/* Add Subscription */}
      <Box
        sx={{
          width: "25%",
          textAlign: "center",
          color: theme.palette.text.secondary,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AddSubscription user={user} memberId={member._id} />
      </Box>

      {/* Actions buttons */}
      <Box
        sx={{
          width: "9%",
          display: "flex",
          gap: 1,
          justifyContent: "center",
        }}
      >
        <IconButton
          onClick={handleDelete}
          disabled={!user.permissions.includes("Delete Subscriptions")}
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
          onClick={handleEditOpen}
          disabled={!user.permissions.includes("Update Subscriptions")}
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

      {/* Edit Member Dialog */}
      <Dialog open={openEditDialog} onClose={handleEditClose} maxWidth="md">
        <DialogTitle sx={{ backgroundColor: "#0D1440", color: "white" }}>Edit</DialogTitle>
        <DialogContent sx={{ overflowX: "hidden" }}>
          <EditMember member={member} closeEditing={handleEditClose} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Member;