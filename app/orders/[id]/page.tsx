"use client"

import { use } from "react"
import Link from "next/link"
import { Check, PackageSearch } from "lucide-react"

import { EmptyState, PageHeader } from "@/components/common/bits"
import { SummaryRows } from "@/components/cart/order-summary"
import { SmartImage } from "@/components/common/smart-image"
import { demoOrders } from "@/data/content"
import { getProductById } from "@/data/products"
import { formatDate, formatPrice } from "@/lib/format"
import { cn } from "@/lib/utils"
import { useOrders, useUi } from "@/store"
import type { OrderStatus } from "@/types"

const steps: OrderStatus[] = ["Processing", "Packed", "Shipped", "Delivered"]

export default function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const placed = useOrders((state) => state.placed)
  const hydrated = useUi((state) => state.hydrated)
  const order = [...placed, ...demoOrders].find((item) => item.id === id)

  if (!order) {
    return hydrated ? (
      <div className="page-gutter">
        <EmptyState
          icon={PackageSearch}
          title="Order not found"
          body="We couldn't find that order on this device."
          action={{ label: "View My Orders", href: "/orders" }}
        />
      </div>
    ) : (
      <div className="page-gutter py-12">
        <div className="h-96 animate-pulse rounded-sm bg-surface" />
      </div>
    )
  }

  const current = steps.indexOf(order.status)

  return (
    <>
      <PageHeader
        title={`Order ${order.id}`}
        description={`Placed on ${formatDate(order.date)}`}
        crumbs={[{ label: "My Orders", href: "/orders" }, { label: order.id }]}
      />
      <div className="page-gutter py-8 lg:py-12">
        <ol className="mb-10 grid grid-cols-4 gap-2">
          {steps.map((step, index) => (
            <li
              key={step}
              aria-current={index === current ? "step" : undefined}
              className={cn(
                "border-t-2 pt-3 text-xs sm:text-sm",
                index <= current
                  ? "border-gold-ink"
                  : "border-border text-muted-foreground"
              )}
            >
              {index <= current && (
                <Check className="mb-1 size-4 text-gold-ink" aria-hidden />
              )}
              {step}
            </li>
          ))}
        </ol>

        <div className="grid gap-10 lg:grid-cols-[1fr_380px] xl:gap-16">
          <ul className="divide-y border-y self-start">
            {order.lines.map((line) => {
              const product = getProductById(line.productId)
              if (!product) return null
              return (
                <li
                  key={`${line.productId}-${line.size}-${line.color}`}
                  className="flex items-center gap-4 py-4"
                >
                  <span className="relative h-24 w-20 shrink-0 overflow-hidden rounded-sm">
                    <SmartImage src={product.images[0]} alt="" sizes="80px" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <Link
                      href={`/product/${product.slug}`}
                      className="hover:text-gold-ink"
                    >
                      {product.name}
                    </Link>
                    <span className="block text-sm text-muted-foreground">
                      {line.color} · {line.size} · Qty {line.quantity}
                    </span>
                  </span>
                  <span>{formatPrice(line.price * line.quantity)}</span>
                </li>
              )
            })}
          </ul>
          <aside className="self-start rounded-sm bg-surface p-5 sm:p-7">
            <SummaryRows {...order} />
            <dl className="mt-6 space-y-3 border-t pt-5 text-sm">
              <div>
                <dt className="text-muted-foreground">Deliver to</dt>
                <dd>{order.address}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Delivery</dt>
                <dd>{order.deliveryMethod}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Payment</dt>
                <dd>{order.paymentMethod}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </>
  )
}
