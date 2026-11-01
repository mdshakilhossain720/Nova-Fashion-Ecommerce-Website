"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"
import { ImageOff } from "lucide-react"

import { cn } from "@/lib/utils"

type SmartImageProps = Omit<ImageProps, "fill" | "alt"> & {
  alt: string
  /** For an image layered over another: no shimmer, and nothing if it fails. */
  layered?: boolean
}

/** A fill image with a loading shimmer and a broken-image fallback. */
export function SmartImage({
  className,
  alt,
  layered,
  ...props
}: SmartImageProps) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")

  if (status === "error") {
    if (layered) return null
    return (
      <div
        role="img"
        aria-label={alt}
        className="absolute inset-0 flex items-center justify-center bg-surface text-muted-foreground"
      >
        <ImageOff className="size-6" aria-hidden />
      </div>
    )
  }

  return (
    <>
      {status === "loading" && !layered && (
        <div className="absolute inset-0 animate-pulse bg-surface" aria-hidden />
      )}
      <Image
        fill
        alt={alt}
        className={cn("object-cover", className)}
        onLoad={() => setStatus("ready")}
        onError={() => setStatus("error")}
        {...props}
      />
    </>
  )
}
