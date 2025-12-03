import { ShoppingCart } from "lucide-react"

function CartWidget() {
  return (
    <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
      <ShoppingCart className="h-6 w-6" />
      <span className="text-sm font-medium">0</span>
    </div>
  )
}

export default CartWidget

