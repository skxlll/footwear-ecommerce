import React from "react";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* Page content will go here below the navbar */}
      <main style={{ paddingTop: "80px", height: "200vh" }}>
        <div className="container">
          <h2 className="serif-font" style={{ marginTop: "20px" }}>
            Site initialized.
          </h2>
        </div>
      </main>
    </div>
  );
}

export default App;
