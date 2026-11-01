"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Moon, Search, Sun } from "lucide-react"

import { Sheet } from "@/components/common/sheet"
import { SmartImage } from "@/components/common/smart-image"
import { categories } from "@/data/categories"
import { products } from "@/data/products"
import { formatPrice } from "@/lib/format"
import { useTheme, useUi } from "@/store"

const secondaryLinks = [
  { label: "Shop All", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "My Account", href: "/account" },
  { label: "My Orders", href: "/orders" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
]

export function MobileNav() {
  const open = useUi((state) => state.navOpen)
  const setOpen = useUi((state) => state.setNavOpen)
  const theme = useTheme((state) => state.theme)
  const toggleTheme = useTheme((state) => state.toggle)
  const close = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen} side="left" title="Menu">
      <nav aria-label="Mobile" className="px-5 pb-8">
        <ul className="divide-y">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/category/${category.slug}`}
                onClick={close}
                className="flex min-h-14 items-center justify-between font-heading text-xl"
              >
                {category.name}
                <ArrowRight className="size-4 text-muted-foreground" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
        <ul className="mt-6 grid grid-cols-2 gap-x-4 border-t pt-4">
          {secondaryLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={close}
                className="flex min-h-11 items-center text-sm text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={toggleTheme}
          className="mt-4 flex min-h-11 items-center gap-2 text-sm"
        >
          {theme === "dark" ? (
            <Sun className="size-4" aria-hidden />
          ) : (
            <Moon className="size-4" aria-hidden />
          )}
          Switch to {theme === "dark" ? "light" : "dark"} theme
        </button>
      </nav>
    </Sheet>
  )
}

export function SearchOverlay() {
  const open = useUi((state) => state.searchOpen)
  const setOpen = useUi((state) => state.setSearchOpen)
  const [query, setQuery] = useState("")
  const router = useRouter()

  const term = query.trim().toLowerCase()
  const matches = term
    ? products
        .filter((product) =>
          `${product.name} ${product.category}`.toLowerCase().includes(term)
        )
        .slice(0, 5)
    : []

  const close = () => {
    setOpen(false)
    setQuery("")
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => (next ? setOpen(true) : close())}
      side="top"
      title="Search NOVA"
      hideTitle
    >
      <div className="mx-auto max-w-3xl px-5 pb-8">
        <form
          role="search"
          onSubmit={(event) => {
            event.preventDefault()
            if (!term) return
            router.push(`/search?q=${encodeURIComponent(query.trim())}`)
            close()
          }}
          className="flex items-center gap-3 border-b border-foreground pb-3"
        >
          <Search className="size-5 shrink-0" aria-hidden />
          <input
            type="search"
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search products"
            placeholder="Search sarees, attar, shirts…"
            className="w-full bg-transparent font-heading text-2xl outline-none placeholder:text-muted-foreground lg:text-3xl"
          />
        </form>

        {term && matches.length === 0 && (
          <p className="mt-6 text-muted-foreground">
            No products match “{query.trim()}”.
          </p>
        )}

        {matches.length > 0 && (
          <ul className="mt-4 divide-y">
            {matches.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/product/${product.slug}`}
                  onClick={close}
                  className="flex items-center gap-4 py-3 hover:text-gold-ink"
                >
                  <span className="relative h-16 w-12 shrink-0 overflow-hidden rounded-sm">
                    <SmartImage src={product.images[0]} alt="" sizes="48px" />
                  </span>
                  <span className="min-w-0 flex-1 truncate">{product.name}</span>
                  <span className="text-sm">{formatPrice(product.price)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {!term && (
          <div className="mt-6">
            <p className="eyebrow mb-3">Popular categories</p>
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 6).map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  onClick={close}
                  className="rounded-full border px-4 py-2 text-sm transition-colors hover:border-foreground"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </Sheet>
  )
}
