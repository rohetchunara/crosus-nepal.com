export interface ProductColor {
  hex: string;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  primaryImage: string;
  hoverImage: string;
  description: string;
  dimensions: string;
  careInstructions: string;
  category: string;
  colors?: ProductColor[];
  careDetails?: string[];
  shippingDetails?: string;
  colorImages?: Record<string, string>;
  isNew?: boolean;
}


export const DEFAULT_COLORS: ProductColor[] = [
  { hex: "#2C2520", name: "Espresso" },
  { hex: "#A97C65", name: "Terracotta" },
  { hex: "#EAE3D2", name: "Cream" },
];

export const DEFAULT_CARE_DETAILS: string[] = [
  "Composition: 100% premium organic cotton cord, hand-spun for durability and softness.",
  "Care: Gentle spot clean only with a damp cloth. Avoid machine washing or wringing. Store flat to preserve the hand-woven architecture.",
  "Maintenance: Reshape while damp and allow to air dry away from direct sunlight. Use a garment steamer to refresh fibers as needed.",
];

export const DEFAULT_SHIPPING_DETAILS: string =
  "Handcrafted to order in our Kathmandu atelier. Please allow 3-5 days for creation before dispatch. Free shipping across Nepal. International shipping available to select countries—allow 2-3 weeks for delivery.";

// Product data with manual colorImages URLs for each variant
export const products: Product[] = [
  {
    id: 1,
    name: "The Maya Slouchy Bag",
    price: 999,
    primaryImage:
      "https://i.postimg.cc/15pKPtTX/Maya-Slouchy-Bag-static-view.jpg",
    hoverImage:
      "https://i.postimg.cc/Hkd9Lm1T/Maya-Slouchy-Bag-hover-view.jpg",
    description:
      ` The Maya Slouchy Bag

 Effortless slouchy silhouette designed for easy everyday utility.

 Rich, earth-toned sage green knit that coordinates with any outfit.

 Softly molds to your shape while carrying all your daily essentials.

 Handcrafted with love to bring a relaxed, romantic vibe to your look.`,
    dimensions: '14" x 12" x 4"',
    careInstructions:
      ` Wash Gently: Hand wash only in cool water using a mild liquid detergent. Never machine wash, wring, or twist the cords.

Dry Flat: Reshape the bag while damp and lay it flat on a clean, dry towel away from direct sunlight to prevent stretching.

Storage: Store stuffed with tissue paper in a breathable cotton dust bag; avoid hanging long-term by the straps when fully loaded.`,
    category: "Bag",
    colors: [
      { hex: "#7D8471", name: "Sage" },
      { hex: "#C4A77D", name: "Sand" },
      { hex: "#2C2520", name: "Espresso" },
    ],
    colorImages: {
      "Sage": "PASTE_SAGE_URL_HERE",
      "Sand": "https://i.postimg.cc/Vk8pK03x/Maya-Slouchy-Bag-sand-color.jpg",
      "Espresso": "https://i.postimg.cc/NFXC4Qbv/Maya-Slouchy-Bag-espresso.jpg"
    },
    careDetails: [
      "Composition: 100% premium organic cotton cord in our signature Sage tone.",
      "Care: Hand wash gently in cool water with mild detergent. Reshape while damp and lay flat to dry away from direct sunlight.",
      "Storage: Stuff with tissue paper and store in the included cotton dust bag to maintain silhouette.",
    ],
    shippingDetails: "Each Maya bag is crocheted to order over 3-4 days. Free express shipping across Nepal. International orders arrive within 10-14 business days.",
  },
  {
    id: 2,
    name: "The Sayapatri Bucket Bag",
    price: 899,
    primaryImage:
      "https://i.postimg.cc/W3FMybgq/Sayapatri-Bucket-Bag-static.jpg",
    hoverImage:
      "https://i.postimg.cc/G2Wknwx6/Sayapatri-Bucket-Bag-hover.jpg",
    description:
      `The Sayapatri Bucket Bag

Striking cylindrical structure that commands attention and holds its shape.

Woven with a dense, premium terracotta clay cord for ultimate durability.

Intricate geometric stitch work inspired by the layers of a marigold flower.

An elegant blend of traditional craftsmanship and modern architectural lines.`,
    dimensions: '11" x 9" x 3"',
    careInstructions:
      ` Wash Gently: Hand wash only in cool water using a mild liquid detergent. Never machine wash, wring, or twist the cords.

Dry Flat: Reshape the bag while damp and lay it flat on a clean, dry towel away from direct sunlight to prevent stretching.

Storage: Store stuffed with tissue paper in a breathable cotton dust bag; avoid hanging long-term by the straps when fully loaded.`,
    category: "Bag",
    colors: [
      { hex: "#C2764A", name: "Terracotta" },
      { hex: "#8B7355", name: "Mocha" },
      { hex: "#F5E6D3", name: "Ivory" },
    ],
    colorImages: {
      "Terracotta": "PASTE_TERRACOTTA_URL_HERE",
      "Mocha": "PASTE_MOCHA_URL_HERE",
      "Ivory": "PASTE_IVORY_URL_HERE"
    },
    careDetails: [
      "Composition: 100% premium organic cotton cord woven in our signature Terracotta hue.",
      "Care: Spot clean with a damp cloth. For deep cleaning, hand wash gently in cool water and reshape while damp.",
      "Storage: Fill with acid-free tissue paper to maintain the bucket silhouette. Store in included dust bag.",
    ],
    shippingDetails: "Hand-woven over 4-5 days by our master artisans. Complimentary priority shipping within Nepal.",
  },
  {
    id: 3,
    name: "The Laligurans Statement Clutch",
    price: 899,
    primaryImage:
      "https://i.postimg.cc/tR63tJ9D/laligurans-statement-clutch-static.jpg",
    hoverImage:
      "https://i.postimg.cc/NjC2wvgH/laligurans-statement-clutch-hover.jpg",
    description:
      `. The Laligurans Statement Clutch

Ultra-chic, flat envelope silhouette that slips effortlessly under your arm.

Deep espresso brown hue providing a rich, dark focal point for neutral style.

Features a hidden, premium magnetic brass closure for a clean exterior.

Transitions seamlessly from a sophisticated day look to an elegant evening out.`,
    dimensions: '11" x 9" x 3"',
    careInstructions:
       ` Wash Gently: Hand wash only in cool water using a mild liquid detergent. Never machine wash, wring, or twist the cords.

Dry Flat: Reshape the bag while damp and lay it flat on a clean, dry towel away from direct sunlight to prevent stretching.

Storage: Store stuffed with tissue paper in a breathable cotton dust bag; avoid hanging long-term by the straps when fully loaded.`,
    category: "Bag",
    colors: [
      { hex: "#2C2520", name: "Espresso" },
      { hex: "#6B4423", name: "Chestnut" },
      { hex: "#D4C5B0", name: "Oatmeal" },
    ],
    colorImages: {
      "Espresso": "PASTE_ESPRESSO_URL_HERE",
      "Chestnut": "PASTE_CHESTNUT_URL_HERE",
      "Oatmeal": "PASTE_OATMEAL_URL_HERE"
    },
    careDetails: [
      "Composition: Premium organic cotton cord with a concealed brass magnetic closure.",
      "Care: Wipe gently with a soft, dry cloth. Avoid water contact with the brass hardware.",
      "Storage: Store flat in the provided linen pouch to protect the envelope silhouette.",
    ],
    shippingDetails: "Crafted to order in 3-4 days. Complimentary express shipping across Nepal.",
  },
  {
    id: 4,
    name: "The Himal Shoulder Bag",
    price: 649,
    primaryImage:
      "https://i.postimg.cc/xCMXHkLk/himalayan-shoulder-bag-static.jpg",
    hoverImage:
      "https://i.postimg.cc/MZ0cpQ6K/himalayan-shoulder-bag-hover.jpg",
    description:
      `The Himal Shoulder Bag

Crisp, clean lines that echo the structural beauty of mountain ridges.

Finished in a luminous alabaster off-white for a timeless, high-end feel.

Firm, tight-knit design that keeps your belongings sleek and secure.

The perfect understated statement piece for a minimalist luxury wardrobe.`,
    dimensions: '2.5" diameter',
    careInstructions:
      ` Wash Gently: Hand wash only in cool water using a mild liquid detergent. Never machine wash, wring, or twist the cords.

Dry Flat: Reshape the bag while damp and lay it flat on a clean, dry towel away from direct sunlight to prevent stretching.

Storage: Store stuffed with tissue paper in a breathable cotton dust bag; avoid hanging long-term by the straps when fully loaded.`,
    category: "Bag",
    colors: [
      { hex: "#F5F5F0", name: "Alabaster" },
      { hex: "#A67B5B", name: "Camel" },
      { hex: "#4A4035", name: "Charcoal" },
    ],
    colorImages: {
      "Alabaster": "PASTE_ALABASTER_URL_HERE",
      "Camel": "PASTE_CAMEL_URL_HERE",
      "Charcoal": "PASTE_CHARCOAL_URL_HERE"
    },
  },
  {
    id: 5,
    name: "The Bagaicha Market Tote",
    price: 899,
    primaryImage:
      "https://i.postimg.cc/Qx0HpZKy/bagaicha-tote-static.jpg",
    hoverImage:
      "https://i.postimg.cc/sgLxNPc5/bagaicha-tote-hover.jpg",
    description:
      `The Bagaicha Market Tote

Airy, open-stitch weave combining beautiful texture with absolute flexibility.

Spun from raw, natural flax-beige fibers for an organic, breezy aesthetic.

Generous interior space made to carry anything from fresh flowers to your iPad.

Brings a touch of slow-fashion luxury to your casual weekend errands.`,
    dimensions: '4" width, one size fits most',
    careInstructions:
      ` Wash Gently: Hand wash only in cool water using a mild liquid detergent. Never machine wash, wring, or twist the cords.

Dry Flat: Reshape the bag while damp and lay it flat on a clean, dry towel away from direct sunlight to prevent stretching.

Storage: Store stuffed with tissue paper in a breathable cotton dust bag; avoid hanging long-term by the straps when fully loaded.`,
    category: "Bag",
    colors: [
      { hex: "#D5C4A1", name: "Flax" },
      { hex: "#E8DDD4", name: "Oat" },
      { hex: "#8B7355", name: "Walnut" },
    ],
    colorImages: {
      "Flax": "PASTE_FLAX_URL_HERE",
      "Oat": "PASTE_OAT_URL_HERE",
      "Walnut": "PASTE_WALNUT_URL_HERE"
    },
  },
   {
    id: 6,
    name: "The Kesh Silk-Blend Pin",
    price: 250,
    primaryImage:
      "https://i.postimg.cc/6Qd4WPWC/kesh-pin-static.jpg",
    hoverImage:
      "https://i.postimg.cc/d1wkL9Dv/kesh-pin-hover.jpg",
    description:
      `. The Kesh Silk-Blend Pin

Dainty, micro-knitted luxury hair slide for a touch of subtle texture.

Spun from an ultra-soft almond tan silk blend that catches the light.

Backed by a high-grade gold barrette mechanism for an all-day, secure hold.

Elevates a simple low bun or half-up style into a premium statement.`,
    dimensions: '4" width, one size fits most',
    careInstructions:
      `Avoid Water: Keep the metallic backing clips completely dry to prevent rusting and discoloration over time.

Revive & Fluff: If the yarn bow or loops flatten, gently fluff them out with your fingers or use a garment steamer from a safe distance.

Spot Clean: If stained, gently dab the yarn with a damp microfiber cloth and a drop of delicate soap—never submerge the entire clip.`,
    category: "Hairband ",
  },
   {
    id: 7,
    name: "The Sirak Bow Clip",
    price: 250,
    primaryImage:
      "https://i.postimg.cc/JhJZynqY/sirak-bow-clip.jpg",
    hoverImage:
      "https://i.postimg.cc/kGjbrtnp/sirak-bow-clip-hover.jpg",
    description:
      `The Sirak Bow Clip

Oversized, sculptural bow design that functions as wearable textile art.

Finished in a dreamy, muted dusty rose that adds a soft pop of color.

Intricately crocheted with plush yarn to maintain its elegant, fluffy shape.

Gives a romantic, high-fashion contrast to crisp linens and casual knits.`,
    dimensions: '4" width, one size fits most',
    careInstructions:
      `Avoid Water: Keep the metallic backing clips completely dry to prevent rusting and discoloration over time.

Revive & Fluff: If the yarn bow or loops flatten, gently fluff them out with your fingers or use a garment steamer from a safe distance.

Spot Clean: If stained, gently dab the yarn with a damp microfiber cloth and a drop of delicate soap—never submerge the entire clip.`,
    category: "Hairband ",
  },
   {
    id: 8,
    name: ". The Resham Ribbon Slide",
    price: 250,
    primaryImage:
      "https://i.postimg.cc/yYdRmnjD/resham-ribbon-slide-static.jpg",
    hoverImage:
      "https://i.postimg.cc/Cxnft199/resham-ribbon-slide-hover.jpg",
    description:
      `The Resham Ribbon Slide

Ultra-minimal hair weave featuring delicate, long trailing ribbon loops.

Earthy vintage olive green shade that compliments all hair colors beautifully.

Sweeps movement gracefully into your braids, low ponytails, or loose waves.

An understated, flowing accessory designed for a poetic, natural aesthetic`,
    dimensions: '4" width, one size fits most',
    careInstructions:
      `Avoid Water: Keep the metallic backing clips completely dry to prevent rusting and discoloration over time.

Revive & Fluff: If the yarn bow or loops flatten, gently fluff them out with your fingers or use a garment steamer from a safe distance.

Spot Clean: If stained, gently dab the yarn with a damp microfiber cloth and a drop of delicate soap—never submerge the entire clip.`,
    category: "Hairband ",
  },
   {
    id: 9,
    name: "The Chabi Blossom Charm",
    price: 250,
    primaryImage:
      "https://i.postimg.cc/wBc38s2G/chabi-blossom-static.jpg",
    hoverImage:
      "https://i.postimg.cc/wBc38s2G/chabi-blossom-static.jpg",
    description:
      `The Chabi Blossom Charm

Compact, geometric floral design that brings handwork into your daily routine.

Vibrant mustard gold yarn paired with a premium, brushed brass keyring.

A highly tactile accessory that makes finding your keys a luxury experience.

Clips perfectly onto your favorite bag to add a punch of artistic warmth.`,
    dimensions: '4" width, one size fits most',
    careInstructions:
      `Hardware Care: Avoid exposing the brushed brass rings and clasps to heavy water, perfumes, or hand sanitizers.

Keep Tidy: For tassels and fringes, comb through the straight threads gently with your fingers occasionally to keep them untangled.

Quick Clean: Spot clean any dirt marks immediately with a damp linen cloth and allow to air dry completely before clipping back onto your keys.`,
    category: "Keychain",
  },
   {
    id: 10,
    name: "The Jun Minimalist Loop",
    price: 250,
    primaryImage:
      "https://i.postimg.cc/J0hsQ4bp/jun-chain-static.jpg",
    hoverImage:
      "https://i.postimg.cc/J0hsQ4bp/jun-chain-static.jpg",
    description:
      `The Jun Minimalist Loop

Sleek, crescent-shaped wristlet tether inspired by the clean curves of the moon.

Woven in a sophisticated charcoal slate gray for a smart, modern edge.

Slips comfortably over your wrist to keep your hands free and phone safe.

Outfitted with solid brass hardware that fastens easily onto bags or belt loops.`,
    dimensions: '4" width, one size fits most',
    careInstructions:
       `Hardware Care: Avoid exposing the brushed brass rings and clasps to heavy water, perfumes, or hand sanitizers.

Keep Tidy: For tassels and fringes, comb through the straight threads gently with your fingers occasionally to keep them untangled.

Quick Clean: Spot clean any dirt marks immediately with a damp linen cloth and allow to air dry completely before clipping back onto your keys.`,
    category: "Keychain ",
  },
   {
    id: 11,
    name: "The Dhago Tassel Tether",
    price: 250,
    primaryImage:
      "https://i.postimg.cc/tRrZ4Wjm/dhago-chain-static.jpg",
    hoverImage:
      "https://i.postimg.cc/tRrZ4Wjm/dhago-chain-static.jpg",
    description:
      `The Dhago Tassel Tether

Bold, thick-cut yarn tassel showcasing raw, artisanal material focus.

Drenched in a rich burnt sienna orange to make your accessories stand out.

Crafted with a tightly wrapped head and perfectly straight, flowing threads.

Instantly customizes and upgrades any standard canvas tote or backpack.`,
    dimensions: '4" width, one size fits most',
    careInstructions:
       `Hardware Care: Avoid exposing the brushed brass rings and clasps to heavy water, perfumes, or hand sanitizers.

Keep Tidy: For tassels and fringes, comb through the straight threads gently with your fingers occasionally to keep them untangled.

Quick Clean: Spot clean any dirt marks immediately with a damp linen cloth and allow to air dry completely before clipping back onto your keys.`,
    category: "Keychain ",
  },
];
