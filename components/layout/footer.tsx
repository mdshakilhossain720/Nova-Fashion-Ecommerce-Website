import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

import { categories } from "@/data/categories"

const columns = [
  {
    title: "Shop",
    links: [
      { label: "Shop All", href: "/shop" },
      ...categories.slice(0, 5).map((category) => ({
        label: category.name,
        href: `/category/${category.slug}`,
      })),
    ],
  },
  {
    title: "Collections",
    links: [
      { label: "Saree Collection", href: "/category/saree" },
      { label: "Pants & Shirts", href: "/category/pants-shirts" },
      { label: "Attar Collection", href: "/category/attar" },
      { label: "Travel", href: "/category/travel" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "My Orders", href: "/orders" },
      { label: "My Account", href: "/account" },
    ],
  },
  {
    title: "NOVA",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog & Style Journal", href: "/blog" },
      { label: "Wishlist", href: "/wishlist" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-[#121212] text-white">
      <div className="page-gutter grid gap-10 py-14 lg:grid-cols-[1.4fr_3fr] lg:py-20">
        <div>
          <p className="font-heading text-3xl tracking-[0.22em]">NOVA</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
            Considered fashion, home and fragrance, made for modern Bangladesh.
          </p>
          <ul className="mt-6 space-y-2.5 text-sm text-white/65">
            <li className="flex items-center gap-2.5">
              <MapPin className="size-4 shrink-0 text-gold" aria-hidden />
              Gulshan Avenue, Dhaka (demo)
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="size-4 shrink-0 text-gold" aria-hidden />
              01700-000000 (demo)
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="size-4 shrink-0 text-gold" aria-hidden />
              hello@nova.example
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="mb-4 text-[0.6875rem] tracking-[0.22em] text-gold uppercase">
                {column.title}
              </h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-block py-1.5 text-sm text-white/75 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="page-gutter flex flex-col gap-1 py-5 text-xs text-white/55 sm:flex-row sm:justify-between">
          <p>© 2026 NOVA. A fictional demo storefront.</p>
          <p>No real orders, payments or accounts are processed.</p>
        </div>
      </div>
    </footer>
  )
}
