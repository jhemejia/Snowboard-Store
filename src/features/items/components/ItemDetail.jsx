import { useState } from "react"
import ItemCount from "./ItemCount"

function ItemDetail({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(quantity)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="aspect-square overflow-hidden bg-muted rounded-lg">
          <img
            src={product.thumbnail || product.images?.[0]}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
        {product.images && product.images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {product.images.slice(0, 4).map((image, index) => (
              <div key={index} className="aspect-square overflow-hidden bg-muted rounded-md">
                <img
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {product.title}
          </h1>
          {product.brand && (
            <p className="text-muted-foreground mb-4">Brand: {product.brand}</p>
          )}
          {product.category && (
            <p className="text-sm text-muted-foreground mb-4">
              Category: {product.category}
            </p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <p className="text-4xl font-bold text-primary">
            ${product.price}
          </p>
          {product.discountPercentage && (
            <span className="text-sm text-muted-foreground line-through">
              ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
            </span>
          )}
          {product.discountPercentage && (
            <span className="px-2 py-1 bg-destructive text-destructive-foreground rounded text-sm font-medium">
              {product.discountPercentage}% OFF
            </span>
          )}
        </div>

        {product.rating && (
          <div className="flex items-center gap-2">
            <span className="text-lg">⭐</span>
            <span className="font-medium">{product.rating.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">
              ({product.stock} reviews)
            </span>
          </div>
        )}

        <div>
          <p className="text-foreground mb-2">
            {product.description}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Stock: <span className="font-medium text-foreground">{product.stock} available</span>
          </p>
        </div>

        <ItemCount
          stock={product.stock}
          onAdd={handleAddToCart}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </div>
    </div>
  )
}

export default ItemDetail

