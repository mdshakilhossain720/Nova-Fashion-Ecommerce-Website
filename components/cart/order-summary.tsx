import { formatPrice } from "@/lib/format"

export function SummaryRows({
  subtotal,
  shipping,
  discount,
  total,
}: {
  subtotal: number
  shipping: number
  discount: number
  total: number
}) {
  return (
    <dl className="space-y-3 text-sm">
      <div className="flex justify-between">
        <dt className="text-muted-foreground">Subtotal</dt>
        <dd>{formatPrice(subtotal)}</dd>
      </div>
      <div className="flex justify-between">
        <dt className="text-muted-foreground">Shipping</dt>
        <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
      </div>
      {discount > 0 && (
        <div className="flex justify-between text-success">
          <dt>Discount</dt>
          <dd>−{formatPrice(discount)}</dd>
        </div>
      )}
      <div className="flex justify-between border-t pt-3 text-base font-medium">
        <dt>Total</dt>
        <dd>{formatPrice(total)}</dd>
      </div>
    </dl>
  )
}
