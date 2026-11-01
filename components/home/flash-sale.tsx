"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { ProductCarousel } from "@/components/product/product-carousel"
import { byTag } from "@/data/products"

// Demo countdown: starts from a fixed value and loops, with no real sale behind it.
const DEMO_SECONDS = 8 * 3600 + 24 * 60 + 36

export function FlashSale() {
  const [seconds, setSeconds] = useState(DEMO_SECONDS)

  useEffect(() => {
    const timer = setInterval(
      () => setSeconds((current) => (current > 0 ? current - 1 : DEMO_SECONDS)),
      1000
    )
    return () => clearInterval(timer)
  }, [])

  const units = [
    { label: "Hours", value: Math.floor(seconds / 3600) },
    { label: "Minutes", value: Math.floor((seconds % 3600) / 60) },
    { label: "Seconds", value: seconds % 60 },
  ]

  return (
    <section aria-labelledby="flash-title" className="bg-surface py-14 lg:py-20">
      <div className="page-gutter">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5 lg:mb-12">
          <div>
            <p className="eyebrow mb-3">Limited time</p>
            <h2 id="flash-title" className="font-heading text-3xl sm:text-4xl lg:text-5xl">
              Flash Sale
            </h2>
          </div>
          <div className="flex items-center gap-5">
            <div role="timer" aria-label="Demo countdown" className="flex gap-2">
              {units.map((unit) => (
                <div
                  key={unit.label}
                  className="flex w-14 flex-col items-center rounded-sm bg-background py-2 shadow-sm sm:w-16"
                >
                  <span className="font-heading text-xl tabular-nums sm:text-2xl">
                    {String(unit.value).padStart(2, "0")}
                  </span>
                  <span className="text-[0.5625rem] tracking-widest text-muted-foreground uppercase">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
            <Link
              href="/shop"
              className="hidden border-b border-foreground pb-1 text-xs tracking-[0.16em] uppercase hover:border-gold-ink hover:text-gold-ink sm:block"
            >
              View all
            </Link>
          </div>
        </div>
        <ProductCarousel products={byTag("flash")} label="Flash sale products" />
      </div>
    </section>
  )
}
