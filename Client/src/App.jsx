import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import store from "./redux/store";
import theme from "./theme";
import CreateAccount from "./login/CreateAccount";
import MainPage from "./mainPage/MainPage";
import Login from "./login/Login";
import cinema from "./assets/cinema.jpg";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* Background Image */}
        <Box
          sx={{
            position: "relative",
            minHeight: "100vh",
            width: "100%",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(13, 20, 64, 0.3)",
              zIndex: -1,
            },
            backgroundImage: `url(${cinema})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            zIndex: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Application Routes */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/CreateAccount" element={<CreateAccount />} />
            <Route path="/MainPage" element={<MainPage />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </Provider>
  );
};

export default App;