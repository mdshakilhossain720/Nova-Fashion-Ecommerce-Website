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
]

export const getPost = (slug: string) =>
  blogPosts.find((post) => post.slug === slug)
