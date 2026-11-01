import type { Category, CategorySlug } from "@/types"

export const categories: Category[] = [
  {
    slug: "men",
    name: "Men",
    description: "Considered tailoring, easy tees and everyday layers.",
    image: "/images/men-navy.webp",
  },
  {
    slug: "women",
    name: "Women",
    description: "Dresses, separates and statement pieces for every occasion.",
    image: "/images/dress-gown.webp",
  },
  {
    slug: "kids",
    name: "Kids",
    description: "Soft, hard-wearing clothes made for playing in.",
    image: "/images/kids-yellow.webp",
  },
  {
    slug: "sport",
    name: "Sport",
    description: "High-performance training gear that moves with you.",
    image: "/images/sport-yellow.webp",
  },
  {
    slug: "home",
    name: "Home & Living",
    description: "Quiet textures and calm colour for the rooms you love.",
    image: "/images/home-living.webp",
  },
  {
    slug: "travel",
    name: "Travel",
    description: "Well-made bags and companions for the road ahead.",
    image: "/images/travel-deck.webp",
  },
  {
    slug: "saree",
    name: "Saree",
    description: "Heritage weaves and modern drapes, finished by hand.",
    image: "/images/saree-gold.webp",
  },
  {
    slug: "pants-shirts",
    name: "Pants & Shirts",
    description: "Sharp shirting and well-cut denim, the daily uniform.",
    image: "/images/shirts-flat.webp",
  },
  {
    slug: "attar",
    name: "Attar & Perfumes",
    description: "Alcohol-free attars and fine fragrance, blended to linger.",
    image: "/images/hero-fragrance.webp",
  },
]

export const getCategory = (slug: string) =>
  categories.find((category) => category.slug === slug)

export interface MegaColumn {
  title: string
  links: { label: string; href: string }[]
}

export interface NavItem {
  label: string
  href: string
  mega?: {
    columns: MegaColumn[]
    promo: { title: string; caption: string; image: string; href: string }
  }
}

const shop = (slug: CategorySlug) => `/category/${slug}`

export const navItems: NavItem[] = [
  {
    label: "Men",
    href: shop("men"),
    mega: {
      columns: [
        {
          title: "Clothing",
          links: [
            { label: "All Menswear", href: shop("men") },
            { label: "Pants & Shirts", href: shop("pants-shirts") },
            { label: "Sportswear", href: shop("sport") },
          ],
        },
        {
          title: "Collections",
          links: [
            { label: "Shop All", href: "/shop" },
            { label: "Fragrance for Him", href: shop("attar") },
            { label: "Travel Bags", href: shop("travel") },
          ],
        },
      ],
      promo: {
        title: "The Modern Tailor",
        caption: "Sharp lines for the new season",
        image: "/images/men-suit.webp",
        href: shop("men"),
      },
    },
  },
  {
    label: "Women",
    href: shop("women"),
    mega: {
      columns: [
        {
          title: "Clothing",
          links: [
            { label: "All Womenswear", href: shop("women") },
            { label: "Saree Collection", href: shop("saree") },
            { label: "Activewear", href: shop("sport") },
          ],
        },
        {
          title: "Collections",
          links: [
            { label: "Shop All", href: "/shop" },
            { label: "Attar Collection", href: shop("attar") },
            { label: "Style Journal", href: "/blog" },
          ],
        },
      ],
      promo: {
        title: "Elegant Saree Edit",
        caption: "Woven for celebration",
        image: "/images/saree-gold.webp",
        href: shop("saree"),
      },
    },
  },
  {
    label: "Kids",
    href: shop("kids"),
    mega: {
      columns: [
        {
          title: "Shop Kids",
          links: [
            { label: "All Kidswear", href: shop("kids") },
            { label: "Shop All", href: "/shop" },
          ],
        },
      ],
      promo: {
        title: "Made for Play",
        caption: "Soft, hard-wearing cotton",
        image: "/images/kids-yellow.webp",
        href: shop("kids"),
      },
    },
  },
  {
    label: "Sport",
    href: shop("sport"),
    mega: {
      columns: [
        {
          title: "Shop Sport",
          links: [
            { label: "All Sportswear", href: shop("sport") },
            { label: "Travel Backpacks", href: shop("travel") },
          ],
        },
      ],
      promo: {
        title: "Move Beyond Limits",
        caption: "Performance layers",
        image: "/images/sport-class.webp",
        href: shop("sport"),
      },
    },
  },
  {
    label: "Home",
    href: shop("home"),
    mega: {
      columns: [
        {
          title: "Home & Living",
          links: [
            { label: "All Home", href: shop("home") },
            { label: "Fragrance Gifts", href: shop("attar") },
          ],
        },
      ],
      promo: {
        title: "Quiet Rooms",
        caption: "Texture, calm and colour",
        image: "/images/home-chair.webp",
        href: shop("home"),
      },
    },
  },
  {
    label: "Travel",
    href: shop("travel"),
    mega: {
      columns: [
        {
          title: "Travel",
          links: [
            { label: "All Travel", href: shop("travel") },
            { label: "Read: Packing Light", href: "/blog/the-art-of-packing-light" },
          ],
        },
      ],
      promo: {
        title: "Go Further",
        caption: "Bags for every road",
        image: "/images/backpack-canvas.webp",
        href: shop("travel"),
      },
    },
  },
  {
    label: "Attar & Fragrance",
    href: shop("attar"),
    mega: {
      columns: [
        {
          title: "Fragrance",
          links: [
            { label: "Attar Collection", href: shop("attar") },
            { label: "Read: The Art of Attar", href: "/blog/the-art-of-wearing-attar" },
          ],
        },
      ],
      promo: {
        title: "The Art of Fragrance",
        caption: "Alcohol-free, long-lasting",
        image: "/images/fragrance-set.webp",
        href: shop("attar"),
      },
    },
  },
  { label: "Blog", href: "/blog" },
]
