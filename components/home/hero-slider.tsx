"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"

import { SmartImage } from "@/components/common/smart-image"
import { buttonVariants } from "@/components/ui/button"
import { heroSlides } from "@/data/content"
import { cn } from "@/lib/utils"

export function HeroSlider() {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [hovered, setHovered] = useState(false)
  const slide = heroSlides[index]

  const go = useCallback((next: number) => {
    setIndex((next + heroSlides.length) % heroSlides.length)
  }, [])

  useEffect(() => {
    if (!playing || hovered) return
    const timer = setTimeout(() => go(index + 1), 6000)
    return () => clearTimeout(timer)
  }, [index, playing, hovered, go])

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured collections"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative h-[calc(100svh-6.25rem)] max-h-[860px] min-h-[480px] overflow-hidden bg-[#171717] text-white lg:h-[calc(100svh-7.25rem)]"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <SmartImage
            src={slide.image}
            alt=""
            sizes="100vw"
            preload={index === 0}
            style={{ objectPosition: slide.focus }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10 lg:bg-gradient-to-r lg:from-black/70 lg:via-black/25 lg:to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="page-gutter relative flex h-full items-end pb-24 lg:items-center lg:pb-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <p className="mb-4 text-[0.6875rem] tracking-[0.28em] text-gold uppercase">
              {slide.eyebrow}
            </p>
            {index === 0 ? (
              <h1 className="font-heading text-[2.75rem] leading-[1.05] sm:text-6xl lg:text-7xl xl:text-8xl">
                {slide.headline}
              </h1>
            ) : (
              <h2 className="font-heading text-[2.75rem] leading-[1.05] sm:text-6xl lg:text-7xl xl:text-8xl">
                {slide.headline}
              </h2>
            )}
            <p className="mt-5 max-w-md text-base text-white/85 lg:text-lg">
              {slide.subtitle}
            </p>
            <Link
              href={slide.href}
              className={cn(
                buttonVariants({ variant: "light", size: "cta" }),
                "mt-8"
              )}
            >
              Shop Now
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="page-gutter absolute inset-x-0 bottom-5 flex items-center justify-between lg:bottom-8">
        <div className="flex items-center" role="group" aria-label="Choose slide">
          {heroSlides.map((item, dot) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(dot)}
              aria-label={`Slide ${dot + 1}: ${item.headline}`}
              aria-current={dot === index ? "true" : undefined}
              className="group flex h-11 w-9 items-center sm:w-12"
            >
              <span
                className={cn(
                  "h-0.5 w-full max-w-7 transition-colors sm:max-w-10",
                  dot === index ? "bg-white" : "bg-white/35 group-hover:bg-white/70"
                )}
              />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          {[
            {
              label: playing ? "Pause slideshow" : "Play slideshow",
              Icon: playing ? Pause : Play,
              onClick: () => setPlaying((current) => !current),
            },
            {
              label: "Previous slide",
              Icon: ChevronLeft,
              onClick: () => go(index - 1),
            },
            {
              label: "Next slide",
              Icon: ChevronRight,
              onClick: () => go(index + 1),
            },
          ].map(({ label, Icon, onClick }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              onClick={onClick}
              className="flex size-11 items-center justify-center rounded-full border border-white/40 transition-colors hover:bg-white hover:text-[#171717]"
            >
              <Icon className="size-4" aria-hidden />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
