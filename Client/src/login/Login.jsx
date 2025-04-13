import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_USERS } from "../redux/usersSlice";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const USERS_LOGIN_URL = "http://localhost:4000/users/login";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const users = useSelector((state) => state.users.users);

  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    if (users.length === 0) dispatch(FETCH_USERS());
  }, [dispatch, users.length]);

  const handleLogin = async () => {
    setError("");

    try {
        // Password validation 
        const response = await fetch( USERS_LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, password }),
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem("userId", data.userId);
        navigate("/MainPage");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Invalid username or password!");
      }
    } catch (error) {
      setError("Failed to connect to the server");
      console.error("Login error:", error);
    }
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
        Welcome to Online Movies
      </Typography>

      {/* Login Form */}
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

        {/* Error Message */}
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {/* Login Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{ width: "100%", mb: 2 }}
        >
          Log In
        </Button>

        {/* Create Account Link */}
        <Typography>
          New user?{" "}
          <Link
            to="/CreateAccount"
            style={{ color: theme.palette.primary.main }}
          >
            Create account
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
