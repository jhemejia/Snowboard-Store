import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useCart } from "../cart/context/cartContext"
import ItemDetail from "./components/ItemDetail"

function ItemDetailContainer() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`https://dummyjson.com/products/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch product")
        }
        
        const data = await response.json()
        setProduct(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  const handleAddToCart = (quantity) => {
    if (product && quantity > 0) {
      addToCart(product, quantity)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-destructive">Error: {error}</p>
          <Link to="/products" className="text-primary hover:underline mt-4 inline-block">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-muted-foreground">Product not found.</p>
          <Link to="/products" className="text-primary hover:underline mt-4 inline-block">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        to="/products"
        className="text-primary hover:underline mb-6 inline-block"
      >
        ← Back to Products
      </Link>
      
      <ItemDetail product={product} onAddToCart={handleAddToCart} />
    </div>
  )
}

export default ItemDetailContainer

