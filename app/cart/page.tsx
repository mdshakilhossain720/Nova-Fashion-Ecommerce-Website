"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingBag, X } from "lucide-react"

import { EmptyState, PageHeader } from "@/components/common/bits"
import { SmartImage } from "@/components/common/smart-image"
import { SummaryRows } from "@/components/cart/order-summary"
import { QuantityStepper } from "@/components/product/product-purchase"
import { Button, buttonVariants } from "@/components/ui/button"
import { getProductById } from "@/data/products"
import { formatPrice } from "@/lib/format"
import { cn } from "@/lib/utils"
import {
  FREE_SHIPPING_THRESHOLD,
  cartTotals,
  coupons,
  toast,
  useCart,
  useUi,
} from "@/store"

export default function CartPage() {
  const cart = useCart()
  const hydrated = useUi((state) => state.hydrated)
  const [code, setCode] = useState("")
  const [couponError, setCouponError] = useState("")
  const totals = cartTotals(cart.items, cart.coupon)
  const remaining = FREE_SHIPPING_THRESHOLD - totals.subtotal

  return (
    <>
      <PageHeader title="Shopping Bag" crumbs={[{ label: "Shopping Bag" }]} />
      <div className="page-gutter py-8 lg:py-12">
        {!hydrated ? (
          <div className="h-64 animate-pulse rounded-sm bg-surface" />
        ) : cart.items.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="Your bag is empty"
            body="Looks like you haven't added anything yet. Plenty of new pieces are waiting."
            action={{ label: "Continue Shopping", href: "/shop" }}
          />
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_380px] xl:gap-16">
            <div>
              <ul className="divide-y border-y">
                {cart.items.map((item) => {
                  const product = getProductById(item.productId)
                  if (!product) return null
                  return (
                    <li key={item.key} className="flex gap-4 py-5">
                      <Link
                        href={`/product/${product.slug}`}
                        className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden rounded-sm sm:w-28"
                      >
                        <SmartImage
                          src={product.images[0]}
                          alt={product.name}
                          sizes="112px"
                        />
                      </Link>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <Link
                              href={`/product/${product.slug}`}
                              className="hover:text-gold-ink"
                            >
                              {product.name}
                            </Link>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {item.color} · {item.size}
                            </p>
                          </div>
                          <button
                            type="button"
                            aria-label={`Remove ${product.name}`}
                            onClick={() => {
                              cart.remove(item.key)
                              toast(`${product.name} removed from your bag`)
                            }}
                            className="-mt-2 -mr-2 flex size-11 shrink-0 items-center justify-center rounded-full hover:bg-surface"
                          >
                            <X className="size-4" aria-hidden />
                          </button>
                        </div>
                        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3">
                          <QuantityStepper
                            value={item.quantity}
                            onChange={(quantity) =>
                              cart.setQuantity(item.key, quantity)
                            }
                            label={`Quantity of ${product.name}`}
                          />
                          <p className="font-medium">
                            {formatPrice(product.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
              <Link
                href="/shop"
                className="mt-6 inline-block border-b border-foreground pb-0.5 text-sm hover:border-gold-ink hover:text-gold-ink"
              >
                Continue Shopping
              </Link>
            </div>

            <aside
              aria-label="Order summary"
              className="self-start rounded-sm bg-surface p-5 sm:p-7 lg:sticky lg:top-24"
            >
              <h2 className="mb-5 font-heading text-2xl">Order Summary</h2>
              {remaining > 0 && !coupons[cart.coupon ?? ""]?.freeShipping && (
                <p className="mb-4 text-sm text-gold-ink">
                  Add {formatPrice(remaining)} more for free shipping.
                </p>
              )}
              <SummaryRows {...totals} />

              {cart.coupon ? (
                <p className="mt-5 flex items-center justify-between gap-3 text-sm">
                  <span>
                    Coupon <strong>{cart.coupon}</strong>:{" "}
                    {coupons[cart.coupon].label}
                  </span>
                  <button
                    type="button"
                    onClick={cart.removeCoupon}
                    className="min-h-11 underline underline-offset-4"
                  >
                    Remove
                  </button>
                </p>
              ) : (
                <form
                  noValidate
                  className="mt-5"
                  onSubmit={(event) => {
                    event.preventDefault()
                    if (cart.applyCoupon(code)) {
                      setCouponError("")
                      setCode("")
                      toast("Coupon applied")
                    } else {
                      setCouponError("That code isn't valid.")
                    }
                  }}
                >
                  <label htmlFor="coupon" className="mb-1.5 block text-sm">
                    Coupon code
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="coupon"
                      value={code}
                      onChange={(event) => setCode(event.target.value)}
                      aria-invalid={!!couponError}
                      aria-describedby="coupon-hint"
                      className="field min-w-0"
                    />
                    <Button type="submit" variant="outline" size="cta" className="px-4">
                      Apply
                    </Button>
                  </div>
                  <p
                    id="coupon-hint"
                    role={couponError ? "alert" : undefined}
                    className={cn(
                      "mt-1.5 text-xs",
                      couponError ? "text-destructive" : "text-muted-foreground"
                    )}
                  >
                    {couponError || "Demo codes: NOVA10, WELCOME200, FREESHIP"}
                  </p>
                </form>
              )}

              <Link
                href="/checkout"
                className={cn(buttonVariants({ size: "cta" }), "mt-6 w-full")}
              >
                Proceed to Checkout
              </Link>
            </aside>
          </div>
        )}
      </div>
    </>
  )
}
