import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { BlogExplorer } from "@/components/blog/blog-explorer"
import { Breadcrumbs } from "@/components/common/bits"
import { SmartImage } from "@/components/common/smart-image"
import { buttonVariants } from "@/components/ui/button"
import { blogPosts } from "@/data/blog"
import { formatDate } from "@/lib/format"

export const metadata: Metadata = {
  title: "Blog & Style Journal",
  description:
    "Style guides, fragrance notes, care tips and stories from the NOVA studio.",
}

export default function BlogPage() {
  const featured = blogPosts.find((post) => post.featured) ?? blogPosts[0]
  const rest = blogPosts.filter((post) => post !== featured)

  return (
    <>
      <header className="bg-surface">
        <div className="page-gutter py-8 lg:py-14">
          <Breadcrumbs items={[{ label: "Blog" }]} />
          <p className="eyebrow mt-6">The NOVA Journal</p>
          <h1 className="mt-4 font-heading text-4xl leading-tight lg:text-6xl">
            Stories, Style &amp; Care
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground lg:text-lg">
            Styling ideas, fragrance notes and practical guides from the people
            who design and make our collection.
          </p>
        </div>
      </header>

      <section aria-labelledby="featured-title" className="py-10 lg:py-16">
        <div className="page-gutter">
          <article className="group grid overflow-hidden rounded-sm bg-surface lg:grid-cols-[1.35fr_1fr]">
            <Link
              href={`/blog/${featured.slug}`}
              tabIndex={-1}
              aria-hidden
              className="relative block aspect-[4/3] overflow-hidden sm:aspect-[16/9] lg:aspect-auto lg:min-h-[480px]"
            >
              <SmartImage
                src={featured.image}
                alt=""
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute top-4 left-4 rounded-sm bg-gold px-3 py-1.5 text-[0.625rem] font-medium tracking-[0.18em] text-[#171717] uppercase">
                Featured
              </span>
            </Link>
            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
              <p className="eyebrow">{featured.category}</p>
              <h2
                id="featured-title"
                className="mt-3 font-heading text-3xl leading-tight sm:text-4xl lg:text-5xl"
              >
                <Link
                  href={`/blog/${featured.slug}`}
                  className="transition-colors hover:text-gold-ink"
                >
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground lg:text-lg">
                {featured.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-3 text-sm">
                <span
                  aria-hidden
                  className="flex size-10 items-center justify-center rounded-full bg-gold/20 font-heading text-gold-ink"
                >
                  {featured.author.charAt(0)}
                </span>
                <span>
                  <span className="block font-medium">{featured.author}</span>
                  <span className="block text-xs text-muted-foreground">
                    <time dateTime={featured.date}>
                      {formatDate(featured.date)}
                    </time>{" "}
                    · {featured.readMinutes} min read
                  </span>
                </span>
              </div>
              <Link
                href={`/blog/${featured.slug}`}
                className={buttonVariants({
                  size: "cta",
                  className: "mt-8 self-start",
                })}
              >
                Read More
                <span className="sr-only">: {featured.title}</span>
                <ArrowRight aria-hidden />
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section aria-labelledby="latest-title" className="pb-14 lg:pb-28">
        <div className="page-gutter">
          <div className="mb-6 lg:mb-8">
            <p className="eyebrow mb-3">Fresh from the studio</p>
            <h2
              id="latest-title"
              className="font-heading text-3xl leading-tight sm:text-4xl lg:text-5xl"
            >
              Latest Articles
            </h2>
          </div>
          <BlogExplorer posts={rest} />
        </div>
      </section>
    </>
  )
}
