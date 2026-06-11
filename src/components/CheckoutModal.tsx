import { useState } from "react";
import { X, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { sendOrderEmail, formatOrderData } from "../services/emailjs";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  district: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export default function CheckoutModal({ isOpen, onClose, onSuccess }: CheckoutModalProps) {
  const { items, totalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    district: "",
    
  });
  
const [district, setDistrict] = useState("");
const [deliveryFee, setDeliveryFee] = useState<number | null>(null);
  const handleDistrictChange = (value: string) => {
  setDistrict(value);
  const input = value.trim().toLowerCase();
  
  if (input === "kailali") {
    setDeliveryFee(150);
  } else {
    setDeliveryFee(null);
  }
};
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Contact number is required";
    } else if (!/^[0-9+\-\s()]{7,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Shipping address is required";
    } else if (formData.address.trim().length < 10) {
      newErrors.address = "Please enter a complete address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // 1. DELIVERY CHECK:
  if (!formData.district || formData.district === "") {
    alert("Please select your district to proceed.");
    return;
  }

  if (!validateForm()) return;
  setIsSubmitting(true);

  // 2. Format items
  const deliveryFee = 150;
  const formattedItems = items.map((item) => 
    `- ${item.product.name} (${item.selectedColor || 'Standard Color'}) x ${item.quantity} - NPR ${(item.product.price * item.quantity).toLocaleString()}`
  ).join('\n');

  try {
    const response = await fetch('https://formspree.io/f/mlgklpdg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        'Customer Name': formData.fullName,
        'Customer Email': formData.email,
        'Contact Number': formData.phone,
        'Shipping Address': formData.address,
        'District': formData.district, // Added this
        'Delivery Charge': `NPR ${deliveryFee}`,
        'Order Items': formattedItems,
        'Total Order Amount': `NPR ${items.reduce((acc, item) => acc + item.product.price * item.quantity + deliveryFee, 0).toLocaleString()}`,
        'Order Date': new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' })
      })
    });

    if (response.ok) {
      clearCart();
      setIsSubmitting(false);
      onSuccess(formData.email);
    } else {
      throw new Error('Formspree submission failed');
    }
  } catch (error) {
    alert('There was an issue processing your order.');
    setIsSubmitting(false);
  }
};
    

  const formatPrice = (price: number) => `NPR ${price.toLocaleString()}`;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#2C2520]/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-[#FBF9F6] w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-[#FBF9F6] flex items-center justify-between px-6 py-5 border-b border-[#2C2520]/10">
          <div>
            <h2 className="text-[#2C2520] font-light text-xl tracking-wide">
              Checkout
            </h2>
            <p className="text-[#2C2520]/45 text-xs tracking-wider mt-0.5">
              Complete your order
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#2C2520]/50 hover:text-[#2C2520] transition-colors duration-200"
            aria-label="Close checkout"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Order Summary */}
        <div className="px-6 py-4 bg-[#F3ECE3]/50 border-b border-[#2C2520]/10">
          <p className="text-[#2C2520]/55 text-[10px] tracking-[0.25em] uppercase font-light mb-3">
            Order Summary
          </p>
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-[#2C2520]/70 font-light">
                  {item.product.name} <span className="text-[#2C2520]/40">× {item.quantity}</span>
                </span>
                <span className="text-[#2C2520] font-light">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#2C2520]/10">
              <span className="text-[#2C2520] font-light text-sm">Total</span>
              <span className="text-[#2C2520] font-light">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-[#2C2520]/65 text-[10px] tracking-[0.2em] uppercase font-light mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className={`w-full bg-[#F3ECE3] text-[#2C2520] text-sm font-light py-3 px-4 focus:outline-none border ${
                errors.fullName
                  ? "border-red-400"
                  : "border-transparent focus:border-[#A97C65]"
              } transition-colors duration-200`}
              placeholder="Your full name"
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1.5 font-light">
                {errors.fullName}
              </p>
            )}
          </div>
<div className="mt-4">
  <label className="block text-[#2C2520]/65 text-[10px] tracking-[0.2em] uppercase font-light mb-2">
    District *
  </label>
  <select 
    value={formData.district}
    onChange={(e) => setFormData({...formData, district: e.target.value})}
    className="w-full bg-[#F3ECE3] text-[#2C2520] text-sm font-light py-3 px-4 focus:outline-none border border-transparent focus:border-[#A97C65] transition-colors duration-200"
  >
    <option value="">Select your district</option>
    <option value="Kailali">Kailali (Delivery: NPR 150)</option>
    <option value="Kanchanpur">Kanchanpur (Delivery: NPR 150)</option>
  </select>
  
  {formData.district && (
    <p className="mt-2 text-xs text-green-700">
      Delivery charge for {formData.district}: NPR 150
    </p>
  )}
</div>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-[#2C2520]/65 text-[10px] tracking-[0.2em] uppercase font-light mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full bg-[#F3ECE3] text-[#2C2520] text-sm font-light py-3 px-4 focus:outline-none border ${
                errors.email
                  ? "border-red-400"
                  : "border-transparent focus:border-[#A97C65]"
              } transition-colors duration-200`}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1.5 font-light">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-[#2C2520]/65 text-[10px] tracking-[0.2em] uppercase font-light mb-2"
            >
              Contact Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full bg-[#F3ECE3] text-[#2C2520] text-sm font-light py-3 px-4 focus:outline-none border ${
                errors.phone
                  ? "border-red-400"
                  : "border-transparent focus:border-[#A97C65]"
              } transition-colors duration-200`}
              placeholder="+977 98XXXXXXXX"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1.5 font-light">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-[#2C2520]/65 text-[10px] tracking-[0.2em] uppercase font-light mb-2"
            >
              Shipping Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows={4}
              className={`w-full bg-[#F3ECE3] text-[#2C2520] text-sm font-light py-3 px-4 focus:outline-none border ${
                errors.address
                  ? "border-red-400"
                  : "border-transparent focus:border-[#A97C65]"
              } transition-colors duration-200 resize-none`}
              placeholder="Street address, city, postal code, country"
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1.5 font-light">
                {errors.address}
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#2C2520] text-white text-[11px] tracking-[0.25em] uppercase py-4 font-light hover:bg-[#A97C65] transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white" />
                Processing...
              </>
            ) : (
              <>
                Place Order
                <ChevronRight size={14} strokeWidth={1.5} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
