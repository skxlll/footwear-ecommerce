import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import ProductGrid from "./components/ProductGrid";
import Login from "./pages/Login"; // Import the new page

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main style={{ paddingTop: "100px", minHeight: "100vh" }}>
          <Routes>
            {/* The Home Route */}
            <Route path="/" element={<ProductGrid />} />

            {/* The Login Route */}
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
