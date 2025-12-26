import { Link } from "react-router-dom"

function CartPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-foreground mb-6">Shopping Cart</h1>
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          Your cart is empty
        </p>
        <Link
          to="/products"
          className="mt-4 inline-block px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
        >
          Browse Products
        </Link>
      </div>
    </div>
  )
}

export default CartPage

