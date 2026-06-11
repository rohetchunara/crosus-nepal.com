import { useState, useRef, useEffect } from "react";
import { Menu, X, Search, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

interface NavbarProps {
  onLogoClick: () => void;
  onNavigate: (section: "home" | "new" | "collection") => void;
  onCartClick: () => void;
  onSearch: (query: string) => void;
}

export default function Navbar({
  onLogoClick,
  onNavigate,
  onCartClick,
  onSearch,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { totalItems } = useCart();

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleNavClick = (section: "home" | "new" | "collection") => {
    onNavigate(section);
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit(e as unknown as React.FormEvent);
    }
  };

  const navLinks = [
    { label: "Home", key: "home" as const },
    { label: "New Arrivals", key: "new" as const },
    { label: "The Collection", key: "collection" as const },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FBF9F6]/95 backdrop-blur-sm border-b border-[#2C2520]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16">

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-[#2C2520]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => handleNavClick(link.key)}
                className="text-[#2C2520]/70 hover:text-[#2C2520] font-light text-sm tracking-widest uppercase transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Luxury Brand Logo */}
          <button
            onClick={onLogoClick}
            className="text-2xl font-serif tracking-[0.2em] text-[#2C2520] uppercase font-semibold absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none"
          >
            Crosus
          </button>

          {/* Search and Cart Utility Actions */}
          <div className="flex items-center space-x-4">

            {/* Inline Desktop Expandable Search Bar */}
            <div className="hidden md:flex items-center relative">
              <form onSubmit={handleSearchSubmit}>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search (e.g. bag, keychain)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={`bg-transparent border-b border-[#2C2520]/30 py-1 px-2 pr-8 font-light text-sm focus:outline-none focus:border-[#2C2520] transition-all duration-300 ${
                    searchOpen ? "w-48 opacity-100" : "w-0 opacity-0 pointer-events-none"
                  }`}
                />
              </form>
              <button
                onClick={() => {
                  if (searchOpen && searchQuery) {
                    onSearch(searchQuery);
                    setSearchQuery("");
                  } else {
                    setSearchOpen(!searchOpen);
                  }
                }}
                className="text-[#2C2520] hover:text-[#A97C65] transition-colors p-2"
                aria-label="Toggle search bar"
              >
                {searchOpen && searchQuery ? (
                  <X size={20} onClick={() => setSearchQuery("")} />
                ) : (
                  <Search size={20} />
                )}
              </button>
            </div>

            {/* Mobile Search Action */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden text-[#2C2520] p-2"
            >
              <Search size={20} />
            </button>

            {/* Shopping Bag / Cart Counter Button */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-[#2C2520] hover:text-[#A97C65] transition-colors"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-[#A97C65] text-white font-sans text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full scale-90">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Tray */}
        {searchOpen && (
          <div className="md:hidden border-t border-[#2C2520]/10 py-3 px-2 flex items-center">
            <form onSubmit={handleSearchSubmit} className="flex items-center w-full">
              <input
                type="text"
                placeholder="Search (e.g. bag, keychain, hairband)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent font-light text-sm focus:outline-none text-[#2C2520]"
              />
              {searchQuery && (
                <X
                  size={18}
                  className="text-[#2C2520]/40 ml-2 cursor-pointer"
                  onClick={() => setSearchQuery("")}
                />
              )}
            </form>
          </div>
        )}
      </div>

      {/* Mobile Sidebar Dropdown links */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FBF9F6] border-t border-[#2C2520]/10 py-4 px-6 space-y-4 flex flex-col">
          {navLinks.map((link) => (
            <button
              key={link.key}
              onClick={() => handleNavClick(link.key)}
              className="text-left text-[#2C2520]/80 font-light tracking-wider uppercase text-sm py-2"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
