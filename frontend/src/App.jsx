import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Components
import Navbar from "./components/layout/Navbar";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageTransition from "./components/PageTransition";

// We separate the animated routes into their own component so we can use the 'useLocation' hook
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    // AnimatePresence keeps the old page in the DOM just long enough to play its exit animation
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Hero />
              <ProductGrid />
            </PageTransition>
          }
        />

        <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />

        <Route
          path="/register"
          element={
            <PageTransition>
              <Register />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main style={{ minHeight: "100vh" }}>
          <AnimatedRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;
