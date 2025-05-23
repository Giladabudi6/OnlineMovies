import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { GlobalAlertProvider } from "./GlobalAlertProvider.jsx";

/* Root Rendering */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalAlertProvider>
        <App />
      </GlobalAlertProvider>
    </BrowserRouter>
  </StrictMode>
);
