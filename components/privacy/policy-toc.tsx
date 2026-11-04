"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

/** Sticky contents list that highlights the section currently in view. */
export function PolicyToc({
  items,
}: {
  items: { id: string; title: string }[]
}) {
  const [active, setActive] = useState(items[0]?.id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActive(visible.target.id)
      },
      // A band near the top of the viewport decides which section is current.
      { rootMargin: "-20% 0px -70% 0px" }
    )
    items.forEach(({ id }) => {
      const node = document.getElementById(id)
      if (node) observer.observe(node)
    })
    return () => observer.disconnect()
  }, [items])

  return (
    <nav aria-labelledby="toc-title">
      <p id="toc-title" className="eyebrow mb-4">
        On this page
      </p>
      <ol className="space-y-0.5 border-l">
        {items.map(({ id, title }, index) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              className={cn(
                "-ml-px flex gap-3 border-l-2 py-2 pl-4 text-sm transition-colors",
                active === id
                  ? "border-gold-ink text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="text-gold-ink tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              {title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
