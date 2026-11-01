"use client"

import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle2 } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { formatPrice } from "@/lib/format"
import { cn } from "@/lib/utils"
import { useOrders } from "@/store"

function Confirmation() {
  const id = useSearchParams().get("order")
  const order = useOrders((state) =>
    state.placed.find((candidate) => candidate.id === id)
  )

  return (
    <div className="page-gutter flex flex-col items-center py-16 text-center lg:py-24">
      <CheckCircle2 className="size-12 text-gold-ink" aria-hidden />
      <p className="eyebrow mt-6">Demo order placed</p>
      <h1 className="mt-3 font-heading text-4xl lg:text-5xl">
        Thank You for Your Order
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        This was a demonstration, so nothing was charged and nothing will be
        delivered.
      </p>
      {order && (
        <dl className="mt-8 w-full max-w-md space-y-3 rounded-sm bg-surface p-6 text-left text-sm">
          {[
            ["Order number", order.id],
            ["Delivery", order.deliveryMethod],
            ["Payment", order.paymentMethod],
            ["Total", formatPrice(order.total)],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4">
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="text-right">{value}</dd>
            </div>
          ))}
        </dl>
      )}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {order && (
          <Link
            href={`/orders/${order.id}`}
            className={buttonVariants({ size: "cta" })}
          >
            View Order
          </Link>
        )}
        <Link
          href="/shop"
          className={cn(buttonVariants({ variant: "outline", size: "cta" }))}
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="py-32" />}>
      <Confirmation />
    </Suspense>
  )
}
