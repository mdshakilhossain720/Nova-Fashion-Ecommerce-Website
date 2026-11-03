"use client"

import * as React from "react"
import { MotionConfig } from "framer-motion"

import {
  useAuth,
  useCart,
  useOrders,
  useTheme,
  useUi,
  useWishlist,
  type Theme,
} from "@/store"

/** Runs before first paint so a saved dark theme never flashes light. */
export const themeInitScript = `try{var t=localStorage.getItem("nova-theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`

function ThemeProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark")
    const theme: Theme = isDark ? "dark" : "light"
    useTheme.setState({ theme })

    Promise.all([
      useCart.persist.rehydrate(),
      useWishlist.persist.rehydrate(),
      useOrders.persist.rehydrate(),
      useAuth.persist.rehydrate(),
    ]).finally(() => useUi.getState().setHydrated())
  }, [])

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}

export { ThemeProvider }
