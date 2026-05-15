import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { Loader2, ArrowRight } from "lucide-react";
import Footer from "../components/layout/Footer";
import { easeLuxury } from "../lib/motion";
import { API_BASE } from "../lib/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Registration failed");
      login(data.user, data.token);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-[calc(100svh-4.25rem)] pt-24 pb-16 lg:grid lg:grid-cols-2 lg:pt-0">
        <motion.div
          className="relative hidden overflow-hidden lg:order-2 lg:block"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: easeLuxury }}
        >
          <img
            src="https://images.unsplash.com/photo-1515347619252-60a4bf4f0ccd?w=1200&q=85"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-blush/40 to-transparent" />
          <div className="relative flex h-full flex-col justify-end p-16">
            <span className="label-caps text-charcoal/80">Join Aura</span>
            <h2 className="font-display mt-4 max-w-md text-4xl leading-tight font-medium text-charcoal">
              Step into a world of <span className="italic text-accent-deep">refined</span> style
            </h2>
          </div>
        </motion.div>

        <div className="container-luxury flex items-center justify-center py-8 lg:order-1 lg:py-24">
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeLuxury }}
          >
            <div className="glass rounded-[2rem] p-8 sm:p-10">
              <span className="label-caps">New member</span>
              <h1 className="font-display mt-3 text-3xl font-medium">Create account</h1>
              <p className="mt-2 text-sm text-stone">
                Your premium shopping experience starts here.
              </p>

              {error && (
                <div className="mt-6 rounded-2xl border border-red-200/60 bg-red-50/80 px-4 py-3 text-center text-sm text-red-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleRegister} className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-medium tracking-wider text-muted uppercase">
                    Full name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="input-luxury"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium tracking-wider text-muted uppercase">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input-luxury"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium tracking-wider text-muted uppercase">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input-luxury"
                    placeholder="••••••••"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="btn-primary mt-2 w-full"
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <>
                      Create Account
                      <ArrowRight size={18} />
                    </>
                  )}
                </motion.button>
              </form>

              <p className="mt-8 text-center text-sm text-stone">
                Already a member?{" "}
                <Link
                  to="/login"
                  className="font-medium text-accent-deep hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
