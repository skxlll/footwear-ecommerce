import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Save to global context
      login(data.user, data.token);

      // Redirect back to home
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
      }}
    >
      <div
        className="glass-panel"
        style={{
          padding: "40px",
          width: "100%",
          maxWidth: "400px",
          borderRadius: "12px",
        }}
      >
        <h2
          className="serif-font"
          style={{ textAlign: "center", marginBottom: "10px" }}
        >
          Welcome Back
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "var(--text-light)",
            fontSize: "0.9rem",
            marginBottom: "30px",
          }}
        >
          Sign in to access your Aura account.
        </p>

        {error && (
          <div
            style={{
              backgroundColor: "rgba(255, 0, 0, 0.1)",
              color: "red",
              padding: "10px",
              borderRadius: "6px",
              marginBottom: "20px",
              fontSize: "0.85rem",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.85rem",
                marginBottom: "8px",
                color: "var(--text-main)",
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid var(--glass-border)",
                background: "rgba(255, 255, 255, 0.5)",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.85rem",
                marginBottom: "8px",
                color: "var(--text-main)",
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid var(--glass-border)",
                background: "rgba(255, 255, 255, 0.5)",
                outline: "none",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: "var(--accent-action)",
              color: "#fff",
              padding: "14px",
              border: "none",
              borderRadius: "30px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
