"use client"

import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { Check, X } from "lucide-react"

import { useUi } from "@/store"

export function Toaster() {
  const toasts = useUi((state) => state.toasts)
  const dismiss = useUi((state) => state.dismissToast)

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-4 z-[60] flex flex-col items-center gap-2 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:items-end"
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-sm bg-[#171717] py-2 pr-2 pl-4 text-sm text-white shadow-xl ring-1 ring-white/10"
          >
            <Check className="size-4 shrink-0 text-gold" aria-hidden />
            <span className="min-w-0 flex-1">{toast.message}</span>
            {toast.action && (
              <Link
                href={toast.action.href}
                onClick={() => dismiss(toast.id)}
                className="shrink-0 text-xs tracking-wider text-gold uppercase underline-offset-4 hover:underline"
              >
                {toast.action.label}
              </Link>
            )}
            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={() => dismiss(toast.id)}
              className="flex size-8 shrink-0 items-center justify-center rounded-full hover:bg-white/10"
            >
              <X className="size-4" aria-hidden />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
