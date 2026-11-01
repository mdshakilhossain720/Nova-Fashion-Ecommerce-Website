"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import {
  Heart,
  Menu,
  Moon,
  Search,
  ShoppingBag,
  Sun,
  User,
} from "lucide-react"

import { SmartImage } from "@/components/common/smart-image"
import { navItems } from "@/data/categories"
import { announcements } from "@/data/content"
import { cn } from "@/lib/utils"
import { cartTotals, useCart, useTheme, useUi, useWishlist } from "@/store"

function AnnouncementBar() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(
      () => setIndex((current) => (current + 1) % announcements.length),
      4500
    )
    return () => clearInterval(timer)
  }, [paused])

  return (
    <div
      className="bg-[#171717] text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative flex h-9 items-center justify-center overflow-hidden px-4 text-center text-[0.6875rem] tracking-[0.14em]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="truncate"
          >
            {announcements[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}

function IconLink({
  href,
  label,
  count,
  children,
  className,
}: {
  href: string
  label: string
  count?: number
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      aria-label={count ? `${label}, ${count} items` : label}
      className={cn(
        "relative flex size-11 items-center justify-center rounded-full transition-colors hover:bg-surface",
        className
      )}
    >
      {children}
      {!!count && (
        <span className="absolute top-1 right-0.5 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-gold px-1 text-[0.625rem] font-semibold text-[#171717]">
          {count}
        </span>
      )}
    </Link>
  )
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const items = useCart((state) => state.items)
  const wishlistCount = useWishlist((state) => state.ids.length)
  const theme = useTheme((state) => state.theme)
  const toggleTheme = useTheme((state) => state.toggle)
  const setNavOpen = useUi((state) => state.setNavOpen)
  const setSearchOpen = useUi((state) => state.setSearchOpen)
  const { count } = cartTotals(items, null)
  const active = navItems.find((item) => item.label === activeMenu)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[70] bg-background p-3 focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to content
      </a>
      <AnnouncementBar />
      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-all duration-300",
          scrolled || active
            ? "border-border bg-background/95 shadow-sm backdrop-blur-md"
            : "border-transparent bg-background"
        )}
        onMouseLeave={() => setActiveMenu(null)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setActiveMenu(null)
        }}
      >
        <div className="page-gutter flex h-16 items-center gap-2 lg:h-20">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setNavOpen(true)}
            className="-ml-2 flex size-11 items-center justify-center rounded-full hover:bg-surface lg:hidden"
          >
            <Menu className="size-5" aria-hidden />
          </button>

          <Link
            href="/"
            aria-label="NOVA home"
            className="font-heading text-2xl tracking-[0.22em] lg:text-3xl"
            onMouseEnter={() => setActiveMenu(null)}
          >
            NOVA
          </Link>

          <nav
            aria-label="Main"
            className="ml-6 hidden flex-1 items-center justify-center gap-1 lg:flex xl:gap-3"
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-haspopup={item.mega ? "true" : undefined}
                aria-expanded={item.mega ? activeMenu === item.label : undefined}
                onMouseEnter={() => setActiveMenu(item.mega ? item.label : null)}
                onFocus={() => setActiveMenu(item.mega ? item.label : null)}
                onClick={() => setActiveMenu(null)}
                className={cn(
                  "border-b px-1.5 py-2 text-[0.8125rem] whitespace-nowrap transition-colors xl:px-2",
                  activeMenu === item.label
                    ? "border-gold-ink text-gold-ink"
                    : "border-transparent hover:text-gold-ink"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center lg:ml-0">
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="flex size-11 items-center justify-center rounded-full transition-colors hover:bg-surface"
            >
              <Search className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              onClick={toggleTheme}
              className="hidden size-11 items-center justify-center rounded-full transition-colors hover:bg-surface sm:flex"
            >
              {theme === "dark" ? (
                <Sun className="size-5" aria-hidden />
              ) : (
                <Moon className="size-5" aria-hidden />
              )}
            </button>
            <IconLink href="/account" label="Account" className="hidden lg:flex">
              <User className="size-5" aria-hidden />
            </IconLink>
            <IconLink
              href="/wishlist"
              label="Wishlist"
              count={wishlistCount}
              className="hidden sm:flex"
            >
              <Heart className="size-5" aria-hidden />
            </IconLink>
            <IconLink href="/cart" label="Shopping bag" count={count}>
              <ShoppingBag className="size-5" aria-hidden />
            </IconLink>
          </div>
        </div>

        <AnimatePresence>
          {active?.mega && (
            <motion.div
              key="mega"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 top-full hidden border-y bg-background shadow-lg lg:block"
            >
              <div className="page-gutter grid grid-cols-[1fr_auto] gap-12 py-10">
                <div className="flex gap-20">
                  {active.mega.columns.map((column) => (
                    <div key={column.title}>
                      <p className="eyebrow mb-4">{column.title}</p>
                      <ul className="space-y-3">
                        {column.links.map((link) => (
                          <li key={link.label}>
                            <Link
                              href={link.href}
                              onClick={() => setActiveMenu(null)}
                              className="font-heading text-xl transition-colors hover:text-gold-ink"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <Link
                  href={active.mega.promo.href}
                  onClick={() => setActiveMenu(null)}
                  className="group relative block h-64 w-[26rem] overflow-hidden rounded-sm"
                >
                  <SmartImage
                    key={active.mega.promo.image}
                    src={active.mega.promo.image}
                    alt=""
                    sizes="420px"
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute inset-x-5 bottom-5 text-white">
                    <span className="block font-heading text-2xl">
                      {active.mega.promo.title}
                    </span>
                    <span className="text-sm text-white/85">
                      {active.mega.promo.caption}
                    </span>
                  </span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
