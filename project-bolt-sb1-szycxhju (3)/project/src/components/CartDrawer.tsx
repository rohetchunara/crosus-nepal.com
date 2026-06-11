import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export default function CartDrawer({ isOpen, onClose, onCheckout }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  const getItemKey = (item: { product: { id: number }; selectedColor?: { hex: string } | null }) =>
    `${item.product.id}-${item.selectedColor?.hex || 'default'}`;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-[#2C2520]/30 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#FBF9F6] z-50 shadow-2xl transform transition-transform duration-400 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#2C2520]/10">
            <div>
              <h2 className="text-[#2C2520] font-light text-xl tracking-wide">
                Your Cart
              </h2>
              <p className="text-[#2C2520]/45 text-xs tracking-wider mt-0.5">
                {items.length === 0 ? "No items" : `${items.length} item${items.length > 1 ? "s" : ""}`}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#2C2520]/50 hover:text-[#2C2520] transition-colors duration-200"
              aria-label="Close cart"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 rounded-full bg-[#F3ECE3] flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-[#2C2520]/25"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <p className="text-[#2C2520]/50 font-light text-sm">
                  Your cart is empty
                </p>
                <p className="text-[#2C2520]/35 text-xs mt-1">
                  Add something beautiful to get started
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {items.map((item) => (
                  <div
                    key={getItemKey(item)}
                    className="flex gap-4 pb-5 border-b border-[#2C2520]/5 last:border-0"
                  >
                    {/* Product image */}
                    <div className="w-20 h-24 bg-[#F3ECE3] flex-shrink-0 overflow-hidden">
                      <img
                        src={item.product.primaryImage}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-[#2C2520] font-light text-sm leading-tight">
                          {item.product.name}
                        </h3>
                        <button
                          onClick={() => removeItem(item.product.id, item.selectedColor?.hex)}
                          className="p-1 text-[#2C2520]/30 hover:text-[#A97C65] transition-colors duration-200"
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} strokeWidth={1.5} />
                        </button>
                      </div>

                      {/* Selected Color */}
                      {item.selectedColor && (
                        <div className="flex items-center gap-2 mt-1.5">
                          <div
                            className="w-3 h-3 rounded-full border border-[#2C2520]/20"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span className="text-[#2C2520]/45 text-xs font-light">
                            {item.selectedColor.name}
                          </span>
                        </div>
                      )}

                      <p className="text-[#A97C65] text-sm font-light mt-1">
                        NPR {item.product.price.toLocaleString()}
                      </p>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-3 mt-auto pt-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1, item.selectedColor?.hex)
                          }
                          className="w-7 h-7 flex items-center justify-center border border-[#2C2520]/15 text-[#2C2520]/60 hover:border-[#A97C65] hover:text-[#A97C65] transition-all duration-200"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} strokeWidth={1.5} />
                        </button>
                        <span className="text-[#2C2520] text-sm font-light w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1, item.selectedColor?.hex)
                          }
                          className="w-7 h-7 flex items-center justify-center border border-[#2C2520]/15 text-[#2C2520]/60 hover:border-[#A97C65] hover:text-[#A97C65] transition-all duration-200"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>

                    {/* Line total */}
                    <div className="text-right">
                      <p className="text-[#2C2520] font-light text-sm">
                        NPR {(item.product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-[#2C2520]/10 px-6 py-5 bg-[#FBF9F6]">
              {/* Subtotal */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#2C2520]/55 text-sm font-light">
                  Subtotal
                </span>
                <span className="text-[#2C2520] text-sm font-light">
                  NPR {totalPrice.toLocaleString()}
                </span>
              </div>

              {/* Shipping notice */}
              <p className="text-[#2C2520]/35 text-xs font-light text-center mb-4">
                Shipping calculated at checkout
              </p>

              {/* Checkout button */}
              <button
                onClick={onCheckout}
                className="w-full bg-[#2C2520] text-white text-[11px] tracking-[0.25em] uppercase py-4 font-light hover:bg-[#A97C65] transition-colors duration-300"
              >
                Proceed to Checkout
              </button>

              {/* Clear cart */}
              <button
                onClick={clearCart}
                className="w-full text-[#2C2520]/40 text-xs font-light py-3 hover:text-[#2C2520]/60 transition-colors duration-200"
              >
                Clear cart
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
