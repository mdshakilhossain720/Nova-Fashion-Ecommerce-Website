"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, SearchX } from "lucide-react"

import { Breadcrumbs, EmptyState } from "@/components/common/bits"
import { ProductGrid } from "@/components/product/product-card"
import { Button } from "@/components/ui/button"
import { products } from "@/data/products"

function SearchResults() {
  const params = useSearchParams()
  const router = useRouter()
  const query = params.get("q")?.trim() ?? ""
  const [draft, setDraft] = useState(query)
  const term = query.toLowerCase()
  const results = term
    ? products.filter((product) =>
        `${product.name} ${product.category} ${product.description}`
          .toLowerCase()
          .includes(term)
      )
    : []

  return (
    <div className="page-gutter py-6 lg:py-10">
      <Breadcrumbs items={[{ label: "Search" }]} />
      <h1 className="mt-5 font-heading text-4xl lg:text-5xl">
        {query ? `Results for “${query}”` : "Search"}
      </h1>
      <form
        role="search"
        className="mt-5 flex max-w-xl gap-2"
        onSubmit={(event) => {
          event.preventDefault()
          router.push(`/search?q=${encodeURIComponent(draft.trim())}`)
        }}
      >
        <label htmlFor="search-page" className="sr-only">
          Search products
        </label>
        <input
          id="search-page"
          type="search"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Search sarees, attar, shirts…"
          className="field"
        />
        <Button type="submit" size="cta" aria-label="Search">
          <Search className="size-4" aria-hidden />
        </Button>
      </form>

      {query && (
        <p aria-live="polite" className="mt-6 mb-6 text-sm text-muted-foreground">
          {results.length} {results.length === 1 ? "product" : "products"} found
        </p>
      )}

      {results.length > 0 ? (
        <ProductGrid products={results} />
      ) : (
        <EmptyState
          icon={SearchX}
          title={query ? "No matching products" : "What are you looking for?"}
          body={
            query
              ? "Check the spelling, or try a broader word such as saree, shirt or attar."
              : "Search the full collection by product name or category."
          }
          action={{ label: "Browse All Products", href: "/shop" }}
        />
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="page-gutter py-24" />}>
      <SearchResults />
    </Suspense>
  )
}
