import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import AvailabilityPage from "./pages/AvailabilityPage.jsx"; // adjust path

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/availability" element={<AvailabilityPage />} />
      </Routes>
    </>
  );
}

export default App;
