import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import ProductDetailPage from "./components/ProductDetailPage";
import LegalPage from "./components/LegalPage";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import OrderSuccessModal from "./components/OrderSuccessModal";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { products } from "./data/products";

type View =
  | { page: "home" }
  | { page: "product"; id: number }
  | { page: "legal-privacy" }
  | { page: "legal-terms" }
  | { page: "legal-returns" };

type SectionRef = "new" | "collection" | "bags" | "accessories";
type LegalType = "privacy" | "terms" | "returns";

export default function App() {
  const [view, setView] = useState<View>({ page: "home" });
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");

  const sectionRefs = useRef<Record<SectionRef, HTMLElement | null>>({
    new: null,
    collection: null,
    bags: null,
    accessories: null,
  });

  const activeProduct =
    view.page === "product"
      ? products.find((p) => p.id === view.id) ?? null
      : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [view]);

  const handleSelectProduct = (id: number) =>
    setView({ page: "product", id });

  const handleBack = () => setView({ page: "home" });

  const handleNavigate = (section: "home" | "new" | "collection") => {
    if (section === "home") {
      setView({ page: "home" });
      return;
    }

    if (view.page === "product") setView({ page: "home" });

    setTimeout(() => {
      const el = document.getElementById(section);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleNavigateLegal = (type: LegalType) => {
    switch (type) {
      case "privacy":
        setView({ page: "legal-privacy" });
        break;
      case "terms":
        setView({ page: "legal-terms" });
        break;
      case "returns":
        setView({ page: "legal-returns" });
        break;
    }
  };

  const handleSearch = (query: string) => {
    const normalized = query.toLowerCase().trim();
    let target: SectionRef | null = null;

    if (normalized.includes("bag")) {
      target = "bags";
    } else if (
      normalized.includes("key") ||
      normalized.includes("chain") ||
      normalized.includes("hair") ||
      normalized.includes("band")
    ) {
      target = "accessories";
    }

    if (target && sectionRefs.current[target]) {
      // If on product detail or legal page, navigate to home first
      if (view.page !== "home") {
        setView({ page: "home" });
      }

      // Scroll to the target section after a brief delay
      setTimeout(() => {
        sectionRefs.current[target!]?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const registerSectionRef = (section: SectionRef, el: HTMLElement | null) => {
    sectionRefs.current[section] = el;
  };

  const handleOpenCart = () => setCartOpen(true);
  const handleCloseCart = () => setCartOpen(false);

  const handleOpenCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleCloseCheckout = () => setCheckoutOpen(false);

  const handleCheckoutSuccess = (email: string) => {
    setCustomerEmail(email);
    setCheckoutOpen(false);
    setSuccessOpen(true);
  };

  const handleCloseSuccess = () => setSuccessOpen(false);

  const getLegalType = (): LegalType | null => {
    if (view.page === "legal-privacy") return "privacy";
    if (view.page === "legal-terms") return "terms";
    if (view.page === "legal-returns") return "returns";
    return null;
  };

  const legalType = getLegalType();

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#FBF9F6] flex flex-col">
        <Navbar
          onLogoClick={handleBack}
          onNavigate={handleNavigate}
          onCartClick={handleOpenCart}
          onSearch={handleSearch}
        />

        <div className="flex-1">
          {view.page === "home" && (
            <HomePage
              products={products}
              onSelectProduct={handleSelectProduct}
              registerSectionRef={registerSectionRef}
            />
          )}

          {view.page === "product" && activeProduct && (
            <ProductDetailPage product={activeProduct} onBack={handleBack} />
          )}

          {legalType && (
            <LegalPage type={legalType} onBack={handleBack} />
          )}
        </div>

        <Footer onNavigateLegal={handleNavigateLegal} />

        <CartDrawer
          isOpen={cartOpen}
          onClose={handleCloseCart}
          onCheckout={handleOpenCheckout}
        />

        <CheckoutModal
          isOpen={checkoutOpen}
          onClose={handleCloseCheckout}
          onSuccess={handleCheckoutSuccess}
        />

        <OrderSuccessModal
          isOpen={successOpen}
          onClose={handleCloseSuccess}
          email={customerEmail}
        />
      </div>
    </CartProvider>
  );
}
