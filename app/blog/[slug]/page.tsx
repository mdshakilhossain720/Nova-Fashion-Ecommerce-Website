import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Breadcrumbs, SectionHeading } from "@/components/common/bits"
import { SmartImage } from "@/components/common/smart-image"
import { BlogCard } from "@/components/home/blog-card"
import { blogPosts, getPost } from "@/data/blog"
import { formatDate } from "@/lib/format"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  return { title: post?.title ?? "Article", description: post?.excerpt }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const related = [
    ...blogPosts.filter((p) => p !== post && p.category === post.category),
    ...blogPosts.filter((p) => p !== post && p.category !== post.category),
  ].slice(0, 3)

  return (
    <>
      <article>
        <header className="page-gutter pt-6 lg:pt-10">
          <Breadcrumbs
            items={[{ label: "Blog", href: "/blog" }, { label: post.title }]}
          />
          <div className="mx-auto mt-8 max-w-3xl text-center lg:mt-14">
            <p className="eyebrow">{post.category}</p>
            <h1 className="mt-4 font-heading text-4xl leading-tight sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            <p className="mt-5 text-sm text-muted-foreground">
              By <span className="text-foreground">{post.author}</span> ·{" "}
              <time dateTime={post.date}>{formatDate(post.date)}</time> ·{" "}
              {post.readMinutes} min read
            </p>
          </div>
          <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-sm sm:aspect-[16/9] lg:mt-14 lg:aspect-[21/9]">
            <SmartImage src={post.image} alt="" priority sizes="100vw" />
          </div>
        </header>

        <div className="page-gutter py-12 lg:py-20">
          <div className="mx-auto max-w-2xl">
            <p className="font-heading text-2xl leading-relaxed lg:text-3xl">
              {post.excerpt}
            </p>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
              {post.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <Link
              href="/blog"
              className="mt-12 inline-flex items-center gap-2 border-b border-foreground pb-1 text-xs tracking-[0.16em] uppercase transition-colors hover:border-gold-ink hover:text-gold-ink"
            >
              <ArrowLeft className="size-3.5" aria-hidden />
              Back to the Journal
            </Link>
          </div>
        </div>
      </article>

      <section aria-label="More articles" className="bg-surface py-14 lg:py-24">
        <div className="page-gutter">
          <SectionHeading
            eyebrow="Keep reading"
            title="You May Also Like"
            action={{ label: "All Articles", href: "/blog" }}
          />
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {related.map((item) => (
              <BlogCard key={item.slug} post={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
