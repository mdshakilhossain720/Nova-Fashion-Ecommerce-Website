"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { SearchX, SlidersHorizontal } from "lucide-react"

import { EmptyState } from "@/components/common/bits"
import { Sheet } from "@/components/common/sheet"
import { Button } from "@/components/ui/button"
import { categories } from "@/data/categories"
import { PRICE_CEILING, allColors } from "@/data/products"
import { formatPrice } from "@/lib/format"
import { cn } from "@/lib/utils"
import { useFilters, type FilterValues, type SortKey } from "@/store"
import type { Product } from "@/types"

import { ProductGrid } from "./product-card"

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
]

function applyFilters(products: Product[], filters: FilterValues) {
  const result = products.filter(
    (product) =>
      product.price >= filters.minPrice &&
      product.price <= filters.maxPrice &&
      product.rating >= filters.minRating &&
      (!filters.inStockOnly || product.inStock) &&
      (!filters.onSaleOnly || !!product.originalPrice) &&
      (!filters.sizes.length ||
        product.sizes.some((size) => filters.sizes.includes(size))) &&
      (!filters.colors.length ||
        product.colors.some((color) => filters.colors.includes(color.name)))
  )
  switch (filters.sort) {
    case "price-asc":
      return result.sort((a, b) => a.price - b.price)
    case "price-desc":
      return result.sort((a, b) => b.price - a.price)
    case "rating":
      return result.sort((a, b) => b.rating - a.rating)
    case "newest":
      return result.sort(
        (a, b) => +b.tags.includes("new") - +a.tags.includes("new")
      )
    default:
      return result
  }
}

function activeFilterCount(filters: FilterValues) {
  return (
    filters.sizes.length +
    filters.colors.length +
    (filters.minPrice > 0 || filters.maxPrice < PRICE_CEILING ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.onSaleOnly ? 1 : 0)
  )
}

function FilterGroup({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <fieldset className="border-b py-5 first:pt-0">
      <legend className="float-left mb-3 w-full text-xs tracking-[0.16em] uppercase">
        {title}
      </legend>
      <div className="clear-both">{children}</div>
    </fieldset>
  )
}

function FilterPanel({ sizes, idPrefix }: { sizes: string[]; idPrefix: string }) {
  const filters = useFilters()

  return (
    <div>
      <FilterGroup title="Price">
        <div className="space-y-3 text-sm">
          <label htmlFor={`${idPrefix}-min`} className="block">
            <span className="mb-1 flex justify-between text-muted-foreground">
              Minimum <span>{formatPrice(filters.minPrice)}</span>
            </span>
            <input
              id={`${idPrefix}-min`}
              type="range"
              min={0}
              max={PRICE_CEILING}
              step={100}
              value={filters.minPrice}
              onChange={(event) =>
                filters.patch({
                  minPrice: Math.min(+event.target.value, filters.maxPrice),
                })
              }
              className="w-full"
            />
          </label>
          <label htmlFor={`${idPrefix}-max`} className="block">
            <span className="mb-1 flex justify-between text-muted-foreground">
              Maximum <span>{formatPrice(filters.maxPrice)}</span>
            </span>
            <input
              id={`${idPrefix}-max`}
              type="range"
              min={0}
              max={PRICE_CEILING}
              step={100}
              value={filters.maxPrice}
              onChange={(event) =>
                filters.patch({
                  maxPrice: Math.max(+event.target.value, filters.minPrice),
                })
              }
              className="w-full"
            />
          </label>
        </div>
      </FilterGroup>

      <FilterGroup title="Size">
        <div className="flex flex-wrap gap-1.5">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              aria-pressed={filters.sizes.includes(size)}
              onClick={() => filters.toggleIn("sizes", size)}
              className={cn(
                "min-h-10 min-w-10 rounded-sm border px-2.5 text-xs transition-colors",
                filters.sizes.includes(size)
                  ? "border-foreground bg-foreground text-background"
                  : "hover:border-foreground"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Colour">
        <div className="flex flex-wrap gap-1">
          {allColors.map((color) => (
            <button
              key={color.name}
              type="button"
              aria-label={color.name}
              title={color.name}
              aria-pressed={filters.colors.includes(color.name)}
              onClick={() => filters.toggleIn("colors", color.name)}
              className={cn(
                "flex size-10 items-center justify-center rounded-full border-2",
                filters.colors.includes(color.name)
                  ? "border-foreground"
                  : "border-transparent hover:border-input"
              )}
            >
              <span
                className="size-6 rounded-full ring-1 ring-black/15 dark:ring-white/25"
                style={{ backgroundColor: color.hex }}
              />
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Rating">
        <div className="space-y-1 text-sm">
          {[0, 4, 4.5, 4.8].map((rating) => (
            <label key={rating} className="flex min-h-9 items-center gap-2.5">
              <input
                type="radio"
                name={`${idPrefix}-rating`}
                checked={filters.minRating === rating}
                onChange={() => filters.patch({ minRating: rating })}
                className="size-4 accent-[var(--gold-ink)]"
              />
              {rating === 0 ? "Any rating" : `${rating} and up`}
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Availability">
        <div className="space-y-1 text-sm">
          <label className="flex min-h-9 items-center gap-2.5">
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(event) =>
                filters.patch({ inStockOnly: event.target.checked })
              }
              className="size-4 accent-[var(--gold-ink)]"
            />
            In stock only
          </label>
          <label className="flex min-h-9 items-center gap-2.5">
            <input
              type="checkbox"
              checked={filters.onSaleOnly}
              onChange={(event) =>
                filters.patch({ onSaleOnly: event.target.checked })
              }
              className="size-4 accent-[var(--gold-ink)]"
            />
            On sale only
          </label>
        </div>
      </FilterGroup>
    </div>
  )
}

export function ProductListing({
  products,
  activeCategory,
}: {
  products: Product[]
  activeCategory?: string
}) {
  const filters = useFilters()
  const [sheetOpen, setSheetOpen] = useState(false)
  const { reset, patch } = filters

  // Filters are global state, so start fresh on each listing.
  useEffect(() => {
    reset()
    patch({ sort: "featured" })
  }, [activeCategory, reset, patch])

  const results = useMemo(
    () => applyFilters(products, filters),
    [products, filters]
  )
  const sizes = useMemo(
    () => [...new Set(products.flatMap((product) => product.sizes))],
    [products]
  )
  const active = activeFilterCount(filters)
  const shown = results.slice(0, filters.visible)

  const clear = (
    <button
      type="button"
      onClick={reset}
      className="text-sm underline underline-offset-4 hover:text-gold-ink"
    >
      Clear filters
    </button>
  )

  return (
    <div className="page-gutter py-6 lg:py-10">
      <nav aria-label="Categories" className="no-scrollbar -mx-4 mb-6 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <ul className="flex w-max gap-2 lg:w-auto lg:flex-wrap">
          <li>
            <CategoryChip href="/shop" active={!activeCategory} label="All" />
          </li>
          {categories.map((category) => (
            <li key={category.slug}>
              <CategoryChip
                href={`/category/${category.slug}`}
                active={activeCategory === category.slug}
                label={category.name}
              />
            </li>
          ))}
        </ul>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[250px_1fr] xl:gap-12">
        <aside aria-label="Filters" className="hidden lg:block">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-heading text-xl">Filters</h2>
            {active > 0 && clear}
          </div>
          <FilterPanel sizes={sizes} idPrefix="side" />
        </aside>

        <div className="min-w-0">
          <div className="mb-6 flex items-center justify-between gap-3">
            <p aria-live="polite" className="text-sm text-muted-foreground">
              {results.length} {results.length === 1 ? "product" : "products"}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="h-11 px-3 lg:hidden"
                onClick={() => setSheetOpen(true)}
              >
                <SlidersHorizontal className="size-4" aria-hidden />
                Filters{active > 0 && ` (${active})`}
              </Button>
              <label htmlFor="sort" className="sr-only">
                Sort by
              </label>
              <select
                id="sort"
                value={filters.sort}
                onChange={(event) =>
                  filters.patch({ sort: event.target.value as SortKey })
                }
                className="h-11 max-w-40 rounded-sm border border-input bg-background px-2 text-sm sm:max-w-none"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {results.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title="Nothing matches those filters"
              body="Try widening the price range or removing a filter or two."
            >
              <Button size="cta" className="mt-7" onClick={reset}>
                Clear Filters
              </Button>
            </EmptyState>
          ) : (
            <>
              <div className="[&>div]:lg:grid-cols-3 2xl:[&>div]:grid-cols-4">
                <ProductGrid products={shown} />
              </div>
              {shown.length < results.length && (
                <div className="mt-12 flex flex-col items-center gap-3">
                  <p className="text-sm text-muted-foreground">
                    Showing {shown.length} of {results.length}
                  </p>
                  <Button
                    variant="outline"
                    size="cta"
                    onClick={filters.showMore}
                  >
                    Load More
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Sheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        side="bottom"
        title="Filters"
      >
        <div className="px-5 pt-5">
          <FilterPanel sizes={sizes} idPrefix="sheet" />
        </div>
        <div className="sticky bottom-0 flex items-center gap-4 border-t bg-background px-5 py-3">
          {clear}
          <Button
            size="cta"
            className="flex-1"
            onClick={() => setSheetOpen(false)}
          >
            Show {results.length} results
          </Button>
        </div>
      </Sheet>
    </div>
  )
}

function CategoryChip({
  href,
  active,
  label,
}: {
  href: string
  active: boolean
  label: string
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex min-h-10 items-center rounded-full border px-4 text-sm whitespace-nowrap transition-colors",
        active
          ? "border-foreground bg-foreground text-background"
          : "hover:border-foreground"
      )}
    >
      {label}
    </Link>
  )
}
