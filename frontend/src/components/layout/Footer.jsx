import { Link } from "react-router-dom";
import { Share2, Heart, Mail } from "lucide-react";
import ScrollReveal from "../ui/ScrollReveal";

const Footer = () => (
  <footer className="relative mt-8 border-t border-white/40 bg-white/30 backdrop-blur-xl">
    <div className="container-luxury section-pad pb-10">
      <ScrollReveal>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link to="/" className="font-display text-3xl text-charcoal">
              Aura<span className="text-accent-deep">.</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone">
              Curated women&apos;s footwear for every moment — from aisle to
              afterparty, crafted with quiet luxury.
            </p>
            <div className="mt-6 flex gap-3">
              {[Share2, Heart, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/40 text-charcoal transition-all hover:bg-white/80 hover:shadow-[var(--shadow-soft)]"
                  aria-label="Social"
                >
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="label-caps mb-4">Shop</h4>
            <ul className="space-y-3 text-sm text-stone">
              {["New Arrivals", "Bridal", "Heels", "Casual", "Sale"].map(
                (item) => (
                  <li key={item}>
                    <a href="#collection" className="transition-colors hover:text-charcoal">
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h4 className="label-caps mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-stone">
              {["Size Guide", "Shipping", "Returns", "Contact", "FAQ"].map(
                (item) => (
                  <li key={item}>
                    <a href="#" className="transition-colors hover:text-charcoal">
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h4 className="label-caps mb-4">Account</h4>
            <ul className="space-y-3 text-sm text-stone">
              <li>
                <Link to="/login" className="transition-colors hover:text-charcoal">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="transition-colors hover:text-charcoal">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </ScrollReveal>

      <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/30 pt-8 text-center text-xs text-muted sm:flex-row sm:text-left">
        <p>&copy; {new Date().getFullYear()} Aura Footwear. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-charcoal">
            Privacy
          </a>
          <a href="#" className="hover:text-charcoal">
            Terms
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
