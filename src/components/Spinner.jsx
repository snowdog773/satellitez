import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
const spinnerContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

const spinner = {
  border: "16px solid #f3f3f3",
  borderTop: "16px solid #3498db",
  borderRadius: "50%",
  width: "120px",
  height: "120px",
  animation: "spin 2s linear infinite",
};

const Spinner = () => {
  return (
    <div style={spinnerContainer}>
      <CircularProgress value="Loading" />
    </div>
  );
};

export default Spinner;
