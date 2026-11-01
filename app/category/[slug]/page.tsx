import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { PageHeader } from "@/components/common/bits"
import { ProductListing } from "@/components/product/product-listing"
import { categories, getCategory } from "@/data/categories"
import { inCategory } from "@/data/products"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return categories.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return { title: getCategory(slug)?.name ?? "Category" }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) notFound()

  return (
    <>
      <PageHeader
        title={category.name}
        description={category.description}
        crumbs={[{ label: "Shop All", href: "/shop" }, { label: category.name }]}
      />
      <ProductListing products={inCategory(slug)} activeCategory={slug} />
    </>
  )
}
