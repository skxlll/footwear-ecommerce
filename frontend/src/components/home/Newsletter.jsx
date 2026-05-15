import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import ScrollReveal from "../ui/ScrollReveal";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 900);
  };

  return (
    <section className="section-pad pb-8">
      <div className="container-luxury">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-peach/50 via-rose/30 to-mist/40 p-8 sm:rounded-[2.5rem] sm:p-12 lg:p-16">
            <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-white/30 blur-3xl" aria-hidden />
            <div className="relative z-10 mx-auto max-w-xl text-center">
              <Sparkles className="mx-auto text-accent-deep" size={24} strokeWidth={1.5} />
              <h2 className="font-display mt-4 text-3xl font-medium sm:text-4xl">
                Join the inner circle
              </h2>
              <p className="mt-3 text-sm text-stone sm:text-base">
                Early access to drops, styling notes, and exclusive offers —
                delivered softly to your inbox.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-2"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="input-luxury flex-1 rounded-full sm:rounded-full"
                  disabled={status === "loading"}
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary shrink-0 sm:px-10"
                >
                  {status === "loading" ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : status === "success" ? (
                    "You're in ✓"
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </form>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Newsletter;
