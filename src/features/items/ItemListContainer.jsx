import { useState, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"

function ItemListContainer() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchParams] = useSearchParams()
  const category = searchParams.get("category")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Using dummyjson API - try category first, fallback to all products
        let url = "https://dummyjson.com/products"
        if (category) {
          // Map snowboard categories to dummyjson categories
          const categoryMap = {
            "snowboards": "smartphones",
            "bindings": "laptops",
            "boots": "fragrances",
            "jackets": "skincare",
            "pants": "groceries",
            "goggles": "home-decoration",
            "gloves": "furniture",
            "helmets": "tops"
          }
          
          const mappedCategory = categoryMap[category.toLowerCase()] || category.toLowerCase()
          url = `https://dummyjson.com/products/category/${mappedCategory}`
        }
        
        const response = await fetch(url)
        if (!response.ok) {
          // If category fails, try fetching all products and filter client-side
          if (category) {
            const fallbackResponse = await fetch("https://dummyjson.com/products?limit=100")
            if (fallbackResponse.ok) {
              const fallbackData = await fallbackResponse.json()
              // Filter products by category name in title or description (client-side filtering)
              const filteredProducts = fallbackData.products?.filter((product) => {
                const searchTerm = category.toLowerCase()
                return (
                  product.title?.toLowerCase().includes(searchTerm) ||
                  product.description?.toLowerCase().includes(searchTerm) ||
                  product.category?.toLowerCase().includes(searchTerm)
                )
              }) || []
              setProducts(filteredProducts)
              setLoading(false)
              return
            }
          }
          throw new Error("Failed to fetch products")
        }
        
        const data = await response.json()
        const fetchedProducts = data.products || []
        
        // If category was used but no products found, it might be an invalid category
        if (category && fetchedProducts.length === 0) {
          // Try fetching all products and filtering client-side
          const allProductsResponse = await fetch("https://dummyjson.com/products?limit=100")
          if (allProductsResponse.ok) {
            const allProductsData = await allProductsResponse.json()
            const searchTerm = category.toLowerCase()
            const filtered = allProductsData.products?.filter((product) => {
              return (
                product.title?.toLowerCase().includes(searchTerm) ||
                product.description?.toLowerCase().includes(searchTerm) ||
                product.category?.toLowerCase().includes(searchTerm) ||
                product.brand?.toLowerCase().includes(searchTerm)
              )
            }) || []
            setProducts(filtered)
            setLoading(false)
            return
          }
        }
        
        setProducts(fetchedProducts)
      } catch (err) {
        setError(err.message)
        // On error, try to fetch all products as last resort
        try {
          const fallbackResponse = await fetch("https://dummyjson.com/products?limit=100")
          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json()
            setProducts(fallbackData.products || [])
          }
        } catch (fallbackErr) {
          console.error("Fallback fetch also failed:", fallbackErr)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-destructive">Error: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-foreground mb-6">
        {category ? `${category} Products` : "All Products"}
      </h1>
      
      {products.length === 0 ? (
        <p className="text-muted-foreground">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={product.thumbnail || product.images?.[0]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-lg font-bold text-primary">
                  ${product.price}
                </p>
                {product.rating && (
                  <p className="text-sm text-muted-foreground mt-1">
                    ⭐ {product.rating.toFixed(1)}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default ItemListContainer

