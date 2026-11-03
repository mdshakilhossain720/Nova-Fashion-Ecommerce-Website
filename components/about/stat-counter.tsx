"use client"

import { useEffect, useRef, useState } from "react"

/** Counts up to `value` the first time it scrolls into view. */
export function StatCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  // Server HTML shows the final figure, so it reads correctly without JS.
  const [shown, setShown] = useState(value)

  useEffect(() => {
    const node = ref.current
    if (!node || matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Reset while off screen, so the count-up is never seen jumping back.
        if (!entry.isIntersecting) return setShown(0)
        if (entry.intersectionRatio < 0.4) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1400)
          setShown(Math.round(value * (1 - Math.pow(1 - t, 3))))
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: [0, 0.4] }
    )
    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value])

  return (
    <span ref={ref} className="tabular-nums">
      {shown.toLocaleString("en-US")}
      {suffix}
    </span>
  )
}
