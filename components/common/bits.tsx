import type { ReactNode } from "react"
import Link from "next/link"
import { ChevronRight, Star, type LucideIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Rating({
  value,
  count,
  className,
}: {
  value: number
  count?: number
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs text-muted-foreground",
        className
      )}
    >
      <Star className="size-3.5 fill-gold text-gold" aria-hidden />
      <span className="sr-only">Rated</span>
      <span className="font-medium text-foreground">{value.toFixed(1)}</span>
      <span className="sr-only">out of 5</span>
      {count !== undefined && (
        <span>
          ({count}
          <span className="sr-only"> reviews</span>)
        </span>
      )}
    </span>
  )
}

export function Stars({ value }: { value: number }) {
  return (
    <span
      className="flex gap-0.5"
      role="img"
      aria-label={`${value} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          aria-hidden
          className={cn(
            "size-3.5 text-gold",
            n <= Math.round(value) && "fill-gold"
          )}
        />
      ))}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string
  title: string
  description?: string
  action?: { label: string; href: string }
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-3 lg:mb-12">
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="font-heading text-3xl leading-tight sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-muted-foreground">{description}</p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="border-b border-foreground pb-1 text-xs tracking-[0.16em] uppercase transition-colors hover:border-gold-ink hover:text-gold-ink"
        >
          {action.label}
        </Link>
      )}
    </div>
  )
}

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[]
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1">
            <ChevronRight className="size-3" aria-hidden />
            {item.href ? (
              <Link href={item.href} className="hover:text-foreground">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function EmptyState({
  icon: Icon,
  title,
  body,
  action,
  children,
}: {
  icon: LucideIcon
  title: string
  body: string
  action?: { label: string; href: string }
  children?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center px-4 py-16 text-center lg:py-24">
      <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-surface">
        <Icon className="size-6 text-gold-ink" aria-hidden />
      </div>
      <h2 className="font-heading text-2xl lg:text-3xl">{title}</h2>
      <p className="mt-2 max-w-md text-muted-foreground">{body}</p>
      {action && (
        <Link
          href={action.href}
          className={cn(buttonVariants({ size: "cta" }), "mt-7")}
        >
          {action.label}
        </Link>
      )}
      {children}
    </div>
  )
}

export function PageHeader({
  title,
  description,
  crumbs,
  eyebrow,
}: {
  title: string
  description?: string
  crumbs: { label: string; href?: string }[]
  eyebrow?: string
}) {
  return (
    <header className="bg-surface">
      <div className="page-gutter py-8 lg:py-14">
        <Breadcrumbs items={crumbs} />
        {eyebrow && <p className="eyebrow mt-6">{eyebrow}</p>}
        <h1 className="mt-4 font-heading text-4xl leading-tight lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-2xl text-muted-foreground lg:text-lg">
            {description}
          </p>
        )}
      </div>
    </header>
  )
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-destructive">
      {message}
    </p>
  )
}
