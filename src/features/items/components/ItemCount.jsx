import { Minus, Plus } from "lucide-react"

function ItemCount({ stock, onAdd, quantity, setQuantity }) {
  const handleIncrement = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1)
    }
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleAddToCart = () => {
    if (quantity > 0 && quantity <= stock) {
      onAdd(quantity)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-foreground">Quantity:</span>
        <div className="flex items-center gap-2 border border-border rounded-md">
          <button
            onClick={handleDecrement}
            disabled={quantity <= 1}
            className="p-2 hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="px-4 py-2 min-w-[3rem] text-center font-medium">
            {quantity}
          </span>
          <button
            onClick={handleIncrement}
            disabled={quantity >= stock}
            className="p-2 hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={quantity <= 0 || quantity > stock}
        className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ItemCount

