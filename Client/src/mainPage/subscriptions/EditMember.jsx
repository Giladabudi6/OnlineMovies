/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_MEMBER, FETCH_MEMBERS } from "../../redux/membersSlice";
import { useTheme } from "@mui/material/styles";
import { Box, TextField, Button } from "@mui/material";

const EditMember = ({ member, closeEditing }) => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members.members);
  const theme = useTheme();
  const [updateMember, setUpdateMember] = useState({ ...member });
  const [originalMember, setOriginalMember] = useState({ ...member });

  useEffect(() => {
    if (!members.length) {
      dispatch(FETCH_MEMBERS());
    }
  }, [dispatch, members.length]);

  useEffect(() => {
    if (member) {
      setUpdateMember({ ...member });
      setOriginalMember({ ...member });
    }
  }, [member]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name" && value.length > 30) return;
    if (name === "email" && value.length > 30) return;
    if (name === "city" && value.length > 30) return;
    setUpdateMember((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate and submit movie changes
    if (!updateMember.name.trim() || updateMember.name.length > 30) {
      alert("Please enter a valid member name");
      return;
    }
    if (
      !updateMember.email.trim() ||
      updateMember.email.length > 30 ||
      !updateMember.email.includes("@")
    ) {
      alert("Please enter a valid member email");
      return;
    }
    if (
      members.some(
        (m) =>
          m.email.toLowerCase() === updateMember.email.toLowerCase() &&
          m._id !== member._id
      )
    ) {
      alert("A member with this email already exists");
      return;
    }
    if (!updateMember.city.trim() || updateMember.city.length > 30) {
      alert("Please enter a valid member city");
      return;
    }
    dispatch(
      UPDATE_MEMBER({ memberId: member._id, updatedMember: updateMember })
    );
    alert("Member updated successfully!");
    closeEditing();
  };

  const handleReset = () => {
    setUpdateMember({ ...originalMember });
  };

  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: theme.palette.background.paper,
        borderRadius: "10px",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        width: "880px",
        margin: "0 auto",
        mt: -4,
      }}
    >
      <form onSubmit={handleSubmit}>
        {/* Input fields */}
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
            value={updateMember.name || ""}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            color="primary"
            inputProps={{ maxLength: 30 }}
          />
          <TextField
            label="Email"
            name="email"
            value={updateMember.email || ""}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            color="primary"
            inputProps={{ maxLength: 30 }}
          />
          <TextField
            label="City"
            name="city"
            value={updateMember.city || ""}
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
            sx={{
              padding: "10px 20px",
              borderRadius: "8px",
              marginRight: "10px",
            }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={closeEditing}
            sx={{
              padding: "10px 20px",
              borderRadius: "8px",
              marginRight: "10px",
            }}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditMember;
