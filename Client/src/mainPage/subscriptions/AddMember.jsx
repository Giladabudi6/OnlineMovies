/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_MEMBER } from "../../redux/membersSlice";
import { Box, Typography, TextField, Button, useTheme } from "@mui/material";

const AddMember = ({ setShowAdd }) => {
  const dispatch = useDispatch();
  const { members, status } = useSelector((state) => state.members);
  const theme = useTheme();
  const [newMember, setNewMember] = useState({ name: "", email: "", city: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name" && value.length > 30) return;
    setNewMember((prev) => ({ ...prev, [name]: value }));
  };

  // Validate and submit a new member
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newMember.name.trim() || newMember.name.length > 30) {
      alert("Please enter a valid name");
      return;
    }
    if (
      !newMember.email.trim() ||
      newMember.email.length > 30 ||
      !newMember.email.includes("@")
    ) {
      alert("Please enter a valid email");
      return;
    }
    if (
      members.some(
        (m) => m.email.toLowerCase() === newMember.email.toLowerCase()
      )
    ) {
      alert("A member with this email already exists");
      return;
    }
    if (!newMember.city.trim() || newMember.city.length > 30) {
      alert("Please enter a valid city");
      return;
    }

    await dispatch(ADD_MEMBER(newMember));
    alert("Member added successfully!");
    handleReset();
    setShowAdd(false);
  };

  const handleReset = () => {
    setNewMember({ name: "", email: "", city: "" });
  };

  if (status === "loading") return <div>Loading members...</div>;
  if (status === "failed") return <div>Error loading members.</div>;

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
        Add a New Member
      </Typography>

      {/* Add Member Form */}
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "35px",
            width: "60%",
            margin: "0 auto",
            marginTop: "35px",
          }}
        >
          <TextField
            label="Name"
            name="name"
            value={newMember.name}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            color="primary"
            inputProps={{ maxLength: 30 }}
          />
          <TextField
            label="Email"
            name="email"
            value={newMember.email}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            color="primary"
            inputProps={{ maxLength: 30 }}
          />
          <TextField
            label="City"
            name="city"
            value={newMember.city}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            color="primary"
            inputProps={{ maxLength: 30 }}
          />
        </Box>

        {/* Form Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "40px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              padding: "10px 20px",
              borderRadius: "8px",
              marginRight: "10px",
            }}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleReset}
            sx={{ padding: "10px 20px", borderRadius: "8px" }}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowAdd(false)}
            sx={{
              padding: "10px 20px",
              borderRadius: "8px",
              marginLeft: "10px",
            }}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddMember;
