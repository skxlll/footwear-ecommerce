import React from "react";
import Navbar from "./components/layout/Navbar";
import ProductGrid from "./components/ProductGrid";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main style={{ paddingTop: "70px" }}>
        <ProductGrid />
      </main>
    </div>
  );
}

export default App;
