// src/App.js
import React from "react";
import { BrowserRouter as Router} from "react-router-dom";
import "./App.css";
import { AppRoutes } from "./routes";

function App() {
  return (
    <Router>
      {/* <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes> */}
      <AppRoutes />
    </Router>
  );
}

export default App;
