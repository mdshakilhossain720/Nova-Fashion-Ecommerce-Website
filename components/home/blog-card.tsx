import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { SmartImage } from "@/components/common/smart-image"
import { formatDate } from "@/lib/format"
import type { BlogPost } from "@/types"

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="flex flex-col">
      <Link href={`/blog/${post.slug}`} className="group block">
        <span className="relative block aspect-[4/3] overflow-hidden rounded-sm">
          <SmartImage
            src={post.image}
            alt=""
            sizes="(min-width: 768px) 33vw, 100vw"
            className="transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute top-3 left-3 rounded-sm bg-background/90 px-2.5 py-1 text-[0.625rem] font-medium tracking-[0.18em] uppercase backdrop-blur">
            {post.category}
          </span>
        </span>
        <span className="mt-4 block font-heading text-2xl leading-snug group-hover:text-gold-ink">
          {post.title}
        </span>
      </Link>
      <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
      <p className="mt-3 text-xs text-muted-foreground">
        By <span className="text-foreground">{post.author}</span> ·{" "}
        <time dateTime={post.date}>{formatDate(post.date)}</time> ·{" "}
        {post.readMinutes} min read
      </p>
      <Link
        href={`/blog/${post.slug}`}
        className="group mt-4 inline-flex items-center gap-2 self-start border-b border-foreground pb-1 text-xs tracking-[0.16em] uppercase transition-colors hover:border-gold-ink hover:text-gold-ink"
      >
        Read More
        <span className="sr-only">: {post.title}</span>
        <ArrowRight
          className="size-3.5 transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      </Link>
    </article>
  )
}
