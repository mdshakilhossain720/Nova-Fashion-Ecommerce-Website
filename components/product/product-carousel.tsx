"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import type { Product } from "@/types"

import { ProductCard } from "./product-card"

export function ProductCarousel({
  products,
  label,
}: {
  products: Product[]
  label: string
}) {
  const track = useRef<HTMLDivElement>(null)

  const scroll = (direction: 1 | -1) => {
    const element = track.current
    if (!element) return
    element.scrollBy({
      left: direction * element.clientWidth * 0.8,
      behavior: "smooth",
    })
  }

  return (
    <div className="relative" role="region" aria-label={label}>
      <div
        ref={track}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 sm:-mx-6 sm:scroll-px-6 sm:gap-5 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:px-0"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[46%] shrink-0 snap-start sm:w-[31%] lg:w-[calc(25%-15px)]"
          >
            <ProductCard
              product={product}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 31vw, 46vw"
            />
          </div>
        ))}
      </div>
      {[
        { direction: -1 as const, Icon: ChevronLeft, side: "-left-3", name: "Previous" },
        { direction: 1 as const, Icon: ChevronRight, side: "-right-3", name: "Next" },
      ].map(({ direction, Icon, side, name }) => (
        <button
          key={name}
          type="button"
          onClick={() => scroll(direction)}
          aria-label={`${name} products`}
          className={`absolute top-[32%] hidden size-11 items-center justify-center rounded-full border bg-background shadow-md transition-colors hover:bg-surface lg:flex ${side}`}
        >
          <Icon className="size-5" aria-hidden />
        </button>
      ))}
    </div>
  )
}
