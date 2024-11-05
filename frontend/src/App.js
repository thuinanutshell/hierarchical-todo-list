import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/NavBar"; // Updated import path
import NotFoundPage from "./components/NotFoundPage";
import TaskColumn from "./components/TaskColumn";
import ApiProvider from "./contexts/ApiProvider";
import AuthProvider from "./contexts/AuthContext";
import "./index.css";

const StyledApp = styled("div")({
  textAlign: "center",
  "& .App-logo": {
    pointerEvents: "none",
    "@media (prefers-reduced-motion: no-preference)": {
      animation: "$appLogoSpin infinite 20s linear",
    },
  },
  "& .App-header": {
    backgroundColor: "#282c34",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
    color: "white",
  },
  "& .App-link": {
    color: "#61dafb",
  },
  "@keyframes appLogoSpin": {
    from: {
      transform: "rotate(0deg)",
    },
    to: {
      transform: "rotate(360deg)",
    },
  },
});

/**
 * The main component of the To-Do App.
 * @returns {JSX.Element} The App component.
 */
const App = () => {
  const [data, setData] = useState({
    tasks: {},
    columns: {},
    columnOrder: [],
  });

  return (
    <Router>
      <ApiProvider>
        <AuthProvider>
          <StyledApp>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={<TaskColumn data={data} setData={setData} />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </StyledApp>
        </AuthProvider>
      </ApiProvider>
    </Router>
  );
};

export default App;
