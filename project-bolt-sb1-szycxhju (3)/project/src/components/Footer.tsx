import { useState } from "react";
import { Instagram, Facebook } from "lucide-react";

type LegalType = "privacy" | "terms" | "returns";

interface FooterProps {
  onNavigateLegal: (type: LegalType) => void;
}

export default function Footer({ onNavigateLegal }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-[#2C2520] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand/About */}
          <div>
            <h3 className="text-lg tracking-[0.25em] uppercase font-light mb-4">
              Crosus Nepal
            </h3>
            <p className="text-white/50 font-light text-sm leading-relaxed">
              Each Crosus piece is a quiet act of craft — hand-woven in Nepal
              with intention, patience, and care. No shortcuts, no stockrooms.
              Just hours of mindful creation shaping objects you'll carry for years.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-8 h-px bg-[#A97C65]/60" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-light">
                Handcrafted
              </span>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase font-light text-white/70 mb-6">
              Legal
            </h4>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => onNavigateLegal("privacy")}
                  className="text-white/50 font-light text-sm hover:text-[#A97C65] transition-colors duration-300 cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateLegal("terms")}
                  className="text-white/50 font-light text-sm hover:text-[#A97C65] transition-colors duration-300 cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateLegal("returns")}
                  className="text-white/50 font-light text-sm hover:text-[#A97C65] transition-colors duration-300 cursor-pointer"
                >
                  Returns & Refunds
                </button>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase font-light text-white/70 mb-6">
              Connect
            </h4>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-[#A97C65] hover:border-[#A97C65] transition-all duration-300"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-[#A97C65] hover:border-[#A97C65] transition-all duration-300"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={18} strokeWidth={1.5} />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-[#A97C65] hover:border-[#A97C65] transition-all duration-300"
                aria-label="Follow us on Pinterest"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.182-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.387.803-2.423 1.805-2.423.85 0 1.261.64 1.261 1.407 0 .857-.545 2.139-.827 3.328-.236.994.499 1.805 1.481 1.805 1.778 0 3.144-1.874 3.144-4.581 0-2.397-1.722-4.074-4.182-4.074-2.849 0-4.521 2.14-4.521 4.352 0 .862.331 1.786.745 2.289a.3.3 0 0 1 .077.317c-.076.315-.245.994-.279 1.133-.043.182-.143.221-.329.133-1.228-.572-1.996-2.369-1.996-3.812 0-3.104 2.254-5.956 6.496-5.956 3.411 0 6.062 2.433 6.062 5.685 0 3.393-2.14 6.124-5.107 6.124-.997 0-1.934-.519-2.256-1.133 0 0-.494 1.88-.613 2.342-.222.853-.823 1.923-1.225 2.577.92.285 1.894.44 2.908.44 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                </svg>
              </a>
            </div>
            <p className="text-white/30 font-light text-xs mt-6 leading-relaxed">
              Follow our journey of slow craft and mindful creation.
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase font-light text-white/70 mb-6">
              Newsletter
            </h4>
            <p className="text-white/50 font-light text-sm mb-4 leading-relaxed">
              Subscribe for new arrivals, artisan stories, and exclusive previews.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border border-white/15 px-4 py-3 text-sm font-light text-white placeholder:text-white/30 focus:outline-none focus:border-[#A97C65] transition-colors duration-300"
              />
              <button
                type="submit"
                disabled={subscribed}
                className={`py-3 text-xs tracking-[0.25em] uppercase font-light transition-all duration-300 ${
                  subscribed
                    ? "bg-[#A97C65]/80 text-white"
                    : "bg-[#A97C65] text-white hover:bg-[#8f6652]"
                }`}
              >
                {subscribed ? "Subscribed" : "Join"}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs font-light tracking-wide text-center md:text-left">
            &copy; {new Date().getFullYear()} Crosus Nepal. All pieces handmade to order.
          </p>
          <p className="text-white/20 text-[10px] tracking-[0.2em] uppercase font-light">
            Crafted with intention in Kathmandu
          </p>
        </div>
      </div>
    </footer>
  );
}
