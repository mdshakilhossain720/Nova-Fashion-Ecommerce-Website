import type { Product, ProductColor } from "@/types"

const img = (name: string) => `/images/${name}.webp`

const c = {
  black: { name: "Black", hex: "#171717" },
  white: { name: "White", hex: "#F4F2EC" },
  sand: { name: "Sand", hex: "#C6A77D" },
  navy: { name: "Navy", hex: "#1F2C44" },
  red: { name: "Red", hex: "#A8232B" },
  olive: { name: "Olive", hex: "#5B6146" },
  blush: { name: "Blush", hex: "#E2B9B3" },
  blue: { name: "Blue", hex: "#4A6C8C" },
  brown: { name: "Brown", hex: "#6F4B35" },
} satisfies Record<string, ProductColor>

export const allColors: ProductColor[] = Object.values(c)

const apparel = ["XS", "S", "M", "L", "XL"]
const waist = ["30", "32", "34", "36"]
const kids = ["2-3Y", "4-5Y", "6-7Y", "8-9Y"]
const oneSize = ["One Size"]

export const allSizes = [...apparel, ...waist, ...kids, "12ml", "One Size"]

type Seed = Pick<
  Product,
  | "name"
  | "category"
  | "price"
  | "rating"
  | "reviewCount"
  | "colors"
  | "sizes"
  | "description"
  | "tags"
> &
  Partial<
    Pick<Product, "originalPrice" | "alsoIn" | "highlights" | "specs" | "inStock">
  > & { images: string[] }

const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

const seeds: Seed[] = [
  // The twelve featured products shown in Popular Products.
  {
    name: "Classic Oversized T-Shirt",
    category: "men",
    alsoIn: ["pants-shirts"],
    price: 790,
    originalPrice: 990,
    rating: 4.6,
    reviewCount: 214,
    colors: [c.white, c.black, c.blush],
    sizes: apparel,
    images: ["tee-white", "tee-black", "tee-white-2"],
    description:
      "A relaxed, dropped-shoulder tee cut from dense combed cotton. It holds its shape through a long Dhaka day and softens with every wash.",
    tags: ["popular", "flash", "best"],
  },
  {
    name: "Premium Cotton Shirt",
    category: "pants-shirts",
    alsoIn: ["men"],
    price: 1490,
    originalPrice: 1790,
    rating: 4.7,
    reviewCount: 168,
    colors: [c.blue, c.white, c.navy],
    sizes: apparel,
    images: ["shirt-blue", "shirts-flat", "men-tweed"],
    description:
      "A breathable long-staple cotton shirt with a soft collar and mother-of-pearl-style buttons, sharp enough for work and easy enough for the weekend.",
    tags: ["popular", "best"],
  },
  {
    name: "Women's Elegant Saree",
    category: "saree",
    alsoIn: ["women"],
    price: 2490,
    originalPrice: 2990,
    rating: 4.9,
    reviewCount: 326,
    colors: [c.red, c.olive, c.sand],
    sizes: oneSize,
    images: ["hero-saree", "saree-gold", "saree-mint"],
    description:
      "A fluid woven saree with a hand-finished zari border and a richly detailed pallu, made for wedding season and every celebration after it.",
    tags: ["popular", "best", "flash"],
  },
  {
    name: "Slim Fit Denim Pants",
    category: "pants-shirts",
    alsoIn: ["men"],
    price: 1890,
    originalPrice: 2290,
    rating: 4.5,
    reviewCount: 142,
    colors: [c.navy, c.black],
    sizes: waist,
    images: ["denim-dark", "denim-stack", "denim-street"],
    description:
      "Mid-rise stretch denim with a clean, tapered leg. Enough give for all-day comfort and a deep indigo that fades beautifully.",
    tags: ["popular", "flash"],
  },
  {
    name: "Kids' Casual Outfit",
    category: "kids",
    price: 990,
    originalPrice: 1190,
    rating: 4.8,
    reviewCount: 97,
    colors: [c.navy, c.red],
    sizes: kids,
    images: ["kids-navy", "kids-red", "kids-flat"],
    description:
      "A soft, playground-proof set in breathable cotton, with roomy shorts and an easy pull-on top that little ones can manage themselves.",
    tags: ["popular", "new"],
  },
  {
    name: "Performance Sportswear",
    category: "sport",
    price: 1290,
    originalPrice: 1590,
    rating: 4.6,
    reviewCount: 121,
    colors: [c.black, c.red, c.navy],
    sizes: apparel,
    images: ["sport-class", "sport-core", "hero-sport"],
    description:
      "A quick-dry training set with four-way stretch and flat seams, built to stay cool and comfortable through humid, high-effort sessions.",
    tags: ["popular", "flash"],
  },
  {
    name: "Premium Attar 12ml",
    category: "attar",
    price: 650,
    originalPrice: 790,
    rating: 4.9,
    reviewCount: 411,
    colors: [c.sand, c.brown],
    sizes: ["12ml"],
    images: ["hero-fragrance", "fragrance-set"],
    description:
      "An alcohol-free attar of warm oud, amber and rose. A single touch at the wrist lingers for hours, close to the skin.",
    specs: {
      Volume: "12ml",
      Base: "Alcohol-free oil",
      Notes: "Oud, amber, rose",
      Longevity: "8–10 hours",
    },
    tags: ["popular", "best", "flash"],
  },
  {
    name: "Travel Backpack",
    category: "travel",
    price: 1850,
    originalPrice: 2250,
    rating: 4.7,
    reviewCount: 188,
    colors: [c.navy, c.olive, c.brown],
    sizes: oneSize,
    images: ["backpack-navy", "backpack-canvas", "backpack-leather"],
    description:
      "A 24-litre carry-on-friendly pack with a padded laptop sleeve, water-resistant shell and a quiet, uncluttered silhouette.",
    specs: {
      Capacity: "24 litres",
      Laptop: 'Fits up to 15.6"',
      Material: "Water-resistant polyester",
      Weight: "780g",
    },
    tags: ["popular", "new"],
  },
  {
    name: "Minimalist Home Cushion Set",
    category: "home",
    price: 890,
    originalPrice: 1090,
    rating: 4.4,
    reviewCount: 76,
    colors: [c.white, c.sand, c.olive],
    sizes: oneSize,
    images: ["home-cushion", "home-living", "home-sofa"],
    description:
      "A set of two plump cushions in a textured cotton weave. Quiet colour for a sofa, a reading chair or a freshly made bed.",
    specs: {
      "In the set": "2 cushions with inserts",
      Dimensions: "45 × 45 cm",
      Cover: "Removable cotton",
      Care: "Machine wash cold",
    },
    tags: ["popular"],
  },
  {
    name: "Women's Casual Dress",
    category: "women",
    price: 1990,
    originalPrice: 2390,
    rating: 4.7,
    reviewCount: 203,
    colors: [c.red, c.blush, c.black],
    sizes: apparel,
    images: ["dress-red", "dress-gown", "dress-wrap"],
    description:
      "A printed midi with a cinched waist and a full, swinging skirt. Easy to throw on, and impossible to look underdressed in.",
    tags: ["popular", "best", "new"],
  },
  {
    name: "Men's Polo Shirt",
    category: "men",
    alsoIn: ["pants-shirts"],
    price: 1190,
    originalPrice: 1390,
    rating: 4.5,
    reviewCount: 134,
    colors: [c.blush, c.white, c.navy],
    sizes: apparel,
    images: ["tee-pink", "tee-white-2", "men-street"],
    description:
      "A refined take on the polo in soft pique cotton, with a neat two-button placket and a tailored fit through the shoulder.",
    tags: ["popular", "new"],
  },
  {
    name: "Luxury Fragrance Gift Set",
    category: "attar",
    price: 1590,
    originalPrice: 1990,
    rating: 4.8,
    reviewCount: 158,
    colors: [c.sand],
    sizes: oneSize,
    images: ["fragrance-set", "hero-fragrance"],
    description:
      "Three signature scents in a keepsake box: one floral, one woody and one amber. A generous gift, ready to give as it arrives.",
    specs: {
      "In the set": "3 × 30ml bottles",
      Family: "Floral, woody, amber",
      Packaging: "Keepsake gift box",
      Longevity: "6–8 hours",
    },
    tags: ["popular", "flash", "best"],
  },

  // The wider catalogue, so every category page has depth.
  {
    name: "Tailored Check Suit",
    category: "men",
    price: 6490,
    originalPrice: 7490,
    rating: 4.8,
    reviewCount: 58,
    colors: [c.blue, c.navy],
    sizes: apparel,
    images: ["men-suit", "men-navy"],
    description:
      "A three-piece suit in a subtle windowpane check, half-lined to keep it light in warm weather.",
    tags: ["new"],
  },
  {
    name: "Shawl Collar Knit",
    category: "men",
    price: 2190,
    rating: 4.3,
    reviewCount: 41,
    colors: [c.olive, c.brown],
    sizes: apparel,
    images: ["men-knit", "men-tweed"],
    description:
      "A substantial textured knit with a generous shawl collar, made for cool Dhaka evenings.",
    tags: [],
  },
  {
    name: "Lightweight Bomber Jacket",
    category: "men",
    price: 2790,
    originalPrice: 3290,
    rating: 4.6,
    reviewCount: 89,
    colors: [c.brown, c.olive],
    sizes: apparel,
    images: ["jacket-bomber", "rack-dark"],
    description:
      "A featherweight bomber with ribbed trims and a clean zip front that layers over almost anything.",
    tags: ["new", "best"],
  },
  {
    name: "Evening Drape Gown",
    category: "women",
    price: 4590,
    originalPrice: 5490,
    rating: 4.9,
    reviewCount: 67,
    colors: [c.red, c.black],
    sizes: apparel,
    images: ["dress-wrap", "dress-gown"],
    description:
      "A sculpted gown with a dramatic side drape that falls into a soft, floor-sweeping train.",
    tags: ["new"],
  },
  {
    name: "Wide Leg Striped Trousers",
    category: "women",
    alsoIn: ["pants-shirts"],
    price: 1790,
    rating: 4.4,
    reviewCount: 72,
    colors: [c.black, c.white],
    sizes: apparel,
    images: ["women-pants", "flat-lay"],
    description:
      "High-waisted, fluid trousers with a bold vertical stripe that lengthens the leg.",
    tags: ["new"],
  },
  {
    name: "Ruffled Blush Blouse",
    category: "women",
    price: 1650,
    originalPrice: 1950,
    rating: 4.5,
    reviewCount: 54,
    colors: [c.blush, c.white],
    sizes: ["XS", "S", "M", "L"],
    images: ["dress-blush", "knit"],
    description:
      "An off-shoulder blouse with soft ruffled sleeves in a delicate, airy printed fabric.",
    tags: [],
    inStock: false,
  },
  {
    name: "Tailored Wool-Blend Coat",
    category: "women",
    price: 5290,
    rating: 4.7,
    reviewCount: 39,
    colors: [c.blue, c.sand],
    sizes: apparel,
    images: ["women-street", "rack-wool"],
    description:
      "A long, softly structured coat with a relaxed belt, made to finish every winter outfit.",
    tags: ["best"],
  },
  {
    name: "Kids' Hooded Rain Jacket",
    category: "kids",
    price: 1450,
    originalPrice: 1690,
    rating: 4.7,
    reviewCount: 63,
    colors: [c.sand, c.navy],
    sizes: kids,
    images: ["kids-yellow", "kids-red"],
    description:
      "A cheerful, showerproof jacket with a snug hood, ready for monsoon puddles and muddy parks.",
    tags: ["new"],
  },
  {
    name: "Kids' Everyday Cotton Tee",
    category: "kids",
    price: 490,
    rating: 4.5,
    reviewCount: 110,
    colors: [c.white, c.red],
    sizes: kids,
    images: ["kids-flat", "kids-red"],
    description:
      "A soft, tag-free cotton tee that stands up to daily play and the wash afterwards.",
    tags: ["best"],
  },
  {
    name: "Studio Track Set",
    category: "sport",
    alsoIn: ["women"],
    price: 2350,
    originalPrice: 2790,
    rating: 4.6,
    reviewCount: 82,
    colors: [c.sand, c.black],
    sizes: apparel,
    images: ["sport-yellow", "sport-core"],
    description:
      "A cropped hoodie and cuffed jogger in brushed fleece, equally at home in warm-ups and on the street.",
    tags: ["new"],
  },
  {
    name: "Flex Training Tights",
    category: "sport",
    price: 1090,
    rating: 4.4,
    reviewCount: 95,
    colors: [c.black, c.red],
    sizes: ["XS", "S", "M", "L"],
    images: ["sport-core", "sport-class"],
    description:
      "High-waisted, squat-proof tights with a hidden pocket and a smooth compressive feel.",
    tags: [],
  },
  {
    name: "Velvet Lounge Throw",
    category: "home",
    price: 1690,
    rating: 4.6,
    reviewCount: 31,
    colors: [c.olive, c.sand],
    sizes: oneSize,
    images: ["home-sofa", "home-living"],
    description:
      "A weighty velvet throw with a soft sheen, easily draped across a sofa or the foot of a bed.",
    tags: ["new"],
  },
  {
    name: "Sculptural Accent Pillow",
    category: "home",
    price: 750,
    rating: 4.2,
    reviewCount: 22,
    colors: [c.sand, c.white],
    sizes: oneSize,
    images: ["home-chair", "home-cushion"],
    description:
      "A single lumbar pillow in a warm woven texture, an easy way to lift a quiet corner.",
    tags: [],
    inStock: false,
  },
  {
    name: "Heritage Canvas Rucksack",
    category: "travel",
    price: 2450,
    originalPrice: 2890,
    rating: 4.8,
    reviewCount: 104,
    colors: [c.olive, c.black],
    sizes: oneSize,
    images: ["backpack-canvas", "travel-map"],
    description:
      "Waxed canvas with leather straps and brass hardware, made for weekends that wander.",
    tags: ["best"],
  },
  {
    name: "Full-Grain Leather Backpack",
    category: "travel",
    price: 5890,
    rating: 4.9,
    reviewCount: 47,
    colors: [c.brown],
    sizes: oneSize,
    images: ["backpack-leather", "travel-lounge"],
    description:
      "A soft full-grain leather daypack that only looks better the further it travels.",
    tags: ["new"],
  },
  {
    name: "Banarasi Weave Saree",
    category: "saree",
    price: 5490,
    originalPrice: 6490,
    rating: 4.9,
    reviewCount: 139,
    colors: [c.red, c.sand],
    sizes: oneSize,
    images: ["saree-gold", "hero-saree"],
    description:
      "A rich festive weave with traditional gold motifs and a heavy, statement pallu.",
    tags: ["best", "new"],
  },
  {
    name: "Mint Organza Saree",
    category: "saree",
    price: 3290,
    rating: 4.7,
    reviewCount: 74,
    colors: [c.olive, c.white],
    sizes: oneSize,
    images: ["saree-mint", "saree-gold"],
    description:
      "Sheer, airy organza in a pale mint with fine embroidery and a delicately scalloped edge.",
    tags: ["new"],
  },
  {
    name: "Oxford Formal Shirt Trio",
    category: "pants-shirts",
    price: 3290,
    originalPrice: 3890,
    rating: 4.6,
    reviewCount: 66,
    colors: [c.navy, c.white, c.red],
    sizes: apparel,
    images: ["shirts-flat", "shirt-blue"],
    description:
      "Three wardrobe-building Oxford shirts in deep navy, clean white and rich burgundy.",
    tags: ["best"],
  },
  {
    name: "Relaxed Distressed Jeans",
    category: "pants-shirts",
    price: 2090,
    rating: 4.3,
    reviewCount: 58,
    colors: [c.blue],
    sizes: waist,
    images: ["denim-street", "denim-stack"],
    description:
      "A worn-in, easy-fitting jean with considered distressing and a slightly cropped hem.",
    tags: [],
  },
  {
    name: "Amber Noir Attar 12ml",
    category: "attar",
    price: 790,
    rating: 4.7,
    reviewCount: 126,
    colors: [c.brown],
    sizes: ["12ml"],
    images: ["fragrance-set", "hero-fragrance"],
    description:
      "A smoky, resinous attar of dark amber and sandalwood, with a soft vanilla finish.",
    specs: {
      Volume: "12ml",
      Base: "Alcohol-free oil",
      Notes: "Amber, sandalwood, vanilla",
      Longevity: "8–10 hours",
    },
    tags: ["new"],
  },
]

const apparelSpecs = {
  Fabric: "Premium natural-blend fabric",
  Fit: "True to size",
  Care: "Machine wash cold, line dry",
  Origin: "Designed in Bangladesh",
}

export const products: Product[] = seeds.map((seed, index) => {
  const { images, ...rest } = seed
  return {
    highlights: [
      "Quality checked before dispatch",
      "7-day easy exchange",
      "Cash on delivery available",
    ],
    specs: apparelSpecs,
    inStock: true,
    ...rest,
    id: `p${index + 1}`,
    slug: slugify(seed.name),
    images: images.map(img),
  }
})

export const getProduct = (slug: string) =>
  products.find((product) => product.slug === slug)

export const getProductById = (id: string) =>
  products.find((product) => product.id === id)

export const byTag = (tag: Product["tags"][number]) =>
  products.filter((product) => product.tags.includes(tag))

export const inCategory = (slug: string) =>
  products.filter(
    (product) =>
      product.category === slug ||
      product.alsoIn?.includes(slug as Product["category"])
  )

export function relatedProducts(product: Product, count = 4) {
  return inCategory(product.category)
    .filter((candidate) => candidate.id !== product.id)
    .slice(0, count)
}

export const PRICE_CEILING = Math.max(...products.map((p) => p.price))
