import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CartProvider } from "../features/cart/context/CartProvider"
import NavBar from "../shared/components/NavBar"
import HomePage from "../features/home/HomePage"
import ItemListContainer from "../features/items/ItemListContainer"
import ItemDetailContainer from "../features/items/ItemDetailContainer"
import CartPage from "../features/cart/CartPage"

function AppRouter() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ItemListContainer />} />
            <Route path="/products/:id" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  )
}

export default AppRouter

