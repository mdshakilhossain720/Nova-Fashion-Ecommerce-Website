import type { Metadata } from "next"

import { PageHeader } from "@/components/common/bits"
import { ProductListing } from "@/components/product/product-listing"
import { products } from "@/data/products"

export const metadata: Metadata = { title: "Shop All" }

export default function ShopPage() {
  return (
    <>
      <PageHeader
        title="Shop All"
        description="The full NOVA collection, from everyday essentials to heritage weaves and fine fragrance."
        crumbs={[{ label: "Shop All" }]}
      />
      <ProductListing products={products} />
    </>
  )
}
