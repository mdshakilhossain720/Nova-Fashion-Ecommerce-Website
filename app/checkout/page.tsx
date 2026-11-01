"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { ShoppingBag } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Breadcrumbs, EmptyState, FieldError } from "@/components/common/bits"
import { SummaryRows } from "@/components/cart/order-summary"
import { SmartImage } from "@/components/common/smart-image"
import { Button } from "@/components/ui/button"
import { getProductById } from "@/data/products"
import { formatPrice } from "@/lib/format"
import { cn } from "@/lib/utils"
import { cartTotals, useCart, useOrders, useUi } from "@/store"

const schema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name"),
  phone: z
    .string()
    .trim()
    .regex(/^01\d{9}$/, "Enter an 11-digit number starting with 01"),
  email: z.union([z.literal(""), z.email("Please enter a valid email")]),
  address: z.string().trim().min(8, "Please enter your full street address"),
  city: z.string().trim().min(2, "Please enter your city"),
  notes: z.string().optional(),
})

type CheckoutForm = z.infer<typeof schema>

const deliveryOptions = [
  { id: "dhaka", label: "Standard, inside Dhaka", time: "1–2 working days", fee: 80 },
  { id: "outside", label: "Standard, outside Dhaka", time: "3–5 working days", fee: 130 },
  { id: "express", label: "Express", time: "Next working day", fee: 200 },
]

const paymentOptions = [
  { id: "cod", label: "Cash on Delivery", note: "Pay when your order arrives" },
  { id: "mobile", label: "Mobile Banking", note: "Shown for demo only" },
  { id: "card", label: "Card", note: "Shown for demo only" },
]

const fields: {
  name: keyof CheckoutForm
  label: string
  type?: string
  autoComplete: string
  wide?: boolean
}[] = [
  { name: "fullName", label: "Full name", autoComplete: "name" },
  { name: "phone", label: "Phone number", type: "tel", autoComplete: "tel" },
  { name: "email", label: "Email (optional)", type: "email", autoComplete: "email", wide: true },
  { name: "address", label: "Street address", autoComplete: "street-address", wide: true },
  { name: "city", label: "City", autoComplete: "address-level2" },
  { name: "notes", label: "Delivery notes (optional)", autoComplete: "off" },
]

function OptionCard({
  name,
  checked,
  onChange,
  title,
  note,
  aside,
}: {
  name: string
  checked: boolean
  onChange: () => void
  title: string
  note: string
  aside?: string
}) {
  return (
    <label
      className={cn(
        "flex min-h-16 items-center gap-3 rounded-sm border p-4 transition-colors",
        checked ? "border-foreground" : "hover:border-muted-foreground"
      )}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="size-4 accent-[var(--gold-ink)]"
      />
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium">{title}</span>
        <span className="block text-xs text-muted-foreground">{note}</span>
      </span>
      {aside && <span className="text-sm">{aside}</span>}
    </label>
  )
}

export default function CheckoutPage() {
  const cart = useCart()
  const placeOrder = useOrders((state) => state.place)
  const hydrated = useUi((state) => state.hydrated)
  const router = useRouter()
  const [deliveryId, setDeliveryId] = useState(deliveryOptions[0].id)
  const [paymentId, setPaymentId] = useState(paymentOptions[0].id)
  const [placing, setPlacing] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  })

  const delivery = deliveryOptions.find((option) => option.id === deliveryId)!
  const payment = paymentOptions.find((option) => option.id === paymentId)!
  const totals = cartTotals(cart.items, cart.coupon, delivery.fee)

  const onSubmit = (values: CheckoutForm) => {
    setPlacing(true)
    const id = `NV-${String(Date.now()).slice(-6)}`
    placeOrder({
      id,
      date: new Date().toISOString().slice(0, 10),
      status: "Processing",
      lines: cart.items.map((item) => ({
        productId: item.productId,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        price: getProductById(item.productId)?.price ?? 0,
      })),
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      discount: totals.discount,
      total: totals.total,
      paymentMethod: payment.label,
      deliveryMethod: delivery.label,
      address: `${values.address}, ${values.city}`,
    })
    cart.clear()
    router.push(`/checkout/confirmation?order=${id}`)
  }

  if (!hydrated || placing) {
    return (
      <div className="page-gutter py-12">
        <div className="h-96 animate-pulse rounded-sm bg-surface" />
      </div>
    )
  }

  if (cart.items.length === 0) {
    return (
      <div className="page-gutter">
        <EmptyState
          icon={ShoppingBag}
          title="Nothing to check out yet"
          body="Add something to your bag and come back when you're ready."
          action={{ label: "Continue Shopping", href: "/shop" }}
        />
      </div>
    )
  }

  return (
    <div className="page-gutter py-6 lg:py-10">
      <Breadcrumbs
        items={[{ label: "Shopping Bag", href: "/cart" }, { label: "Checkout" }]}
      />
      <h1 className="mt-5 mb-8 font-heading text-4xl lg:text-5xl">Checkout</h1>

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-10 lg:grid-cols-[1fr_400px] xl:gap-16"
      >
        <div className="space-y-10">
          <section aria-labelledby="address-title">
            <h2 id="address-title" className="mb-4 font-heading text-2xl">
              Delivery Address
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map((field) => {
                const error = errors[field.name]?.message
                const errorId = `${field.name}-error`
                return (
                  <div key={field.name} className={cn(field.wide && "sm:col-span-2")}>
                    <label htmlFor={field.name} className="mb-1.5 block text-sm">
                      {field.label}
                    </label>
                    <input
                      id={field.name}
                      type={field.type ?? "text"}
                      autoComplete={field.autoComplete}
                      aria-invalid={!!error}
                      aria-describedby={error ? errorId : undefined}
                      className="field"
                      {...register(field.name)}
                    />
                    <FieldError id={errorId} message={error} />
                  </div>
                )
              })}
            </div>
          </section>

          <fieldset>
            <legend className="mb-4 font-heading text-2xl">Delivery Option</legend>
            <div className="grid gap-3">
              {deliveryOptions.map((option) => (
                <OptionCard
                  key={option.id}
                  name="delivery"
                  checked={deliveryId === option.id}
                  onChange={() => setDeliveryId(option.id)}
                  title={option.label}
                  note={option.time}
                  aside={formatPrice(option.fee)}
                />
              ))}
            </div>
            {totals.shipping === 0 && (
              <p className="mt-3 text-sm text-success">
                Your order qualifies for free delivery.
              </p>
            )}
          </fieldset>

          <fieldset>
            <legend className="mb-4 font-heading text-2xl">Payment Method</legend>
            <div className="grid gap-3">
              {paymentOptions.map((option) => (
                <OptionCard
                  key={option.id}
                  name="payment"
                  checked={paymentId === option.id}
                  onChange={() => setPaymentId(option.id)}
                  title={option.label}
                  note={option.note}
                />
              ))}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              This is a demo store. No payment is taken and no order is sent
              anywhere.
            </p>
          </fieldset>
        </div>

        <aside
          aria-label="Order summary"
          className="self-start rounded-sm bg-surface p-5 sm:p-7 lg:sticky lg:top-24"
        >
          <h2 className="mb-5 font-heading text-2xl">Order Summary</h2>
          <ul className="mb-5 space-y-4 border-b pb-5">
            {cart.items.map((item) => {
              const product = getProductById(item.productId)
              if (!product) return null
              return (
                <li key={item.key} className="flex items-center gap-3">
                  <span className="relative h-20 w-16 shrink-0 overflow-hidden rounded-sm">
                    <SmartImage src={product.images[0]} alt="" sizes="64px" />
                  </span>
                  <span className="min-w-0 flex-1 text-sm">
                    <span className="block">{product.name}</span>
                    <span className="block text-xs text-muted-foreground">
                      {item.color} · {item.size} · Qty {item.quantity}
                    </span>
                  </span>
                  <span className="text-sm">
                    {formatPrice(product.price * item.quantity)}
                  </span>
                </li>
              )
            })}
          </ul>
          <SummaryRows {...totals} />
          <Button type="submit" size="cta" className="mt-6 w-full">
            Place Order
          </Button>
          <Link
            href="/cart"
            className="mt-4 block text-center text-sm underline underline-offset-4"
          >
            Back to bag
          </Link>
        </aside>
      </form>
    </div>
  )
}
