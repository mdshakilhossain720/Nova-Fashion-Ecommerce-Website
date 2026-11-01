import Link from "next/link"
import { RotateCcw, ShieldCheck, Sparkles, Truck } from "lucide-react"

import { SectionHeading, Stars } from "@/components/common/bits"
import { SmartImage } from "@/components/common/smart-image"
import { BlogCard } from "@/components/home/blog-card"
import { FlashSale } from "@/components/home/flash-sale"
import { HeroSlider } from "@/components/home/hero-slider"
import { NewsletterForm } from "@/components/layout/newsletter"
import { ProductGrid } from "@/components/product/product-card"
import { ProductCarousel } from "@/components/product/product-carousel"
import { buttonVariants } from "@/components/ui/button"
import { blogPosts } from "@/data/blog"
import { categories } from "@/data/categories"
import { collections, promotions, testimonials } from "@/data/content"
import { byTag } from "@/data/products"
import { cn } from "@/lib/utils"

const promises = [
  { icon: Truck, title: "Free Shipping", text: "On orders over ৳2,000" },
  { icon: RotateCcw, title: "Easy Exchange", text: "Within 7 days" },
  { icon: ShieldCheck, title: "Cash on Delivery", text: "Across Bangladesh" },
  { icon: Sparkles, title: "Quality Checked", text: "Before every dispatch" },
]

export default function Page() {
  return (
    <>
      <HeroSlider />

      <section aria-label="Our promises" className="border-b">
        <ul className="page-gutter grid grid-cols-2 gap-x-4 gap-y-5 py-6 lg:grid-cols-4 lg:py-8">
          {promises.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-center gap-3">
              <Icon className="size-5 shrink-0 text-gold-ink" aria-hidden />
              <span className="min-w-0">
                <span className="block text-sm font-medium">{title}</span>
                <span className="block text-xs text-muted-foreground">
                  {text}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <FlashSale />

      <section aria-labelledby="categories-title" className="py-14 lg:py-24">
        <div className="page-gutter">
          <div id="categories-title">
            <SectionHeading eyebrow="Explore" title="Shop by Categories" />
          </div>
          <ul className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0">
            {categories.map((category) => (
              <li
                key={category.slug}
                className="w-[58%] shrink-0 snap-start sm:w-[36%] lg:w-auto"
              >
                <Link
                  href={`/category/${category.slug}`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-sm lg:aspect-[3/2]"
                >
                  <SmartImage
                    src={category.image}
                    alt=""
                    sizes="(min-width: 1024px) 33vw, 58vw"
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                  <span className="absolute inset-x-4 bottom-4 font-heading text-2xl text-white lg:inset-x-6 lg:bottom-6 lg:text-3xl">
                    {category.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Popular products" className="pb-14 lg:pb-24">
        <div className="page-gutter">
          <SectionHeading
            eyebrow="Most loved"
            title="Popular Products"
            action={{ label: "Shop all", href: "/shop" }}
          />
          <ProductGrid products={byTag("popular")} />
        </div>
      </section>

      <section aria-label="Seasonal promotions" className="page-gutter">
        <div className="grid gap-4 md:grid-cols-2 lg:gap-5">
          {promotions.map((promo) => (
            <Link
              key={promo.id}
              href={promo.href}
              className="group relative block aspect-[4/3] overflow-hidden rounded-sm text-white"
            >
              <SmartImage
                src={promo.image}
                alt=""
                sizes="(min-width: 768px) 50vw, 100vw"
                className="transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-black/40" />
              <span className="absolute inset-x-6 bottom-6 lg:inset-x-10 lg:bottom-10">
                <span className="mb-2 block text-[0.6875rem] tracking-[0.22em] text-gold uppercase">
                  {promo.eyebrow}
                </span>
                <span className="block font-heading text-3xl leading-tight lg:text-4xl">
                  {promo.title}
                </span>
                <span className="mt-2 block text-sm text-white/85">
                  {promo.caption}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-label="New arrivals" className="py-14 lg:py-24">
        <div className="page-gutter">
          <SectionHeading
            eyebrow="Just in"
            title="New Arrivals"
            action={{ label: "View all", href: "/shop" }}
          />
          <ProductCarousel products={byTag("new")} label="New arrivals" />
        </div>
      </section>

      <section aria-label="Trending collections" className="bg-surface py-14 lg:py-24">
        <div className="page-gutter">
          <SectionHeading eyebrow="The edit" title="Trending Collections" />
          <div className="grid gap-5 md:grid-cols-3">
            {collections.map((collection) => (
              <Link
                key={collection.title}
                href={collection.href}
                className="group block"
              >
                <span className="relative block aspect-[4/5] overflow-hidden rounded-sm">
                  <SmartImage
                    src={collection.image}
                    alt=""
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                </span>
                <span className="mt-4 block font-heading text-2xl group-hover:text-gold-ink">
                  {collection.title}
                </span>
                <span className="text-sm text-muted-foreground">
                  {collection.caption}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Best sellers" className="py-14 lg:py-24">
        <div className="page-gutter">
          <SectionHeading
            eyebrow="Tried and loved"
            title="Best Sellers"
            action={{ label: "View all", href: "/shop" }}
          />
          <ProductGrid products={byTag("best").slice(0, 8)} />
        </div>
      </section>

      <section aria-label="Customer testimonials" className="bg-[#171717] py-14 text-white lg:py-24">
        <div className="page-gutter">
          <p className="eyebrow mb-3 !text-gold">In their words</p>
          <h2 className="mb-10 font-heading text-3xl sm:text-4xl lg:mb-14 lg:text-5xl">
            What Our Customers Say
          </h2>
          <ul className="grid gap-8 md:grid-cols-3 lg:gap-12">
            {testimonials.map((item) => (
              <li key={item.id} className="border-t border-white/20 pt-6">
                <Stars value={item.rating} />
                <blockquote className="mt-4 font-heading text-xl leading-relaxed lg:text-2xl">
                  “{item.quote}”
                </blockquote>
                <p className="mt-5 text-sm text-white/65">
                  {item.name}, {item.city}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Blog and style journal" className="py-14 lg:py-24">
        <div className="page-gutter">
          <SectionHeading
            eyebrow="Read"
            title="Blog & Style Journal"
            action={{ label: "All stories", href: "/blog" }}
          />
          <div className="grid gap-8 md:grid-cols-3 lg:gap-5">
            {blogPosts.slice(0, 3).map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Newsletter" className="bg-surface">
        <div className="page-gutter flex flex-col items-center py-14 text-center lg:py-24">
          <p className="eyebrow mb-3">The NOVA list</p>
          <h2 className="mb-3 font-heading text-3xl sm:text-4xl lg:text-5xl">
            First Looks, Private Offers
          </h2>
          <p className="mb-7 max-w-md text-muted-foreground">
            Join for new collections, style notes and early sale access.
          </p>
          <NewsletterForm />
          <Link
            href="/about"
            className={cn(buttonVariants({ variant: "link" }), "mt-4 text-muted-foreground")}
          >
            About NOVA
          </Link>
        </div>
      </section>
    </>
  )
}
