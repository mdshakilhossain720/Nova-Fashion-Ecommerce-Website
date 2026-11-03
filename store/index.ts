"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

import { userProfile } from "@/data/content"
import { PRICE_CEILING, getProductById } from "@/data/products"
import type { CartItem, Order, UserProfile } from "@/types"

/* All persisted stores skip automatic hydration. StoreHydrator rehydrates them
   after mount so the first client render matches the server-rendered HTML. */

export const FREE_SHIPPING_THRESHOLD = 2000
export const STANDARD_SHIPPING = 80

export const coupons: Record<
  string,
  { label: string; apply: (subtotal: number) => number; freeShipping?: boolean }
> = {
  NOVA10: { label: "10% off", apply: (subtotal) => Math.round(subtotal * 0.1) },
  WELCOME200: { label: "৳200 off", apply: (subtotal) => Math.min(200, subtotal) },
  FREESHIP: { label: "Free shipping", apply: () => 0, freeShipping: true },
}

interface CartState {
  items: CartItem[]
  coupon: string | null
  add: (
    productId: string,
    size: string,
    color: string,
    quantity?: number
  ) => void
  setQuantity: (key: string, quantity: number) => void
  remove: (key: string) => void
  clear: () => void
  applyCoupon: (code: string) => boolean
  removeCoupon: () => void
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      coupon: null,
      add: (productId, size, color, quantity = 1) =>
        set((state) => {
          const key = `${productId}|${size}|${color}`
          const existing = state.items.find((item) => item.key === key)
          return {
            items: existing
              ? state.items.map((item) =>
                  item.key === key
                    ? { ...item, quantity: Math.min(10, item.quantity + quantity) }
                    : item
                )
              : [...state.items, { key, productId, size, color, quantity }],
          }
        }),
      setQuantity: (key, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.key === key
              ? { ...item, quantity: Math.min(10, Math.max(1, quantity)) }
              : item
          ),
        })),
      remove: (key) =>
        set((state) => ({
          items: state.items.filter((item) => item.key !== key),
        })),
      clear: () => set({ items: [], coupon: null }),
      applyCoupon: (code) => {
        const normalized = code.trim().toUpperCase()
        if (!coupons[normalized]) return false
        set({ coupon: normalized })
        return true
      },
      removeCoupon: () => set({ coupon: null }),
    }),
    { name: "nova-cart", skipHydration: true }
  )
)

export function cartTotals(
  items: CartItem[],
  coupon: string | null,
  shippingFee = STANDARD_SHIPPING
) {
  const subtotal = items.reduce(
    (sum, item) =>
      sum + (getProductById(item.productId)?.price ?? 0) * item.quantity,
    0
  )
  const count = items.reduce((sum, item) => sum + item.quantity, 0)
  const rule = coupon ? coupons[coupon] : undefined
  const discount = rule ? rule.apply(subtotal) : 0
  const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || rule?.freeShipping
  const shipping = subtotal === 0 || freeShipping ? 0 : shippingFee
  return { subtotal, count, discount, shipping, total: subtotal - discount + shipping }
}

interface WishlistState {
  ids: string[]
  toggle: (id: string) => boolean
  remove: (id: string) => void
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => {
        const added = !get().ids.includes(id)
        set({
          ids: added ? [...get().ids, id] : get().ids.filter((x) => x !== id),
        })
        return added
      },
      remove: (id) => set({ ids: get().ids.filter((x) => x !== id) }),
    }),
    { name: "nova-wishlist", skipHydration: true }
  )
)

interface OrdersState {
  placed: Order[]
  place: (order: Order) => void
}

export const useOrders = create<OrdersState>()(
  persist(
    (set) => ({
      placed: [],
      place: (order) => set((state) => ({ placed: [order, ...state.placed] })),
    }),
    { name: "nova-orders", skipHydration: true }
  )
)

export type Address = UserProfile["addresses"][number]

export type ProfileDetails = Pick<
  UserProfile,
  "firstName" | "lastName" | "email" | "phone"
>

/* Demo auth: nothing leaves the browser. Signing in loads the sample profile
   under the entered email; registering starts a fresh profile. */
interface AuthState {
  user: UserProfile | null
  signIn: (email: string) => void
  register: (details: ProfileDetails) => void
  signOut: () => void
  updateProfile: (details: ProfileDetails) => void
  addAddress: (address: Omit<Address, "id" | "isDefault">) => void
  removeAddress: (id: string) => void
  setDefaultAddress: (id: string) => void
}

const withUser = (
  state: AuthState,
  update: (user: UserProfile) => Partial<UserProfile>
) => (state.user ? { user: { ...state.user, ...update(state.user) } } : {})

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      signIn: (email) => set({ user: { ...userProfile, email } }),
      register: (details) =>
        set({
          user: {
            ...details,
            memberSince: String(new Date().getFullYear()),
            points: 200,
            addresses: [],
          },
        }),
      signOut: () => set({ user: null }),
      updateProfile: (details) => set((state) => withUser(state, () => details)),
      addAddress: (address) =>
        set((state) =>
          withUser(state, (user) => ({
            addresses: [
              ...user.addresses,
              {
                ...address,
                id: `a${Date.now()}`,
                isDefault: user.addresses.length === 0,
              },
            ],
          }))
        ),
      removeAddress: (id) =>
        set((state) =>
          withUser(state, (user) => {
            const rest = user.addresses.filter((a) => a.id !== id)
            // Keep one default whenever any address remains.
            if (rest.length && !rest.some((a) => a.isDefault)) {
              rest[0] = { ...rest[0], isDefault: true }
            }
            return { addresses: rest }
          })
        ),
      setDefaultAddress: (id) =>
        set((state) =>
          withUser(state, (user) => ({
            addresses: user.addresses.map((a) => ({
              ...a,
              isDefault: a.id === id,
            })),
          }))
        ),
    }),
    { name: "nova-auth", skipHydration: true }
  )
)

export type Theme = "light" | "dark"

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggle: () => void
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark")
  try {
    localStorage.setItem("nova-theme", theme)
  } catch {
    // Storage can be blocked; the theme still applies for this visit.
  }
}

export const useTheme = create<ThemeState>()((set, get) => ({
  theme: "light",
  setTheme: (theme) => {
    applyTheme(theme)
    set({ theme })
  },
  toggle: () => get().setTheme(get().theme === "dark" ? "light" : "dark"),
}))

export type SortKey = "featured" | "price-asc" | "price-desc" | "rating" | "newest"

export const PAGE_SIZE = 12

export interface FilterValues {
  sizes: string[]
  colors: string[]
  minPrice: number
  maxPrice: number
  minRating: number
  inStockOnly: boolean
  onSaleOnly: boolean
  sort: SortKey
  visible: number
}

const defaultFilters: FilterValues = {
  sizes: [],
  colors: [],
  minPrice: 0,
  maxPrice: PRICE_CEILING,
  minRating: 0,
  inStockOnly: false,
  onSaleOnly: false,
  sort: "featured",
  visible: PAGE_SIZE,
}

interface FilterState extends FilterValues {
  /** Changing any filter also returns the list to its first page. */
  patch: (values: Partial<FilterValues>) => void
  toggleIn: (field: "sizes" | "colors", value: string) => void
  showMore: () => void
  reset: () => void
}

export const useFilters = create<FilterState>()((set, get) => ({
  ...defaultFilters,
  patch: (values) => set({ ...values, visible: PAGE_SIZE }),
  toggleIn: (field, value) => {
    const current = get()[field]
    set({
      [field]: current.includes(value)
        ? current.filter((x) => x !== value)
        : [...current, value],
      visible: PAGE_SIZE,
    })
  },
  showMore: () => set({ visible: get().visible + PAGE_SIZE }),
  reset: () => set({ ...defaultFilters, sort: get().sort }),
}))

export interface Toast {
  id: number
  message: string
  action?: { label: string; href: string }
}

interface UiState {
  hydrated: boolean
  navOpen: boolean
  searchOpen: boolean
  quickViewId: string | null
  toasts: Toast[]
  setHydrated: () => void
  setNavOpen: (open: boolean) => void
  setSearchOpen: (open: boolean) => void
  setQuickView: (id: string | null) => void
  toast: (message: string, action?: Toast["action"]) => void
  dismissToast: (id: number) => void
}

let toastId = 0

export const useUi = create<UiState>()((set, get) => ({
  hydrated: false,
  navOpen: false,
  searchOpen: false,
  quickViewId: null,
  toasts: [],
  setHydrated: () => set({ hydrated: true }),
  setNavOpen: (navOpen) => set({ navOpen }),
  setSearchOpen: (searchOpen) => set({ searchOpen }),
  setQuickView: (quickViewId) => set({ quickViewId }),
  toast: (message, action) => {
    const id = ++toastId
    set({ toasts: [...get().toasts.slice(-2), { id, message, action }] })
    setTimeout(() => get().dismissToast(id), 3800)
  },
  dismissToast: (id) =>
    set({ toasts: get().toasts.filter((toast) => toast.id !== id) }),
}))

export const toast = (message: string, action?: Toast["action"]) =>
  useUi.getState().toast(message, action)
