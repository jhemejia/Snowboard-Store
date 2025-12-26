import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Link } from "react-router-dom"
import CartWidget from "./CartWidget"

function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const categories = [
    "Snowboards",
    "Bindings",
    "Boots",
    "Jackets",
    "Pants",
    "Goggles",
    "Gloves",
    "Helmets"
  ]

  return (
    <header className="bg-background border-b border-border">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex flex-row items-center justify-between w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={"/logo.png"} alt="Store Logo" className="w-10 h-10" />
            <span className="text-xl font-bold">Snowboard Store</span>
          </Link>                    

          {/* Navigation Link with Dropdown */}
          <div className="flex items-center relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 text-foreground hover:text-primary transition-colors font-medium"
            >
              Products
              <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-lg z-50">
                <ul className="py-2">
                  <li>
                    <Link
                      to="/products"
                      className="block px-4 py-2 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      All Products
                    </Link>
                  </li>
                  {categories.map((category) => (
                    <li key={category}>
                      <Link
                        to={`/products?category=${encodeURIComponent(category)}`}
                        className="block px-4 py-2 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Cart Widget */}
          <div className="flex justify-end">
            <Link to="/cart">
              <CartWidget />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default NavBar

