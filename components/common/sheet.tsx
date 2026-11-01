"use client"

import type { ReactNode } from "react"
import { Dialog } from "@base-ui/react/dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const panels = {
  left: "inset-y-0 left-0 h-dvh w-[min(88vw,380px)] data-[ending-style]:-translate-x-full data-[starting-style]:-translate-x-full",
  right:
    "inset-y-0 right-0 h-dvh w-[min(92vw,420px)] data-[ending-style]:translate-x-full data-[starting-style]:translate-x-full",
  bottom:
    "inset-x-0 bottom-0 max-h-[88dvh] rounded-t-xl data-[ending-style]:translate-y-full data-[starting-style]:translate-y-full",
  top: "inset-x-0 top-0 max-h-[92dvh] data-[ending-style]:-translate-y-full data-[starting-style]:-translate-y-full",
  center:
    "top-1/2 left-1/2 max-h-[92dvh] w-[min(94vw,980px)] -translate-x-1/2 -translate-y-1/2 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
}

interface SheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  side: keyof typeof panels
  title: string
  /** Hide the title visually when the content already makes it obvious. */
  hideTitle?: boolean
  children: ReactNode
  className?: string
}

/** Modal panel built on Base UI: focus trap, Escape and scroll lock included. */
export function Sheet({
  open,
  onOpenChange,
  side,
  title,
  hideTitle,
  children,
  className,
}: SheetProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(next) => onOpenChange(next)}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup
          className={cn(
            "fixed z-50 flex flex-col overflow-hidden bg-background text-foreground shadow-2xl transition-all duration-300 ease-out",
            panels[side],
            className
          )}
        >
          <div
            className={cn(
              "flex shrink-0 items-center justify-between px-5 py-4",
              !hideTitle && "border-b"
            )}
          >
            <Dialog.Title
              className={cn("font-heading text-xl", hideTitle && "sr-only")}
            >
              {title}
            </Dialog.Title>
            <Dialog.Close
              aria-label="Close"
              className="ml-auto flex size-11 items-center justify-center rounded-full hover:bg-surface"
            >
              <X className="size-5" aria-hidden />
            </Dialog.Close>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
