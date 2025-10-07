// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Games from "./pages/Games";
import Minesweeper from "./pages/Minesweeper";
import UnblockMe from "./pages/UnblockMe";
import PuzzleList from "./pages/PuzzleList";
import WaterLevel from "./pages/WaterLevel";
import Home from "./pages/Home";
import Login from "./pages/Login";       // ✅ import Login page
import Register from "./pages/Register"; // ✅ import Register page
import "./index.css"; // Tailwind import

function App() {
  return (
      <Router>
        <div className="min-h-screen flex flex-col">
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Games hub */}
            <Route path="/games" element={<Games />} />

            {/* Minesweeper */}
            <Route path="/games/minesweeper" element={<Minesweeper />} />

            {/* UnblockMe game flow */}
            <Route path="/games/unblockme" element={<PuzzleList />} />
            <Route path="/games/unblockme/:id" element={<UnblockMe />} />

            {/* Water Level */}
            <Route path="/games/waterlevel" element={<WaterLevel />} />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;


