import { Product } from "../data/products";
import ProductCard from "./ProductCard";
import CrochetAnimation from "./CrochetAnimation";

type SectionRef = "new" | "collection" | "bags" | "accessories";

interface HomePageProps {
  products: Product[];
  onSelectProduct: (id: number) => void;
  registerSectionRef?: (section: SectionRef, el: HTMLElement | null) => void;
}

export default function HomePage({ products, onSelectProduct, registerSectionRef }: HomePageProps) {
  const setRef = (section: SectionRef) => (el: HTMLElement | null) => {
    registerSectionRef?.(section, el);
  };

  return (
    <main className="bg-[#FBF9F6]">
      {/* Hero Section */}
      <section className="min-h-screen grid md:grid-cols-2">
        {/* Left: Text */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-32 pb-20 md:pt-16 animate-fade-in">
          <p className="text-[#A97C65] text-[11px] tracking-[0.4em] uppercase font-light mb-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Handcrafted in Nepal
          </p>
          <h1 className="text-[#2C2520] font-extralight text-5xl md:text-6xl lg:text-7xl leading-[1.08] tracking-tight mb-8 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            Woven with
            <br />
            <span className="italic font-light">intention.</span>
          </h1>
          <p className="text-[#2C2520]/55 font-light text-base md:text-lg leading-relaxed max-w-sm mb-12 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            Each Crosus piece is a quiet act of craft — hours of patient
            handwork transformed into objects you'll carry for years.
          </p>
          <div className="animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <button
              onClick={() => {
                const el = document.getElementById("collection");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-block bg-[#A97C65] text-white text-[12px] tracking-[0.3em] uppercase px-10 py-4 font-light hover:bg-[#8f6652] transition-colors duration-300"
            >
              Discover the Collection
            </button>
          </div>
          <div className="mt-16 flex items-center gap-8 animate-slide-up" style={{ animationDelay: "0.6s" }}>
            <div>
              <p className="text-[#2C2520] text-2xl font-extralight tracking-tight">
                100%
              </p>
              <p className="text-[#2C2520]/45 text-[11px] tracking-[0.2em] uppercase font-light mt-0.5">
                Handmade
              </p>
            </div>
            <div className="w-px h-10 bg-[#2C2520]/15" />
            <div>
              <p className="text-[#2C2520] text-2xl font-extralight tracking-tight">
                Natural
              </p>
              <p className="text-[#2C2520]/45 text-[11px] tracking-[0.2em] uppercase font-light mt-0.5">
                Materials
              </p>
            </div>
            <div className="w-px h-10 bg-[#2C2520]/15" />
            <div>
              <p className="text-[#2C2520] text-2xl font-extralight tracking-tight">
                3–5
              </p>
              <p className="text-[#2C2520]/45 text-[11px] tracking-[0.2em] uppercase font-light mt-0.5">
                Day Craft
              </p>
            </div>
          </div>
        </div>

        {/* Right: Animated SVG Crochet Animation */}
        <div className="relative bg-[#F3ECE3] min-h-[50vh] md:min-h-0 overflow-hidden">
          <CrochetAnimation />
        </div>
      </section>

      {/* New Arrivals Section */}
      <section ref={setRef("new")} id="new" className="bg-[#FBF9F6] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-[#A97C65] text-[11px] tracking-[0.4em] uppercase font-light mb-3">
              Just In
            </p>
            <h2 className="text-[#2C2520] font-extralight text-4xl md:text-5xl tracking-tight mb-4">
              New Arrivals
            </h2>
            <p className="text-[#2C2520]/50 font-light text-sm max-w-md mx-auto leading-relaxed">
              Our latest handcrafted pieces, fresh from the studio. Each made to order with care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
            {products.slice(0, 2).map((product) => (
              <div
                key={product.id}
                className="group cursor-pointer"
                onClick={() => onSelectProduct(product.id)}
              >
                <div className="relative overflow-hidden bg-[#F3ECE3] aspect-[4/5]">
                  <img
                    src={product.primaryImage}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#A97C65] text-white text-[9px] tracking-[0.25em] uppercase px-3 py-1.5 font-light">
                      New
                    </span>
                  </div>
                </div>
                <div className="pt-4 flex items-baseline justify-between gap-2">
                  <h3 className="text-[#2C2520] font-light tracking-wide text-base">
                    {product.name}
                  </h3>
                  <span className="text-[#2C2520]/70 text-sm font-light">
                    NPR {product.price.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Section */}
      <section ref={setRef("collection")} id="collection" className="bg-[#F3ECE3] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <p className="text-[#A97C65] text-[11px] tracking-[0.4em] uppercase font-light mb-3">
                The Edit
              </p>
              <h2 className="text-[#2C2520] font-extralight text-4xl md:text-5xl tracking-tight">
                The Collection
              </h2>
            </div>
            <p className="text-[#2C2520]/50 font-light text-sm max-w-xs leading-relaxed">
              Each piece made entirely by hand. Each one yours to keep.
            </p>
          </div>

          {/* 01. Handcrafted Bags */}
          <div ref={setRef("bags")} className="mb-20">
            <div className="flex items-center gap-4 mb-10">
              <span className="text-[#A97C65] text-xs tracking-[0.3em] font-light">01</span>
              <div className="flex-1 h-px bg-[#2C2520]/10" />
              <h3 className="text-[#2C2520] font-light text-2xl md:text-3xl tracking-wide">
                Handcrafted Bags
              </h3>
              <div className="flex-1 h-px bg-[#2C2520]/10" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-6 md:gap-10 max-w-3xl mx-auto">
              {products
                .filter((p) => p.category === "Bag")
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={onSelectProduct}
                  />
                ))}
            </div>
          </div>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-6 my-12">
            <div className="w-2 h-2 rounded-full bg-[#A97C65]/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#2C2520]/20" />
            <div className="w-1 h-1 rounded-full bg-[#A97C65]/20" />
          </div>

          {/* 02. Artisanal Accessories */}
          <div ref={setRef("accessories")} id="accessories">
            <div className="flex items-center gap-4 mb-10">
              <span className="text-[#A97C65] text-xs tracking-[0.3em] font-light">02</span>
              <div className="flex-1 h-px bg-[#2C2520]/10" />
              <h3 className="text-[#2C2520] font-light text-2xl md:text-3xl tracking-wide">
                Artisanal Accessories
              </h3>
              <div className="flex-1 h-px bg-[#2C2520]/10" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-6 md:gap-10 max-w-3xl mx-auto">
              {products
                .filter((p) => p.category !== "Bag")
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={onSelectProduct}
                  />
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div>
            <p className="text-[#A97C65] text-[11px] tracking-[0.4em] uppercase font-light mb-6">
              Our Story
            </p>
            <h2 className="text-[#2C2520] font-extralight text-4xl md:text-5xl leading-tight tracking-tight mb-8">
              Made slowly,
              <br />
              <span className="italic">on purpose.</span>
            </h2>
            <p className="text-[#2C2520]/55 font-light text-base leading-[1.8] mb-6">
              Crosus was born from a single belief: the most meaningful objects
              are the ones someone made with their hands. Every bag, keychain,
              and hairband is crocheted to order — no stockrooms, no shortcuts.
            </p>
            <p className="text-[#2C2520]/55 font-light text-base leading-[1.8]">
              Based in Nepal, our small studio uses natural, responsibly sourced
              yarns and hand-finished hardware. When you carry a Crosus piece,
              you carry hours of someone's quiet, careful work.
            </p>
            <div className="mt-10 h-px w-16 bg-[#A97C65]/60" />
          </div>
          <div className="relative">
            <div className="aspect-[3/4] bg-[#F3ECE3] overflow-hidden">
              <img
                src="https://i.postimg.cc/66jd8DKs/Gemini-Generated-Image-vi7p0pvi7p0pvi7p.png"
                alt="Handcrafted crochet detail"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-[#A97C65]/30 hidden md:block" />
          </div>
        </div>
      </section>
    </main>
  );
}
