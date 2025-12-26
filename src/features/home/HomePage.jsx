import { Link } from "react-router-dom"

function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Welcome to Snowboard Store!
        </h1>
        <p className="text-muted-foreground text-lg mb-8">
          Discover the best snowboarding gear for your next adventure
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/products"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage

