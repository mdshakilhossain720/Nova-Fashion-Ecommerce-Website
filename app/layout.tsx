import type { Metadata } from "next"
import { Bodoni_Moda, Hind_Siliguri, Jost } from "next/font/google"

import "./globals.css"
import { Toaster } from "@/components/common/toaster"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { MobileNav, SearchOverlay } from "@/components/layout/overlays"
import { QuickView } from "@/components/product/product-purchase"
import { ThemeProvider, themeInitScript } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const jost = Jost({ subsets: ["latin"], variable: "--font-jost" })
const bodoni = Bodoni_Moda({ subsets: ["latin"], variable: "--font-bodoni" })
// Supplies the ৳ glyph, which the Latin fonts do not include.
const bengali = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500"],
  variable: "--font-bengali",
})

export const metadata: Metadata = {
  title: { default: "NOVA — Premium Fashion", template: "%s | NOVA" },
  description:
    "A fictional premium fashion, home and fragrance storefront. Demo UI only.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        jost.variable,
        bodoni.variable,
        bengali.variable
      )}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>
          <Header />
          <main id="main" className="min-h-[60vh]">
            {children}
          </main>
          <Footer />
          <MobileNav />
          <SearchOverlay />
          <QuickView />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
