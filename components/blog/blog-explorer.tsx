"use client"

import { useState } from "react"
import { Search, SearchX } from "lucide-react"

import { EmptyState } from "@/components/common/bits"
import { BlogCard } from "@/components/home/blog-card"
import { Button } from "@/components/ui/button"
import { blogCategories } from "@/data/blog"
import { cn } from "@/lib/utils"
import type { BlogPost } from "@/types"

/** Category filters, search and the article grid for the journal page. */
export function BlogExplorer({ posts }: { posts: BlogPost[] }) {
  const [category, setCategory] = useState("All")
  const [query, setQuery] = useState("")
  const term = query.trim().toLowerCase()

  const results = posts.filter(
    (post) =>
      (category === "All" || post.category === category) &&
      `${post.title} ${post.excerpt} ${post.author} ${post.category}`
        .toLowerCase()
        .includes(term)
  )

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 border-b pb-6 lg:mb-12 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="group"
          aria-label="Filter by category"
          className="-mx-4 no-scrollbar flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {blogCategories.map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={category === name}
              onClick={() => setCategory(name)}
              className={cn(
                "h-10 shrink-0 rounded-full border px-5 text-xs tracking-[0.14em] uppercase transition-colors",
                category === name
                  ? "border-foreground bg-foreground text-background"
                  : "hover:border-foreground"
              )}
            >
              {name}
            </button>
          ))}
        </div>
        <form
          role="search"
          className="relative w-full lg:max-w-xs"
          onSubmit={(event) => event.preventDefault()}
        >
          <label htmlFor="blog-search" className="sr-only">
            Search articles
          </label>
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            id="blog-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles…"
            className="field pl-10"
          />
        </form>
      </div>

      <p aria-live="polite" className="sr-only">
        {results.length} {results.length === 1 ? "article" : "articles"} found
      </p>

      {results.length > 0 ? (
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          {results.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={SearchX}
          title="No matching articles"
          body="Try another word, or browse every story in the journal."
        >
          <Button
            size="cta"
            variant="outline"
            className="mt-7"
            onClick={() => {
              setQuery("")
              setCategory("All")
            }}
          >
            Clear Filters
          </Button>
        </EmptyState>
      )}
    </>
  )
}
