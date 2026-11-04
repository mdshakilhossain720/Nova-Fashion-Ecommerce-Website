import type { BlogPost } from "@/types"

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-style-a-saree-for-the-modern-wardrobe",
    title: "How to Style a Saree for the Modern Wardrobe",
    excerpt:
      "Sharp blouses, quiet jewellery and a confident drape make a heritage piece feel entirely of the moment.",
    category: "Style",
    author: "Maliha Sultana",
    date: "2026-10-12",
    readMinutes: 5,
    featured: true,
    image: "/images/saree-gold.webp",
    body: [
      "A saree never really goes out of fashion, but the way we wear it keeps changing. The most striking looks this season are the simplest: one beautiful weave, and very little competing with it.",
      "Start with the blouse. A high neck or a clean, structured sleeve instantly modernises a traditional fabric, and it gives a heavy pallu room to be the focus.",
      "Then edit the jewellery. If the border is rich with zari, choose a single statement earring and leave the neck bare. The restraint is what makes it feel current.",
      "Finally, practise your drape. A slightly narrower pleat and a longer pallu create a long, elegant line that flatters almost everyone.",
    ],
  },
  {
    slug: "the-art-of-wearing-attar",
    title: "The Art of Wearing Attar",
    excerpt:
      "Why a single touch of oil outlasts a cloud of spray, and where to apply it for a scent that stays close.",
    category: "Fragrance",
    author: "Tahmid Karim",
    date: "2026-09-28",
    readMinutes: 4,
    image: "/images/hero-fragrance.webp",
    body: [
      "Attar is one of the oldest forms of perfume in the world. Because it is oil-based, it behaves differently from a modern spray: it warms slowly and stays close to the skin.",
      "Apply a small touch to your pulse points, such as the wrists, behind the ears and at the base of the throat. There is no need to rub, as that only hurries the top notes away.",
      "Pay attention to how the scent changes over the day. The first hour is bright, but the most beautiful part of an attar often arrives much later.",
    ],
  },
  {
    slug: "the-art-of-packing-light",
    title: "The Art of Packing Light",
    excerpt:
      "A five-piece formula and one good backpack are all you need for a long weekend away.",
    category: "Travel",
    author: "Rumana Ahmed",
    date: "2026-09-09",
    readMinutes: 6,
    image: "/images/travel-map.webp",
    body: [
      "Good packing begins with colour. Choose a palette of two neutrals and one accent, and suddenly every top works with every bottom.",
      "Our five-piece formula is simple: one pair of good trousers, two tops, one layer and one piece that can dress up for the evening.",
      "Roll soft things, fold structured things and keep everything you might need in transit at the top of your bag.",
    ],
  },
  {
    slug: "building-a-neutral-wardrobe",
    title: "Building a Neutral Wardrobe That Lasts",
    excerpt:
      "Ten considered pieces, a tight palette and why fabric matters more than trends.",
    category: "Style",
    author: "Maliha Sultana",
    date: "2026-08-20",
    readMinutes: 7,
    image: "/images/rack-neutral.webp",
    body: [
      "A neutral wardrobe is not a boring one. It is a wardrobe where everything works together, leaving you free to enjoy the pieces that truly stand out.",
      "Begin with what you already wear every week, then replace those pieces one by one with better versions in natural fabrics.",
      "Texture does the work that colour usually would. Pair a coarse knit with soft cotton, or raw denim with a fine shirt.",
    ],
  },
  {
    slug: "a-calmer-living-room",
    title: "Five Small Changes for a Calmer Living Room",
    excerpt:
      "Soft textiles, warm light and fewer, better objects turn a busy room into somewhere you want to stay.",
    category: "Home",
    author: "Rumana Ahmed",
    date: "2026-08-04",
    readMinutes: 4,
    image: "/images/home-living.webp",
    body: [
      "A calm room starts with clearing surfaces. Keep out only what you use every day or truly love to look at, and give everything else a home.",
      "Swap one bright overhead light for two or three lamps at different heights. Warm, low light changes the mood of a room more than any new furniture.",
      "Finally, layer textiles. A handloom throw and a couple of linen cushions add softness without adding clutter.",
    ],
  },
  {
    slug: "how-to-care-for-denim",
    title: "How to Care for Denim So It Lasts for Years",
    excerpt:
      "Wash less, wash cold and dry flat: the simple routine that keeps colour deep and seams strong.",
    category: "Care Guide",
    author: "Tahmid Karim",
    date: "2026-07-18",
    readMinutes: 5,
    image: "/images/denim-stack.webp",
    body: [
      "Good denim rarely needs washing. Airing it overnight and spot-cleaning small marks keeps it fresh for weeks between washes.",
      "When it does need a wash, turn it inside out, use cold water and a gentle detergent, and skip the tumble dryer completely.",
      "Dry it flat or hang it by the waistband in the shade. Direct sun fades indigo far faster than you would expect.",
    ],
  },
  {
    slug: "training-in-the-humidity",
    title: "What to Wear When Training in the Humidity",
    excerpt:
      "Quick-dry fabrics, the right fit and a few habits that make hard sessions in Dhaka's monsoon far easier.",
    category: "Sport",
    author: "Imran Hossain",
    date: "2026-06-30",
    readMinutes: 6,
    image: "/images/sport-class.webp",
    body: [
      "In humid weather, cotton holds sweat and gets heavy. A lightweight, quick-dry knit moves moisture away from the skin so you stay cooler for longer.",
      "Fit matters as much as fabric. A slightly relaxed top lets air move, while a closer fit on leggings or shorts stops chafing on longer runs.",
      "Train early or late when you can, keep water close, and rinse your kit after every session so it stays fresh.",
    ],
  },
  {
    slug: "dressing-kids-for-eid",
    title: "Dressing Kids for Eid: Comfort First",
    excerpt:
      "Festive pieces children will actually keep on, from soft cotton panjabis to easy, twirl-ready dresses.",
    category: "Style",
    author: "Maliha Sultana",
    date: "2026-06-02",
    readMinutes: 3,
    image: "/images/kids-flat.webp",
    body: [
      "The best Eid outfit for a child is one they forget they are wearing. Choose soft, breathable cotton over stiff or scratchy embellishment.",
      "Look for easy fastenings and a little room to grow, so the outfit lasts through a long day of visiting family.",
      "Pack a simple change of clothes. Festive food and excited cousins rarely mix well with a white panjabi.",
    ],
  },
]

export const blogCategories = [
  "All",
  ...new Set(blogPosts.map((post) => post.category)),
]

export const getPost = (slug: string) =>
  blogPosts.find((post) => post.slug === slug)
