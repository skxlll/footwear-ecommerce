import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Menu,
  X,
  Search,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { easeLuxury } from "../../lib/motion";

const navLinks = [
  { label: "New Arrivals", href: "/#collection" },
  { label: "Bridal", href: "/#bridal" },
  { label: "Casual", href: "/#casual" },
  { label: "Trending", href: "/#trending" },
];

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, location.pathname]);

  const transparent = isHome && !scrolled && !menuOpen;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: easeLuxury }}
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
          transparent
            ? "bg-transparent"
            : "glass-strong border-b border-white/40 shadow-[var(--shadow-soft)]"
        }`}
      >
        <div className="container-luxury flex h-[4.25rem] items-center justify-between sm:h-[4.75rem]">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-white/50 md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>

          <Link
            to="/"
            className="font-display text-2xl font-medium tracking-tight text-charcoal sm:text-[1.65rem]"
          >
            Aura<span className="text-accent-deep">.</span>
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-sm font-medium text-stone transition-colors hover:text-charcoal"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent-deep transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              className="hidden h-11 w-11 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-white/50 sm:flex"
              aria-label="Search"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>

            {user && (
              <span className="hidden text-sm text-muted lg:inline">
                Hi, {user.name.split(" ")[0]}
              </span>
            )}

            <Link
              to={user ? "/" : "/login"}
              className="flex h-11 w-11 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-white/50"
              aria-label="Account"
            >
              <User size={20} strokeWidth={1.5} />
            </Link>

            <button
              type="button"
              className="relative flex h-11 w-11 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-white/50"
              aria-label="Cart"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="absolute top-1.5 right-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent-deep px-1 text-[0.65rem] font-semibold text-white">
                0
              </span>
            </button>

            {user?.role === "admin" && (
              <button
                type="button"
                className="hidden h-11 w-11 items-center justify-center rounded-full text-accent-deep transition-colors hover:bg-white/50 lg:flex"
                aria-label="Admin"
              >
                <Settings size={20} strokeWidth={1.5} />
              </button>
            )}

            {user && (
              <button
                type="button"
                onClick={logout}
                className="hidden h-11 w-11 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-white/50 lg:flex"
                aria-label="Logout"
              >
                <LogOut size={18} strokeWidth={1.5} />
              </button>
            )}
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-charcoal/20 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.45, ease: easeLuxury }}
              className="fixed top-0 left-0 z-[70] flex h-full w-[min(88vw,340px)] flex-col glass-strong md:hidden"
            >
              <div className="flex items-center justify-between border-b border-white/40 px-6 py-5">
                <span className="font-display text-xl">Menu</span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/60"
                  aria-label="Close menu"
                >
                  <X size={22} strokeWidth={1.5} />
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-1 px-4 py-6">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, ease: easeLuxury }}
                    className="rounded-2xl px-4 py-4 font-display text-2xl text-charcoal transition-colors hover:bg-white/50"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
              <div className="border-t border-white/40 p-6">
                <Link
                  to={user ? "/" : "/login"}
                  className="btn-primary w-full text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  {user ? "My Account" : "Sign In"}
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
