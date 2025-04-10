import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_USERS, UPDATE_USER } from "../redux/usersSlice";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";


const CreateAccount = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleCreate = async () => {
    if (users.length === 0) dispatch(FETCH_USERS());

    const user = users.find((u) => userName === u.userName);
    if (!user) {
      setError("Username does not exist");
      return;
    }

    if (user.password !== "") {
      setError("User already exists. Please log in.");
      return;
    }

    if (password.length < 8 || password.length > 16) {
      setError("Password must be between 8 and 16 characters.");
      return;
    }

    dispatch(
      UPDATE_USER({ userId: user._id, updatedUser: { ...user, password } })
    );
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "110px",
        marginTop: -18,
      }}
    >
      {/* Title */}
      <Typography
        variant="h2"
        gutterBottom
        fontWeight="bold"
        sx={{
          textAlign: "center",
          color: theme.palette.text.primary,
          marginBottom: "20px",
        }}
      >
        Create Account
      </Typography>

      {/* Account Creation Form */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "rgba(13, 20, 64, 0.0)",
          color: theme.palette.text.primary,
          padding: "30px",
          borderRadius: "8px",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <TextField
          label="User Name"
          variant="outlined"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          sx={{ width: "100%", mb: 2 }}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ width: "100%", mb: 2 }}
        />

        {/* Error Message Display */}
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {/* Create Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreate}
          sx={{ width: "100%", mb: 2 }}
        >
          Create
        </Button>

        {/* Back to Login Button */}
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/")}
          sx={{ width: "100%" }}
        >
          Back to log in
        </Button>
      </Box>
    </Box>
  );
};

export default CreateAccount;
