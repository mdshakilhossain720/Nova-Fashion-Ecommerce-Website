import Link from "next/link"

import { SmartImage } from "@/components/common/smart-image"
import { formatDate } from "@/lib/format"
import type { BlogPost } from "@/types"

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article>
      <Link href={`/blog/${post.slug}`} className="group block">
        <span className="relative block aspect-[4/3] overflow-hidden rounded-sm">
          <SmartImage
            src={post.image}
            alt=""
            sizes="(min-width: 768px) 33vw, 100vw"
            className="transition-transform duration-700 group-hover:scale-105"
          />
        </span>
        <span className="eyebrow mt-4 block">{post.category}</span>
        <span className="mt-2 block font-heading text-2xl leading-snug group-hover:text-gold-ink">
          {post.title}
        </span>
      </Link>
      <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
      <p className="mt-3 text-xs text-muted-foreground">
        {formatDate(post.date)} · {post.readMinutes} min read
      </p>
    </article>
  )
}
