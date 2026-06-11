import { useState, useEffect } from "react";
import { ArrowLeft, Plus, Minus, Check, ImageOff } from "lucide-react";
import { Product, ProductColor, DEFAULT_COLORS, DEFAULT_CARE_DETAILS, DEFAULT_SHIPPING_DETAILS } from "../data/products";
import { useCart } from "../context/CartContext";

interface AccordionItemProps {
  title: string;
  content: string | string[];
}

function AccordionItem({ title, content }: AccordionItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#2C2520]/12 last:border-0">
      <button 
        onClick={() => setOpen(!open)} 
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={open}
      >
        <span className="text-[#2C2520] text-xs tracking-[0.2em] uppercase font-light transition-colors group-hover:text-[#A97C65]">
          {open ? "—" : "+"} {title}
        </span>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          open ? "max-h-96 opacity-100 pb-5" : "max-h-0 opacity-0"
        }`}
      >
        {Array.isArray(content) ? (
          <div className="space-y-4">
            {content.map((item, idx) => (
              <p key={idx} className="text-[#2C2520]/60 font-light text-sm leading-[1.85]">
                {item}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-[#2C2520]/60 font-light text-sm leading-[1.85] whitespace-pre-line">
            {content}
          </p>
        )}
      </div>
    </div>
  );
}

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
}

export default function ProductDetailPage({ product, onBack }: ProductDetailPageProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  
  // Track if the specific variant color image fails to load
  const [variantImageFailed, setVariantImageFailed] = useState(false);

  // Dynamic Product Configuration Fallbacks
  const availableColors = product.colors && product.colors.length > 0 ? product.colors : DEFAULT_COLORS;
  const [selectedColor, setSelectedColor] = useState<ProductColor>(availableColors[0]);

  const careContent = product.careDetails || DEFAULT_CARE_DETAILS;
  const shippingContent = product.shippingDetails || DEFAULT_SHIPPING_DETAILS;

  // 🎯 SMART BACKUP FALLBACK LOGIC:
  // If the automated color image hasn't been uploaded yet, or fails, use your working original image instantly!
  const autoVariantImage = product.colorImages && product.colorImages[selectedColor.name];
  const displayImage = (!variantImageFailed && autoVariantImage) ? autoVariantImage : (product.primaryImage || product.image);

  // Reset image fail flag whenever user switches to a different color variant
  useEffect(() => {
    setVariantImageFailed(false);
  }, [selectedColor, product]);

  // ==========================================
  // INDUSTRY-LEVEL SEO & SCHEMA MARKUP INJECTION
  // ==========================================
  useEffect(() => {
    if (!product) return;

    document.title = `${product.name} | Crosus Nepal — Premium Handmade Crochet`;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      'content', 
      `Shop ${product.name}. Handcrafted with slow-fashion intention in Nepal. ${product.description || 'Artisanal premium boutique collection.'}`
    );

    const schemaData = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": product.name,
      "image": displayImage,
      "description": product.description,
      "brand": {
        "@type": "Brand",
        "name": "Crosus Nepal"
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "NPR",
        "price": product.price,
        "itemCondition": "https://schema.org/NewCondition",
        "availability": "https://schema.org/InStock",
        "priceValidUntil": "2027-12-31"
      }
    };

    const scriptId = 'product-schema-jsonld';
    let scriptElement = document.getElementById(scriptId);
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = scriptId;
      scriptElement.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptElement);
    }
    scriptElement.textContent = JSON.stringify(schemaData);

    return () => {
      document.title = "Crosus Nepal | Luxury Handmade Crochet Boutique";
      const defaultDesc = document.querySelector('meta[name="description"]');
      if (defaultDesc) {
        defaultDesc.setAttribute('content', "Crosus Nepal — Luxury crochet bags, keychains, and hairbands woven with intention.");
      }
      const existingScript = document.getElementById(scriptId);
      if (existingScript) existingScript.remove();
    };
  }, [product, displayImage]);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: displayImage,
      category: product.category,
      selectedColor: selectedColor
    }, quantity);

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Navigation Bar */}
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-light text-[#2C2520]/60 hover:text-[#2C2520] mb-8 transition-colors group"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          Back to Collection
        </button>

        {/* Core Product Split Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Visual Showcase Block */}
          <div className="w-full bg-[#FAF8F5] border border-[#2C2520]/5 rounded-sm overflow-hidden flex items-center justify-center min-h-[400px] md:min-h-[550px] relative">
            {displayImage ? (
              <img 
                src={displayImage} 
                alt={`${product.name} — Premium Handcrafted ${product.category} by Crosus Nepal`}
                className="w-full h-auto max-h-[75vh] object-cover rounded-sm transition-all duration-300"
                onError={() => {
                  // If the automated custom color image path isn't uploaded yet, drop back to primary image!
                  if (!variantImageFailed && autoVariantImage) {
                    setVariantImageFailed(true);
                  }
                }}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#FAF8F5] to-[#F5F2EB] text-center">
                <div className="w-16 h-16 rounded-full bg-[#2C2520]/5 flex items-center justify-center mb-4 text-[#A97C65]">
                  <ImageOff size={24} strokeWidth={1.5} />
                </div>
                <p className="font-serif text-xl text-[#2C2520] italic opacity-80">{product.name}</p>
              </div>
            )}
            
            {product.isNew && (
              <span className="absolute top-4 left-4 bg-[#A97C65] text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1 font-light z-10">
                New Arrival
              </span>
            )}
          </div>

          {/* Descriptive Configuration Block */}
          <div className="flex flex-col justify-center">
            <span className="text-[10px] tracking-[0.3em] uppercase font-light text-[#A97C65] mb-2 block">
              {product.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#2C2520] tracking-wide mb-3">
              {product.name}
            </h1>
            <p className="text-lg font-light text-[#2C2520]/80 tracking-wide mb-6">
              NPR {product.price.toLocaleString()}
            </p>
            <div className="h-[1px] w-full bg-[#2C2520]/12 mb-6" />
            
            <p className="text-sm font-light text-[#2C2520]/70 leading-relaxed tracking-wide mb-8">
              {product.description}
            </p>

            {/* Interactive Luxury Color Palette Matrix */}
            <div className="mb-6">
              <span className="text-[11px] tracking-[0.15em] uppercase font-light text-[#2C2520] mb-3 block">
                Color: <span className="font-normal text-[#A97C65]">{selectedColor.name}</span>
              </span>
              <div className="flex gap-3 items-center">
                {availableColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select color variant ${color.name}`}
                    className={`w-7 h-7 rounded-full transition-all duration-300 relative flex items-center justify-center ${
                      selectedColor.name === color.name 
                        ? "ring-1 ring-[#2C2520] ring-offset-2 ring-offset-[#FDFBF7]" 
                        : "hover:scale-110"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Action Panel Matrix (Quantity + Submission) */}
            <div className="flex gap-4 mb-8">
              <div className="flex items-center border border-[#2C2520]/20 h-12 bg-white">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-4 text-[#2C2520]/60 hover:text-[#2C2520] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center font-light text-sm text-[#2C2520]">
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-4 text-[#2C2520]/60 hover:text-[#2C2520] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button 
                onClick={handleAddToCart}
                disabled={added}
                className={`flex-1 h-12 text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                  added 
                    ? "bg-emerald-800 text-white" 
                    : "bg-[#2C2520] text-[#FDFBF7] hover:bg-[#A97C65]"
                }`}
              >
                {added ? (
                  <>
                    <Check size={14} /> Added to Bag
                  </>
                ) : (
                  `Add to Bag — NPR ${(product.price * quantity).toLocaleString()}`
                )}
              </button>
            </div>

            {/* Editorial Care & Handcraft Context Accordion Section */}
            <div className="border-t border-[#2C2520]/12">
              <AccordionItem title="Composition & Product Care" content={careContent} />
              <AccordionItem title="Shipping & Handcraft Timeline" content={shippingContent} />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
