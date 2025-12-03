function ItemListContainer({ greeting }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {greeting}
        </h1>
        <p className="text-muted-foreground text-lg">
          Soon you will see our product catalog here
        </p>
      </div>
    </div>
  )
}

export default ItemListContainer

