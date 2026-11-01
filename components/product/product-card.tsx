"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Eye, Heart, ShoppingBag } from "lucide-react"

import { Rating } from "@/components/common/bits"
import { SmartImage } from "@/components/common/smart-image"
import { getCategory } from "@/data/categories"
import { discountPercent, formatPrice } from "@/lib/format"
import { cn } from "@/lib/utils"
import { toast, useCart, useUi, useWishlist } from "@/store"
import type { Product } from "@/types"

export function useProductActions(product: Product) {
  const add = useCart((state) => state.add)
  const toggle = useWishlist((state) => state.toggle)
  const wished = useWishlist((state) => state.ids.includes(product.id))

  return {
    wished,
    toggleWish: () => {
      const added = toggle(product.id)
      toast(
        added
          ? `${product.name} saved to your wishlist`
          : `${product.name} removed from your wishlist`,
        added ? { label: "View", href: "/wishlist" } : undefined
      )
    },
    addToBag: (
      size = product.sizes[0],
      color = product.colors[0].name,
      quantity = 1
    ) => {
      add(product.id, size, color, quantity)
      toast(`${product.name} added to your bag`, {
        label: "View bag",
        href: "/cart",
      })
    },
  }
}

export function PriceTag({
  product,
  large,
}: {
  product: Product
  large?: boolean
}) {
  return (
    <p className="flex flex-wrap items-baseline gap-x-2">
      <span className={cn("font-medium", large ? "text-2xl" : "text-sm sm:text-base")}>
        <span className="sr-only">Price: </span>
        {formatPrice(product.price)}
      </span>
      {product.originalPrice && (
        <s className={cn("text-muted-foreground", large ? "text-base" : "text-xs sm:text-sm")}>
          <span className="sr-only">Original price: </span>
          {formatPrice(product.originalPrice)}
        </s>
      )}
    </p>
  )
}

export function ProductCard({
  product,
  sizes = "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw",
}: {
  product: Product
  sizes?: string
}) {
  const { wished, toggleWish, addToBag } = useProductActions(product)
  const setQuickView = useUi((state) => state.setQuickView)
  const discount = discountPercent(product.price, product.originalPrice)
  const href = `/product/${product.slug}`

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45 }}
      className="group flex h-full min-w-0 flex-col"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-surface">
        <Link href={href} tabIndex={-1} aria-hidden className="absolute inset-0">
          <SmartImage
            src={product.images[0]}
            alt=""
            sizes={sizes}
            className="transition-transform duration-700 group-hover:scale-105"
          />
          {product.images[1] && (
            <SmartImage
              layered
              src={product.images[1]}
              alt=""
              sizes={sizes}
              className="opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
        </Link>

        <div className="pointer-events-none absolute top-2 left-2 flex flex-col items-start gap-1 sm:top-3 sm:left-3">
          {discount > 0 && (
            <span className="rounded-sm bg-gold px-2 py-0.5 text-[0.6875rem] font-semibold text-[#171717]">
              −{discount}%
            </span>
          )}
          {!product.inStock && (
            <span className="rounded-sm bg-[#171717] px-2 py-0.5 text-[0.6875rem] text-white">
              Sold out
            </span>
          )}
        </div>

        <div className="absolute top-1 right-1 flex flex-col sm:top-2 sm:right-2">
          <button
            type="button"
            onClick={toggleWish}
            aria-pressed={wished}
            aria-label={`${wished ? "Remove" : "Save"} ${product.name} ${wished ? "from" : "to"} wishlist`}
            className="flex size-11 items-center justify-center"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-white/90 text-[#171717] shadow-sm transition-transform hover:scale-110">
              <Heart
                className={cn("size-4", wished && "fill-[#A8232B] text-[#A8232B]")}
                aria-hidden
              />
            </span>
          </button>
          <button
            type="button"
            onClick={() => setQuickView(product.id)}
            aria-label={`Quick view ${product.name}`}
            className="flex size-11 items-center justify-center transition-opacity lg:opacity-0 lg:group-focus-within:opacity-100 lg:group-hover:opacity-100"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-white/90 text-[#171717] shadow-sm transition-transform hover:scale-110">
              <Eye className="size-4" aria-hidden />
            </span>
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-3">
        <p className="text-[0.6875rem] tracking-[0.12em] text-muted-foreground uppercase">
          {getCategory(product.category)?.name}
        </p>
        <h3 className="mt-1 text-sm leading-snug sm:text-base">
          <Link href={href} className="transition-colors hover:text-gold-ink">
            {product.name}
          </Link>
        </h3>
        <Rating
          value={product.rating}
          count={product.reviewCount}
          className="mt-1.5"
        />
        <div className="mt-1.5">
          <PriceTag product={product} />
        </div>
        <div className="mt-2 flex items-center gap-1.5">
          {product.colors.map((color) => (
            <span
              key={color.name}
              title={color.name}
              className="size-3 rounded-full ring-1 ring-black/15 dark:ring-white/25"
              style={{ backgroundColor: color.hex }}
            >
              <span className="sr-only">{color.name}</span>
            </span>
          ))}
        </div>
        <button
          type="button"
          disabled={!product.inStock}
          onClick={() => addToBag()}
          className="mt-auto flex min-h-11 w-full items-center justify-center gap-2 border-t border-transparent text-xs tracking-[0.12em] uppercase transition-colors group-hover:border-border hover:text-gold-ink disabled:cursor-not-allowed disabled:text-muted-foreground"
        >
          <ShoppingBag className="size-3.5" aria-hidden />
          {product.inStock ? "Add to Cart" : "Sold Out"}
          <span className="sr-only">: {product.name}</span>
        </button>
      </div>
    </motion.article>
  )
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-y-12">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
