"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { PageHeader } from "@/components/common/bits"
import { demoOrders } from "@/data/content"
import { formatDate, formatPrice } from "@/lib/format"
import { useOrders } from "@/store"

export default function OrdersPage() {
  const placed = useOrders((state) => state.placed)
  const orders = [...placed, ...demoOrders]

  return (
    <>
      <PageHeader
        title="My Orders"
        crumbs={[{ label: "Account", href: "/account" }, { label: "My Orders" }]}
      />
      <div className="page-gutter py-8 lg:py-12">
        <ul className="divide-y border-y">
          {orders.map((order) => (
            <li key={order.id}>
              <Link
                href={`/orders/${order.id}`}
                className="flex items-center gap-4 py-5 transition-colors hover:text-gold-ink"
              >
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{order.id}</span>
                  <span className="block text-sm text-muted-foreground">
                    {formatDate(order.date)} ·{" "}
                    {order.lines.reduce((sum, line) => sum + line.quantity, 0)}{" "}
                    items
                  </span>
                </span>
                <span className="text-right">
                  <span className="block font-medium">
                    {formatPrice(order.total)}
                  </span>
                  <span className="block text-sm text-gold-ink">
                    {order.status}
                  </span>
                </span>
                <ChevronRight className="size-4 shrink-0" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
