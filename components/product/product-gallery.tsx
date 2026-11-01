"use client"

import { useState } from "react"

import { SmartImage } from "@/components/common/smart-image"
import { cn } from "@/lib/utils"

export function ProductGallery({
  images,
  name,
}: {
  images: string[]
  name: string
}) {
  const [active, setActive] = useState(0)

  return (
    <div className="flex flex-col-reverse gap-3 lg:flex-row">
      <div
        role="group"
        aria-label="Product images"
        className="no-scrollbar flex shrink-0 gap-2 overflow-x-auto lg:w-20 lg:flex-col"
      >
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show image ${index + 1} of ${images.length}`}
            aria-current={active === index ? "true" : undefined}
            className={cn(
              "relative aspect-[3/4] w-16 shrink-0 overflow-hidden rounded-sm border-2 lg:w-full",
              active === index ? "border-foreground" : "border-transparent"
            )}
          >
            <SmartImage src={image} alt="" sizes="80px" />
          </button>
        ))}
      </div>
      <div className="relative aspect-[4/5] min-w-0 flex-1 overflow-hidden rounded-sm bg-surface">
        <SmartImage
          key={images[active]}
          src={images[active]}
          alt={`${name}, image ${active + 1}`}
          sizes="(min-width: 1024px) 50vw, 100vw"
          preload={active === 0}
        />
      </div>
    </div>
  )
}
