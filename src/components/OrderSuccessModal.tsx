import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

export default function OrderSuccessModal({ isOpen, onClose, email }: OrderSuccessModalProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setAnimate(true), 100);
    } else {
      setAnimate(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#2C2520]/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative bg-[#FBF9F6] w-full max-w-md shadow-2xl text-center transition-all duration-500 ${
          animate ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#2C2520]/40 hover:text-[#2C2520] transition-colors duration-200"
          aria-label="Close"
        >
          <X size={18} strokeWidth={1.5} />
        </button>

        {/* Content */}
        <div className="px-8 py-12">
          {/* Success icon */}
          <div
            className={`w-20 h-20 rounded-full bg-[#F3ECE3] mx-auto flex items-center justify-center mb-6 transition-all duration-700 ${
              animate ? "scale-100 opacity-100" : "scale-50 opacity-0"
            }`}
          >
            <div
              className={`w-14 h-14 rounded-full bg-[#A97C65] flex items-center justify-center transition-all duration-500 delay-200 ${
                animate ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
            >
              <Check
                size={28}
                strokeWidth={2}
                className="text-white"
              />
            </div>
          </div>

          {/* Thank you message */}
          <h2
            className={`text-[#2C2520] font-light text-3xl tracking-wide mb-4 transition-all duration-500 delay-300 ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Thank You
          </h2>

          <p
            className={`text-[#2C2520]/55 font-light text-base leading-relaxed mb-8 transition-all duration-500 delay-400 ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Your order has been placed successfully.
            <br />
            A confirmation has been sent to{" "}
            <span className="text-[#A97C65]">{email || "your email"}</span>
          </p>

          {/* Decorative divider */}
          <div
            className={`flex items-center justify-center gap-3 mb-8 transition-all duration-500 delay-500 ${
              animate ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="w-8 h-px bg-[#A97C65]/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#A97C65]/60" />
            <div className="w-8 h-px bg-[#A97C65]/40" />
          </div>

          {/* Order note */}
          <p
            className={`text-[#2C2520]/35 text-xs font-light tracking-wide transition-all duration-500 delay-600 ${
              animate ? "opacity-100" : "opacity-0"
            }`}
          >
            We'll begin handcrafting your piece right away.
            <br />
            Expect 3-5 days for creation before shipping.
          </p>

          {/* Continue shopping button */}
          <button
            onClick={onClose}
            className={`mt-8 w-full bg-[#2C2520] text-white text-[11px] tracking-[0.25em] uppercase py-4 font-light hover:bg-[#A97C65] transition-all duration-300 ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "700ms" }}
          >
            Continue Shopping
          </button>
        </div>

        {/* Brand signature */}
        <div className="border-t border-[#2C2520]/5 py-4 bg-[#F3ECE3]/30">
          <p className="text-[#2C2520]/25 text-[10px] tracking-[0.4em] uppercase font-light">
            CROSUS
          </p>
        </div>
      </div>
    </div>
  );
}
