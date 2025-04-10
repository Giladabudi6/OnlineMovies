/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useContext, useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

/* Alert Context Definition */
const AlertContext = createContext();

/* Custom Hook for Using Alert Context */
export const useAlert = () => useContext(AlertContext);

/* Global Alert Provider Component */
export const GlobalAlertProvider = ({ children }) => {
  /* Alert State Management */
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  /* Confirmation Dialog State Management */
  const [confirmState, setConfirmState] = useState({
    open: false,
    message: "",
    resolve: null,
  });

  /* Function to Show Alert Snackbar */
  const showAlert = (message, severity = "info") => {
    setAlertState({ open: true, message, severity });
  };

  /* Function to Show Confirmation Dialog */
  const showConfirm = (message) => {
    return new Promise((resolve) => {
      setConfirmState({ open: true, message, resolve });
    });
  };

  /* Effect to Override Global Alert and Confirm */
  useEffect(() => {
    window.alert = (message) => {
      showAlert(message, "info");
    };

    window.showAlert = showAlert;
    window.confirm = showConfirm;
  }, []);

  /* Handler for Closing Confirmation Dialog */
  const handleConfirmClose = (result) => {
    if (confirmState.resolve) confirmState.resolve(result);
    setConfirmState({ ...confirmState, open: false });
  };

  /* Rendering the Alert Context Provider */
  return (
    <AlertContext.Provider value={{ showAlert, showConfirm }}>
      {children}
      {/* Alert Snackbar */}
      <Snackbar
        open={alertState.open}
        autoHideDuration={4000}
        onClose={() => setAlertState({ ...alertState, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          position: "fixed",
          top: "20%",
          left: "50%",
        }}
      >
        <MuiAlert severity={alertState.severity} variant="standard">
          {alertState.message}
        </MuiAlert>
      </Snackbar>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmState.open}
        onClose={() => handleConfirmClose(false)}
      >
        <DialogTitle>{confirmState.message}</DialogTitle>
        <DialogActions>
          <Button onClick={() => handleConfirmClose(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => handleConfirmClose(true)}
            color="primary"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </AlertContext.Provider>
  );
};
