import { ShoppingCart } from "lucide-react"
import { useCart } from "../../features/cart/context/cartContext"

function CartWidget() {
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  return (
    <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
      <ShoppingCart className="h-6 w-6" />
      <span className="text-sm font-medium">{totalItems}</span>
    </div>
  )
}

export default CartWidget

