"use client"

import { useState, type ReactNode } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  ChevronRight,
  Heart,
  LayoutGrid,
  LogOut,
  MapPin,
  Package,
  Plus,
  ShoppingBag,
  Sparkles,
  UserRound,
  type LucideIcon,
} from "lucide-react"
import { useForm, useWatch } from "react-hook-form"
import { z } from "zod"

import { EmptyState, FieldError, PageHeader } from "@/components/common/bits"
import { SmartImage } from "@/components/common/smart-image"
import { Button } from "@/components/ui/button"
import { demoOrders } from "@/data/content"
import { getProductById } from "@/data/products"
import { formatDate, formatPrice } from "@/lib/format"
import { cn } from "@/lib/utils"
import {
  toast,
  useAuth,
  useCart,
  useOrders,
  useUi,
  useWishlist,
  type ProfileDetails,
} from "@/store"
import type { Order, OrderStatus, UserProfile } from "@/types"

type Tab = "overview" | "profile" | "addresses"

const statusTone: Record<OrderStatus, string> = {
  Processing: "bg-muted text-muted-foreground",
  Packed: "bg-gold/15 text-gold-ink",
  Shipped: "bg-gold/15 text-gold-ink",
  Delivered: "bg-success/10 text-success",
}

/** Points needed for each tier; 10 points are worth ৳1 at checkout. */
const tiers = [
  { name: "Silver", from: 0 },
  { name: "Gold", from: 1000 },
  { name: "Platinum", from: 2500 },
]

export function AccountDashboard() {
  const hydrated = useUi((state) => state.hydrated)
  const user = useAuth((state) => state.user)
  const [tab, setTab] = useState<Tab>("overview")

  if (!hydrated) {
    return (
      <div className="page-gutter py-12">
        <div className="h-96 animate-pulse rounded-sm bg-surface" />
      </div>
    )
  }

  if (!user) {
    return (
      <>
        <PageHeader title="My Account" crumbs={[{ label: "My Account" }]} />
        <div className="page-gutter">
          <EmptyState
            icon={UserRound}
            title="Sign in to your account"
            body="Track your orders, save delivery addresses and collect NOVA points on every purchase."
            action={{ label: "Sign In", href: "/login" }}
          >
            <p className="mt-5 text-sm text-muted-foreground">
              New here?{" "}
              <Link
                href="/register"
                className="text-foreground underline underline-offset-4 hover:text-gold-ink"
              >
                Create an account
              </Link>
            </p>
          </EmptyState>
        </div>
      </>
    )
  }

  return (
    <>
      <PageHeader
        eyebrow={`Member since ${user.memberSince}`}
        title="My Account"
        description={`Hello, ${user.firstName}. Manage your orders, details and delivery addresses.`}
        crumbs={[{ label: "My Account" }]}
      />
      <div className="page-gutter grid gap-8 py-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:py-12 xl:gap-14">
        <AccountNav user={user} tab={tab} onTab={setTab} />
        <div className="min-w-0">
          {tab === "overview" && <Overview user={user} onTab={setTab} />}
          {tab === "profile" && <ProfileForm user={user} />}
          {tab === "addresses" && <Addresses user={user} />}
        </div>
      </div>
    </>
  )
}

function initials(user: UserProfile) {
  return `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`.toUpperCase()
}

function useAllOrders() {
  const placed = useOrders((state) => state.placed)
  return [...placed, ...demoOrders]
}

const navItem =
  "flex min-h-11 shrink-0 items-center gap-3 rounded-sm px-3 text-sm whitespace-nowrap transition-colors"

function AccountNav({
  user,
  tab,
  onTab,
}: {
  user: UserProfile
  tab: Tab
  onTab: (tab: Tab) => void
}) {
  const router = useRouter()
  const signOut = useAuth((state) => state.signOut)
  const orderCount = useAllOrders().length
  const wishlistCount = useWishlist((state) => state.ids.length)

  const tabs: { id: Tab; label: string; icon: LucideIcon }[] = [
    { id: "overview", label: "Overview", icon: LayoutGrid },
    { id: "profile", label: "Profile Details", icon: UserRound },
    { id: "addresses", label: "Addresses", icon: MapPin },
  ]
  const links = [
    { href: "/orders", label: "My Orders", icon: Package, count: orderCount },
    { href: "/wishlist", label: "Wishlist", icon: Heart, count: wishlistCount },
  ]

  const handleSignOut = () => {
    signOut()
    toast("You have been signed out.")
    router.push("/")
  }

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="flex items-center gap-4 rounded-sm bg-surface p-5">
        <span
          aria-hidden
          className="flex size-14 shrink-0 items-center justify-center rounded-full bg-foreground font-heading text-xl text-background"
        >
          {initials(user)}
        </span>
        <span className="min-w-0">
          <span className="block truncate font-heading text-xl">
            {user.firstName} {user.lastName}
          </span>
          <span className="block truncate text-sm text-muted-foreground">
            {user.email}
          </span>
        </span>
      </div>

      <nav aria-label="Account" className="mt-4">
        <ul className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-col lg:px-0">
          {tabs.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => onTab(id)}
                aria-current={tab === id ? "page" : undefined}
                className={cn(
                  navItem,
                  "w-full",
                  tab === id
                    ? "bg-foreground text-background"
                    : "hover:bg-surface"
                )}
              >
                <Icon className="size-4" aria-hidden />
                {label}
              </button>
            </li>
          ))}
          {links.map(({ href, label, icon: Icon, count }) => (
            <li key={href}>
              <Link href={href} className={cn(navItem, "hover:bg-surface")}>
                <Icon className="size-4" aria-hidden />
                <span className="flex-1">{label}</span>
                <span className="text-xs text-muted-foreground">{count}</span>
              </Link>
            </li>
          ))}
          <li className="lg:mt-2 lg:border-t lg:pt-2">
            <button
              type="button"
              onClick={handleSignOut}
              className={cn(
                navItem,
                "w-full text-destructive hover:bg-destructive/10"
              )}
            >
              <LogOut className="size-4" aria-hidden />
              Sign Out
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

function SectionTitle({
  id,
  title,
  action,
}: {
  id?: string
  title: string
  action?: ReactNode
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <h2 id={id} className="font-heading text-2xl lg:text-3xl">
        {title}
      </h2>
      {action}
    </div>
  )
}

const textAction =
  "border-b border-foreground pb-0.5 text-xs tracking-[0.16em] uppercase transition-colors hover:border-gold-ink hover:text-gold-ink"

function Overview({
  user,
  onTab,
}: {
  user: UserProfile
  onTab: (tab: Tab) => void
}) {
  const orders = useAllOrders()
  const wishlistCount = useWishlist((state) => state.ids.length)
  const bagCount = useCart((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  )
  const defaultAddress = user.addresses.find((a) => a.isDefault)

  const stats: { label: string; value: string; icon: LucideIcon; href: string }[] = [
    { label: "Orders", value: String(orders.length), icon: Package, href: "/orders" },
    { label: "Wishlist", value: String(wishlistCount), icon: Heart, href: "/wishlist" },
    { label: "In your bag", value: String(bagCount), icon: ShoppingBag, href: "/cart" },
    {
      label: "NOVA points",
      value: user.points.toLocaleString("en-US"),
      icon: Sparkles,
      href: "#rewards",
    },
  ]

  return (
    <div className="space-y-12">
      <ul className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="flex h-full flex-col gap-4 rounded-sm border p-4 transition-colors hover:border-foreground sm:p-5"
            >
              <Icon className="size-5 text-gold-ink" aria-hidden />
              <span>
                <span className="block font-heading text-3xl">{value}</span>
                <span className="text-sm text-muted-foreground">{label}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <Rewards points={user.points} />

      <section aria-labelledby="recent-orders">
        <SectionTitle
          id="recent-orders"
          title="Recent Orders"
          action={
            <Link href="/orders" className={textAction}>
              View All
            </Link>
          }
        />
        {orders.length ? (
          <ul className="divide-y border-y">
            {orders.slice(0, 3).map((order) => (
              <li key={order.id}>
                <OrderRow order={order} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-sm bg-surface p-6 text-sm text-muted-foreground">
            You haven&apos;t placed an order yet.{" "}
            <Link href="/shop" className="text-foreground underline underline-offset-4">
              Start shopping
            </Link>
          </p>
        )}
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <InfoCard
          title="Default Address"
          action={{ label: "Manage", onClick: () => onTab("addresses") }}
        >
          {defaultAddress ? (
            <>
              <p className="font-medium text-foreground">{defaultAddress.label}</p>
              <p>{defaultAddress.line}</p>
            </>
          ) : (
            <p>No address saved yet.</p>
          )}
        </InfoCard>
        <InfoCard
          title="Account Details"
          action={{ label: "Edit", onClick: () => onTab("profile") }}
        >
          <p className="font-medium text-foreground">
            {user.firstName} {user.lastName}
          </p>
          <p className="truncate">{user.email}</p>
          <p>{user.phone}</p>
        </InfoCard>
      </div>
    </div>
  )
}

function Rewards({ points }: { points: number }) {
  const tierIndex = tiers.filter((tier) => points >= tier.from).length - 1
  const tier = tiers[tierIndex]
  const next = tiers[tierIndex + 1]
  const progress = next
    ? ((points - tier.from) / (next.from - tier.from)) * 100
    : 100

  return (
    <section
      id="rewards"
      aria-label="NOVA Rewards"
      className="scroll-mt-28 rounded-sm bg-[#171717] p-6 text-[#f5f4f1] sm:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="text-[0.6875rem] font-medium tracking-[0.22em] text-gold uppercase">
            NOVA Rewards · {tier.name} Member
          </p>
          <p className="mt-3 font-heading text-4xl sm:text-5xl">
            {points.toLocaleString("en-US")}
            <span className="ml-2 font-sans text-base text-white/70">points</span>
          </p>
          <p className="mt-2 text-sm text-white/70">
            Worth {formatPrice(Math.floor(points / 10))} off your next order.
          </p>
        </div>
        <Link
          href="/shop"
          className="inline-flex h-11 items-center gap-2 rounded-sm bg-gold px-5 text-xs tracking-[0.16em] text-[#171717] uppercase transition-colors hover:bg-[#b8976b]"
        >
          Shop &amp; Earn
          <ChevronRight className="size-4" aria-hidden />
        </Link>
      </div>
      <div className="mt-7">
        <div
          role="progressbar"
          aria-label={next ? `Progress to ${next.name}` : "Top tier reached"}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
          className="h-1.5 overflow-hidden rounded-full bg-white/15"
        >
          <div className="h-full rounded-full bg-gold" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-3 text-sm text-white/70">
          {next
            ? `${(next.from - points).toLocaleString("en-US")} points to ${next.name}: free express delivery and early sale access.`
            : "You've reached our highest tier. Thank you for shopping with NOVA."}
        </p>
      </div>
    </section>
  )
}

function OrderRow({ order }: { order: Order }) {
  const items = order.lines.reduce((sum, line) => sum + line.quantity, 0)
  return (
    <Link
      href={`/orders/${order.id}`}
      className="group flex items-center gap-4 py-5"
    >
      <span className="flex shrink-0 -space-x-4">
        {order.lines.slice(0, 2).map((line) => {
          const product = getProductById(line.productId)
          return (
            <span
              key={line.productId}
              className="relative h-16 w-12 overflow-hidden rounded-sm border-2 border-background"
            >
              {product && <SmartImage src={product.images[0]} alt="" sizes="48px" />}
            </span>
          )
        })}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-medium transition-colors group-hover:text-gold-ink">
          {order.id}
        </span>
        <span className="block text-sm text-muted-foreground">
          {formatDate(order.date)} · {items} {items === 1 ? "item" : "items"}
        </span>
      </span>
      <span className="flex flex-col items-end gap-1.5">
        <span className="font-medium">{formatPrice(order.total)}</span>
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-xs",
            statusTone[order.status]
          )}
        >
          {order.status}
        </span>
      </span>
      <ChevronRight className="hidden size-4 shrink-0 sm:block" aria-hidden />
    </Link>
  )
}

function InfoCard({
  title,
  action,
  children,
}: {
  title: string
  action: { label: string; onClick: () => void }
  children: ReactNode
}) {
  return (
    <section className="rounded-sm border p-5 sm:p-6">
      <div className="mb-3 flex items-center justify-between gap-4">
        <h3 className="eyebrow">{title}</h3>
        <button type="button" onClick={action.onClick} className={textAction}>
          {action.label}
        </button>
      </div>
      <div className="space-y-1 text-sm text-muted-foreground">{children}</div>
    </section>
  )
}

const profileSchema = z.object({
  firstName: z.string().trim().min(2, "Please enter your first name"),
  lastName: z.string().trim().min(2, "Please enter your last name"),
  email: z.email("Please enter a valid email"),
  phone: z
    .string()
    .trim()
    .regex(/^01\d{9}$/, "Enter an 11-digit number starting with 01"),
})

/** Stored demo phones may include a dash; the form edits digits only. */
const digitsOnly = (phone: string) => phone.replace(/\D/g, "")

const profileFields: {
  name: keyof ProfileDetails
  label: string
  type?: string
  autoComplete: string
}[] = [
  { name: "firstName", label: "First name", autoComplete: "given-name" },
  { name: "lastName", label: "Last name", autoComplete: "family-name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "phone", label: "Phone number", type: "tel", autoComplete: "tel" },
]

function ProfileForm({ user }: { user: UserProfile }) {
  const updateProfile = useAuth((state) => state.updateProfile)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileDetails>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: digitsOnly(user.phone),
    },
  })

  const onSubmit = (values: ProfileDetails) => {
    updateProfile(values)
    reset(values)
    toast("Your details have been saved.")
  }

  return (
    <div className="space-y-12">
      <section>
        <SectionTitle title="Profile Details" />
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-5 sm:grid-cols-2">
            {profileFields.map((field) => {
              const error = errors[field.name]?.message
              const errorId = `${field.name}-error`
              return (
                <div key={field.name}>
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
          <div className="mt-6 flex flex-wrap gap-3">
            <Button type="submit" size="cta" disabled={!isDirty}>
              Save Changes
            </Button>
            {isDirty && (
              <Button
                type="button"
                variant="outline"
                size="cta"
                onClick={() => reset()}
              >
                Discard
              </Button>
            )}
          </div>
        </form>
      </section>

      <section>
        <SectionTitle title="Sign-in & Security" />
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-sm border p-5 sm:p-6">
          <div>
            <p className="font-medium">Password</p>
            <p className="text-sm text-muted-foreground">
              Use a unique password you don&apos;t use anywhere else.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="cta"
            onClick={() =>
              toast("Password changes aren't available in this demo store.")
            }
          >
            Change Password
          </Button>
        </div>
      </section>
    </div>
  )
}

const addressLabels = ["Home", "Office", "Other"] as const

const addressSchema = z.object({
  label: z.enum(addressLabels),
  street: z.string().trim().min(8, "Please enter your full street address"),
  city: z.string().trim().min(2, "Please enter your city"),
})

type AddressValues = z.infer<typeof addressSchema>

function Addresses({ user }: { user: UserProfile }) {
  const removeAddress = useAuth((state) => state.removeAddress)
  const setDefaultAddress = useAuth((state) => state.setDefaultAddress)
  const [adding, setAdding] = useState(user.addresses.length === 0)

  return (
    <section>
      <SectionTitle
        title="Addresses"
        action={
          !adding && (
            <Button type="button" variant="outline" size="lg" onClick={() => setAdding(true)}>
              <Plus aria-hidden />
              Add Address
            </Button>
          )
        }
      />

      {adding && <AddressForm onDone={() => setAdding(false)} canCancel={user.addresses.length > 0} />}

      {user.addresses.length > 0 && (
        <ul className={cn("grid gap-4 md:grid-cols-2", adding && "mt-8")}>
          {user.addresses.map((address) => (
            <li
              key={address.id}
              className={cn(
                "flex flex-col rounded-sm border p-5 sm:p-6",
                address.isDefault && "border-foreground"
              )}
            >
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-gold-ink" aria-hidden />
                <h3 className="font-medium">{address.label}</h3>
                {address.isDefault && (
                  <span className="ml-auto rounded-full bg-foreground px-2.5 py-0.5 text-xs text-background">
                    Default
                  </span>
                )}
              </div>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">
                {address.line}
              </p>
              <div className="mt-5 flex gap-5 text-sm">
                {!address.isDefault && (
                  <button
                    type="button"
                    onClick={() => {
                      setDefaultAddress(address.id)
                      toast(`${address.label} is now your default address.`)
                    }}
                    className="underline underline-offset-4 hover:text-gold-ink"
                  >
                    Set as default
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    removeAddress(address.id)
                    toast("Address removed.")
                  }}
                  className="text-destructive underline underline-offset-4"
                >
                  Remove
                  <span className="sr-only"> {address.label} address</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function AddressForm({
  onDone,
  canCancel,
}: {
  onDone: () => void
  canCancel: boolean
}) {
  const addAddress = useAuth((state) => state.addAddress)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddressValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: { label: "Home" },
  })
  const selected = useWatch({ control, name: "label" })

  const onSubmit = (values: AddressValues) => {
    addAddress({ label: values.label, line: `${values.street}, ${values.city}` })
    toast("Address saved.")
    onDone()
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-sm bg-surface p-5 sm:p-7"
    >
      <fieldset>
        <legend className="mb-3 text-sm">Address type</legend>
        <div className="flex flex-wrap gap-2">
          {addressLabels.map((label) => (
            <label
              key={label}
              className={cn(
                "flex h-10 items-center rounded-full border px-4 text-sm transition-colors has-focus-visible:outline-2 has-focus-visible:outline-ring",
                selected === label
                  ? "border-foreground bg-foreground text-background"
                  : "bg-background hover:border-muted-foreground"
              )}
            >
              <input type="radio" value={label} className="sr-only" {...register("label")} />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5 grid gap-5 sm:grid-cols-[2fr_1fr]">
        <div>
          <label htmlFor="street" className="mb-1.5 block text-sm">
            Street address
          </label>
          <input
            id="street"
            autoComplete="street-address"
            placeholder="House, road and area"
            aria-invalid={!!errors.street}
            aria-describedby={errors.street ? "street-error" : undefined}
            className="field"
            {...register("street")}
          />
          <FieldError id="street-error" message={errors.street?.message} />
        </div>
        <div>
          <label htmlFor="city" className="mb-1.5 block text-sm">
            City
          </label>
          <input
            id="city"
            autoComplete="address-level2"
            aria-invalid={!!errors.city}
            aria-describedby={errors.city ? "city-error" : undefined}
            className="field"
            {...register("city")}
          />
          <FieldError id="city-error" message={errors.city?.message} />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button type="submit" size="cta">
          Save Address
        </Button>
        {canCancel && (
          <Button type="button" variant="outline" size="cta" onClick={onDone}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
