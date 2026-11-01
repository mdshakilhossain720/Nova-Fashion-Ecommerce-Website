import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { RotateCcw, Truck, Wallet } from "lucide-react"

import { Breadcrumbs, SectionHeading, Stars } from "@/components/common/bits"
import { ProductGrid } from "@/components/product/product-card"
import { ProductGallery } from "@/components/product/product-gallery"
import { PurchasePanel } from "@/components/product/product-purchase"
import { getCategory } from "@/data/categories"
import { reviews } from "@/data/content"
import { getProduct, products, relatedProducts } from "@/data/products"
import { formatDate } from "@/lib/format"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return { title: getProduct(slug)?.name ?? "Product" }
}

const delivery = [
  {
    icon: Truck,
    title: "Delivery across Bangladesh",
    text: "Inside Dhaka 1–2 days (৳80). Outside Dhaka 3–5 days (৳130). Free standard delivery over ৳2,000.",
  },
  {
    icon: Wallet,
    title: "Cash on delivery",
    text: "Pay when your order arrives, nationwide.",
  },
  {
    icon: RotateCcw,
    title: "7-day exchange",
    text: "Unworn items with tags can be exchanged within 7 days.",
  },
]

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()
  const category = getCategory(product.category)

  return (
    <div className="page-gutter py-6 lg:py-10">
      <Breadcrumbs
        items={[
          { label: "Shop All", href: "/shop" },
          { label: category!.name, href: `/category/${category!.slug}` },
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
        <ProductGallery images={product.images} name={product.name} />
        <div className="lg:sticky lg:top-24 lg:self-start">
          <PurchasePanel product={product} />
          <ul className="mt-8 space-y-4 border-t pt-6">
            {delivery.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-3">
                <Icon className="mt-0.5 size-5 shrink-0 text-gold-ink" aria-hidden />
                <span>
                  <span className="block text-sm font-medium">{title}</span>
                  <span className="block text-sm text-muted-foreground">
                    {text}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section className="mt-14 grid gap-10 border-t pt-10 lg:mt-20 lg:grid-cols-2 lg:gap-14">
        <div>
          <h2 className="font-heading text-2xl lg:text-3xl">Description</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {product.description}
          </p>
          <ul className="mt-4 list-inside list-disc space-y-1 text-sm text-muted-foreground">
            {product.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-heading text-2xl lg:text-3xl">Specifications</h2>
          <dl className="mt-4 divide-y border-y text-sm">
            {Object.entries(product.specs).map(([label, value]) => (
              <div key={label} className="flex justify-between gap-6 py-3">
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="text-right">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mt-14 lg:mt-20" aria-label="Customer reviews">
        <SectionHeading
          eyebrow={`${product.rating.toFixed(1)} from ${product.reviewCount} reviews`}
          title="Customer Reviews"
        />
        <ul className="grid gap-4 md:grid-cols-3 lg:gap-5">
          {reviews.map((review) => (
            <li key={review.id} className="rounded-sm bg-surface p-6">
              <Stars value={review.rating} />
              <h3 className="mt-3 font-medium">{review.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{review.body}</p>
              <p className="mt-4 text-xs text-muted-foreground">
                {review.name} · {formatDate(review.date)}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 lg:mt-20" aria-label="Related products">
        <SectionHeading eyebrow="Complete the look" title="You May Also Like" />
        <ProductGrid products={relatedProducts(product)} />
      </section>
    </div>
  )
}
