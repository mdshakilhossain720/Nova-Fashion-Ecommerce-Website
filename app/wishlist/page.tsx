"use client"

import { Heart } from "lucide-react"

import { EmptyState, PageHeader } from "@/components/common/bits"
import { ProductGrid } from "@/components/product/product-card"
import { getProductById } from "@/data/products"
import { useUi, useWishlist } from "@/store"
import type { Product } from "@/types"

export default function WishlistPage() {
  const ids = useWishlist((state) => state.ids)
  const hydrated = useUi((state) => state.hydrated)
  const saved = ids
    .map((id) => getProductById(id))
    .filter((product): product is Product => !!product)

  return (
    <>
      <PageHeader
        title="Wishlist"
        description="The pieces you're keeping an eye on."
        crumbs={[{ label: "Wishlist" }]}
      />
      <div className="page-gutter py-8 lg:py-12">
        {!hydrated ? (
          <div className="h-64 animate-pulse rounded-sm bg-surface" />
        ) : saved.length ? (
          <ProductGrid products={saved} />
        ) : (
          <EmptyState
            icon={Heart}
            title="Your wishlist is empty"
            body="Tap the heart on any product to save it here for later."
            action={{ label: "Discover Products", href: "/shop" }}
          />
        )}
      </div>
    </>
  )
}
