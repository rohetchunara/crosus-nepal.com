import { useState } from "react";
import { Product } from "../data/products";

interface ProductCardProps {
  product: Product;
  onSelect: (id: number) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(product.id)}
    >
      <div className="relative overflow-hidden bg-[#F3ECE3] aspect-[4/5]">
        <img
          src={product.primaryImage}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
            hovered ? "opacity-0 scale-105" : "opacity-100 scale-100"
          }`}
          loading="lazy"
        />
        <img
          src={product.hoverImage}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
            hovered ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#2C2520]/0 group-hover:bg-[#2C2520]/5 transition-colors duration-500" />
        <div
          className={`absolute bottom-0 left-0 right-0 p-5 transition-all duration-500 ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product.id);
            }}
            className="w-full bg-[#A97C65] text-white text-[11px] tracking-[0.25em] uppercase py-3 font-light hover:bg-[#8f6652] transition-colors duration-200"
          >
            Explore Piece
          </button>
        </div>
      </div>

      <div className="pt-4 pb-2">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-[#2C2520] font-light tracking-wide text-base leading-snug">
            {product.name}
          </h3>
          <span className="text-[#2C2520]/70 text-sm font-light whitespace-nowrap tracking-wide shrink-0">
            NPR {product.price.toLocaleString()}
          </span>
        </div>
        <p className="text-[#2C2520]/40 text-[11px] tracking-[0.18em] uppercase mt-1 font-light">
          {product.category}
        </p>
      </div>

      <div
        className={`h-px bg-[#2C2520] transition-all duration-500 ${
          hovered ? "opacity-30" : "opacity-10"
        }`}
      />
    </article>
  );
}
