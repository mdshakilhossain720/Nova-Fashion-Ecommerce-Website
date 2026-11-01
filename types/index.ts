export type CategorySlug =
  | "men"
  | "women"
  | "kids"
  | "sport"
  | "home"
  | "travel"
  | "saree"
  | "pants-shirts"
  | "attar"

export interface Category {
  slug: CategorySlug
  name: string
  description: string
  image: string
}

export interface ProductColor {
  name: string
  hex: string
}

export type ProductTag = "new" | "best" | "flash" | "popular"

export interface Product {
  id: string
  slug: string
  name: string
  category: CategorySlug
  /** Extra categories the product is also listed under. */
  alsoIn?: CategorySlug[]
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  colors: ProductColor[]
  sizes: string[]
  images: string[]
  description: string
  highlights: string[]
  specs: Record<string, string>
  inStock: boolean
  tags: ProductTag[]
}

export interface HeroSlide {
  id: string
  eyebrow: string
  headline: string
  subtitle: string
  href: string
  image: string
  /** CSS object-position, so faces and products survive narrow crops. */
  focus: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readMinutes: number
  image: string
  body: string[]
}

export interface Testimonial {
  id: string
  name: string
  city: string
  quote: string
  rating: number
}

export interface Review {
  id: string
  name: string
  rating: number
  date: string
  title: string
  body: string
}

export interface CartItem {
  key: string
  productId: string
  size: string
  color: string
  quantity: number
}

export type OrderStatus = "Processing" | "Packed" | "Shipped" | "Delivered"

export interface OrderLine {
  productId: string
  size: string
  color: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  date: string
  status: OrderStatus
  lines: OrderLine[]
  subtotal: number
  shipping: number
  discount: number
  total: number
  paymentMethod: string
  deliveryMethod: string
  address: string
}

export interface UserProfile {
  firstName: string
  lastName: string
  email: string
  phone: string
  memberSince: string
  points: number
  addresses: { id: string; label: string; line: string; isDefault: boolean }[]
}
