import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import ProductGrid from "./components/ProductGrid";
import Login from "./pages/Login"; // Import the new page
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main style={{ paddingTop: "100px", minHeight: "100vh" }}>
          <Routes>
            <Route path="/" element={<ProductGrid />} />
            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
