import type {
  HeroSlide,
  Order,
  Review,
  Testimonial,
  UserProfile,
} from "@/types"

export const announcements = [
  "NEW SEASON COLLECTION — SHOP THE LATEST TRENDS",
  "Free Shipping on Orders Over ৳2,000",
  "Discover Our Premium Attar Collection",
]

export const heroSlides: HeroSlide[] = [
  {
    id: "season",
    eyebrow: "Autumn / Winter",
    headline: "New Season, New Style",
    subtitle: "Rich colour, confident shapes and the pieces worth keeping.",
    href: "/shop",
    image: "/images/hero-season.webp",
    focus: "50% 25%",
  },
  {
    id: "essentials",
    eyebrow: "The Daily Edit",
    headline: "Everyday Essentials",
    subtitle: "Soft neutrals and honest fabrics, made to wear on repeat.",
    href: "/category/pants-shirts",
    image: "/images/hero-essentials.webp",
    focus: "50% 40%",
  },
  {
    id: "saree",
    eyebrow: "Heritage Weaves",
    headline: "Elegant Saree Collection",
    subtitle: "Hand-finished drapes for weddings, Eid and every celebration.",
    href: "/category/saree",
    image: "/images/hero-saree.webp",
    focus: "50% 22%",
  },
  {
    id: "fragrance",
    eyebrow: "Attar & Perfume",
    headline: "The Art of Fragrance",
    subtitle: "Alcohol-free attars blended to linger close to the skin.",
    href: "/category/attar",
    image: "/images/hero-fragrance.webp",
    focus: "50% 55%",
  },
  {
    id: "sport",
    eyebrow: "Performance",
    headline: "Move Beyond Limits",
    subtitle: "Quick-dry training layers for hard, humid sessions.",
    href: "/category/sport",
    image: "/images/hero-sport.webp",
    focus: "50% 50%",
  },
]

export const promotions = [
  {
    id: "winter",
    eyebrow: "Seasonal Offer",
    title: "Winter Layers, Up to 25% Off",
    caption: "Coats, knits and jackets for cooler days.",
    href: "/category/men",
    image: "/images/rack-wool.webp",
  },
  {
    id: "gift",
    eyebrow: "The Gift Edit",
    title: "Fragrance, Beautifully Boxed",
    caption: "Attars and gift sets that arrive ready to give.",
    href: "/category/attar",
    image: "/images/fragrance-set.webp",
  },
]

export const collections = [
  {
    title: "The Neutral Wardrobe",
    caption: "Quiet tones, soft textures",
    href: "/shop",
    image: "/images/rack-neutral.webp",
  },
  {
    title: "Street Layers",
    caption: "Denim, leather and knit",
    href: "/category/women",
    image: "/images/rack-dark.webp",
  },
  {
    title: "Weekend Away",
    caption: "Pack light, travel well",
    href: "/category/travel",
    image: "/images/travel-map.webp",
  },
]

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Tasnia R.",
    city: "Dhaka",
    quote:
      "The saree felt far more expensive than it was. The zari work is beautiful, and it arrived in two days, wrapped like a gift.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Imran H.",
    city: "Chattogram",
    quote:
      "Finally, a tee that keeps its shape after a dozen washes. I came back and bought it in all three colours.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Nusrat J.",
    city: "Sylhet",
    quote:
      "The attar lasts all day without ever being too much. I get asked what I am wearing almost every time.",
    rating: 4,
  },
]

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Farhan A.",
    rating: 5,
    date: "2026-09-18",
    title: "Better than the photos",
    body: "The quality is excellent for the price. Fabric feels premium, and the fit is exactly as described.",
  },
  {
    id: "r2",
    name: "Sadia K.",
    rating: 5,
    date: "2026-08-30",
    title: "Quick delivery, lovely packaging",
    body: "Arrived in Dhaka within two days. It was carefully packed, and it makes a lovely gift too.",
  },
  {
    id: "r3",
    name: "Rafiq M.",
    rating: 4,
    date: "2026-08-02",
    title: "Very good, size up if unsure",
    body: "Great finish and colour. I usually wear a medium and would take a large next time for a looser fit.",
  },
]

export const faqs = [
  {
    group: "Orders & Delivery",
    items: [
      {
        q: "How long does delivery take?",
        a: "Inside Dhaka, standard delivery takes 1–2 working days. Outside Dhaka, allow 3–5 working days. Express delivery arrives the next working day.",
      },
      {
        q: "How much does delivery cost?",
        a: "Delivery starts at ৳80 inside Dhaka and ৳130 outside Dhaka. Standard delivery is free on orders over ৳2,000.",
      },
      {
        q: "How can I track my order?",
        a: "Open My Orders from your account to see the latest status of each order.",
      },
    ],
  },
  {
    group: "Returns & Exchanges",
    items: [
      {
        q: "What is your exchange policy?",
        a: "Unworn items with their tags attached can be exchanged within 7 days of delivery. Opened fragrance cannot be exchanged for hygiene reasons.",
      },
      {
        q: "What if my item arrives damaged?",
        a: "Contact us within 48 hours with a photo of the item and we will arrange a replacement.",
      },
    ],
  },
  {
    group: "Payment & Products",
    items: [
      {
        q: "Which payment methods do you offer?",
        a: "Checkout shows cash on delivery, mobile banking and card options. This is a demo store, so no payment is ever taken.",
      },
      {
        q: "Are your attars alcohol-free?",
        a: "Yes. All NOVA attars are oil-based and alcohol-free.",
      },
    ],
  },
]

export const userProfile: UserProfile = {
  firstName: "Ayesha",
  lastName: "Rahman",
  email: "ayesha.demo@nova.example",
  phone: "01700-000000",
  memberSince: "2024",
  points: 1240,
  addresses: [
    {
      id: "a1",
      label: "Home",
      line: "House 12, Road 5, Dhanmondi, Dhaka 1205",
      isDefault: true,
    },
    {
      id: "a2",
      label: "Office",
      line: "Level 7, Gulshan Avenue, Gulshan 1, Dhaka 1212",
      isDefault: false,
    },
  ],
}

export const demoOrders: Order[] = [
  {
    id: "NV-20418",
    date: "2026-10-21",
    status: "Shipped",
    lines: [
      { productId: "p3", size: "One Size", color: "Red", quantity: 1, price: 2490 },
      { productId: "p7", size: "12ml", color: "Sand", quantity: 2, price: 650 },
    ],
    subtotal: 3790,
    shipping: 0,
    discount: 0,
    total: 3790,
    paymentMethod: "Cash on Delivery",
    deliveryMethod: "Standard, inside Dhaka",
    address: "House 12, Road 5, Dhanmondi, Dhaka 1205",
  },
  {
    id: "NV-19872",
    date: "2026-09-02",
    status: "Delivered",
    lines: [
      { productId: "p1", size: "M", color: "White", quantity: 2, price: 790 },
    ],
    subtotal: 1580,
    shipping: 80,
    discount: 158,
    total: 1502,
    paymentMethod: "Mobile Banking",
    deliveryMethod: "Standard, inside Dhaka",
    address: "House 12, Road 5, Dhanmondi, Dhaka 1205",
  },
  {
    id: "NV-18340",
    date: "2026-06-14",
    status: "Delivered",
    lines: [
      { productId: "p8", size: "One Size", color: "Navy", quantity: 1, price: 1850 },
      { productId: "p9", size: "One Size", color: "Sand", quantity: 1, price: 890 },
    ],
    subtotal: 2740,
    shipping: 0,
    discount: 0,
    total: 2740,
    paymentMethod: "Card",
    deliveryMethod: "Standard, inside Dhaka",
    address: "Level 7, Gulshan Avenue, Gulshan 1, Dhaka 1212",
  },
]
