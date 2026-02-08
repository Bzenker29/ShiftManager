import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import AvailabilityPage from "./pages/AvailabilityPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      {user && <NavBar />} {/* hide navbar on login */}
      <Routes>
        {/* 🔐 Login route */}
        <Route path="/login" element={<LoginPage onLogin={setUser} />} />

        {/* 🆕 Signup route */}
        <Route path="/signup" element={<SignupPage />} />

        {/* 🏠 Home (protected) */}
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />

        {/* 📅 Availability (protected) */}
        <Route
          path="/availability/:employeeId?"
          element={user ? <AvailabilityPage /> : <Navigate to="/login" />}
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
      </Routes>
    </>
  );
}

export default App;
