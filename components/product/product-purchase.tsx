"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react"

import { Rating } from "@/components/common/bits"
import { Sheet } from "@/components/common/sheet"
import { SmartImage } from "@/components/common/smart-image"
import { Button } from "@/components/ui/button"
import { getProductById } from "@/data/products"
import { discountPercent } from "@/lib/format"
import { cn } from "@/lib/utils"
import { useUi } from "@/store"
import type { Product } from "@/types"

import { PriceTag, useProductActions } from "./product-card"

export function QuantityStepper({
  value,
  onChange,
  label,
}: {
  value: number
  onChange: (value: number) => void
  label: string
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex h-11 items-center rounded-sm border"
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
        className="flex size-11 items-center justify-center hover:bg-surface disabled:opacity-40"
      >
        <Minus className="size-3.5" aria-hidden />
      </button>
      <span aria-live="polite" className="w-8 text-center text-sm">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={value >= 10}
        onClick={() => onChange(value + 1)}
        className="flex size-11 items-center justify-center hover:bg-surface disabled:opacity-40"
      >
        <Plus className="size-3.5" aria-hidden />
      </button>
    </div>
  )
}

/** Title, price and option selectors shared by the product page and Quick View. */
export function PurchasePanel({
  product,
  headingLevel = "h1",
  onNavigate,
}: {
  product: Product
  headingLevel?: "h1" | "h2"
  onNavigate?: () => void
}) {
  const [size, setSize] = useState(product.sizes[0])
  const [color, setColor] = useState(product.colors[0].name)
  const [quantity, setQuantity] = useState(1)
  const { wished, toggleWish, addToBag } = useProductActions(product)
  const router = useRouter()
  const discount = discountPercent(product.price, product.originalPrice)
  const Heading = headingLevel

  return (
    <div>
      <Heading className="font-heading text-3xl leading-tight lg:text-4xl">
        {product.name}
      </Heading>
      <Rating
        value={product.rating}
        count={product.reviewCount}
        className="mt-3 text-sm"
      />
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <PriceTag product={product} large />
        {discount > 0 && (
          <span className="rounded-sm bg-gold px-2 py-0.5 text-xs font-semibold text-[#171717]">
            Save {discount}%
          </span>
        )}
      </div>

      <fieldset className="mt-6">
        <legend className="mb-2 text-sm">
          Colour: <span className="text-muted-foreground">{color}</span>
        </legend>
        <div className="flex flex-wrap gap-1">
          {product.colors.map((option) => (
            <button
              key={option.name}
              type="button"
              aria-label={option.name}
              aria-pressed={color === option.name}
              onClick={() => setColor(option.name)}
              className={cn(
                "flex size-11 items-center justify-center rounded-full border-2 transition-colors",
                color === option.name
                  ? "border-foreground"
                  : "border-transparent hover:border-input"
              )}
            >
              <span
                className="size-7 rounded-full ring-1 ring-black/15 dark:ring-white/25"
                style={{ backgroundColor: option.hex }}
              />
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="mb-2 text-sm">
          Size: <span className="text-muted-foreground">{size}</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={size === option}
              onClick={() => setSize(option)}
              className={cn(
                "min-h-11 min-w-11 rounded-sm border px-3 text-sm transition-colors",
                size === option
                  ? "border-foreground bg-foreground text-background"
                  : "hover:border-foreground"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 flex items-center gap-3">
        <QuantityStepper
          value={quantity}
          onChange={setQuantity}
          label="Quantity"
        />
        <button
          type="button"
          onClick={toggleWish}
          aria-pressed={wished}
          className="flex h-11 items-center gap-2 rounded-sm border px-4 text-sm transition-colors hover:border-foreground"
        >
          <Heart
            className={cn("size-4", wished && "fill-[#A8232B] text-[#A8232B]")}
            aria-hidden
          />
          {wished ? "Saved" : "Save"}
        </button>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <Button
          size="cta"
          disabled={!product.inStock}
          onClick={() => addToBag(size, color, quantity)}
        >
          <ShoppingBag className="size-4" aria-hidden />
          {product.inStock ? "Add to Cart" : "Sold Out"}
        </Button>
        <Button
          size="cta"
          variant="gold"
          disabled={!product.inStock}
          onClick={() => {
            addToBag(size, color, quantity)
            onNavigate?.()
            router.push("/checkout")
          }}
        >
          Buy Now
        </Button>
      </div>
    </div>
  )
}

export function QuickView() {
  const id = useUi((state) => state.quickViewId)
  const setQuickView = useUi((state) => state.setQuickView)
  const product = id ? getProductById(id) : undefined
  const close = () => setQuickView(null)

  return (
    <Sheet
      open={!!product}
      onOpenChange={(open) => !open && close()}
      side="center"
      title={product ? `Quick view: ${product.name}` : "Quick view"}
      hideTitle
    >
      {product && (
        <div className="grid gap-6 px-5 pb-6 md:grid-cols-2 md:gap-8 md:px-8 md:pb-8">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm max-md:max-h-[42dvh] max-md:w-full">
            <SmartImage
              src={product.images[0]}
              alt={product.name}
              sizes="(min-width: 768px) 460px, 94vw"
            />
          </div>
          <div>
            {/* Keyed so selections reset when another product is opened. */}
            <PurchasePanel
              key={product.id}
              product={product}
              headingLevel="h2"
              onNavigate={close}
            />
            <Link
              href={`/product/${product.slug}`}
              onClick={close}
              className="mt-5 inline-block border-b border-foreground pb-0.5 text-sm hover:border-gold-ink hover:text-gold-ink"
            >
              View full details
            </Link>
          </div>
        </div>
      )}
    </Sheet>
  )
}
