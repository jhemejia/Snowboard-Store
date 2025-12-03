import NavBar from "./components/NavBar"
import ItemListContainer from "./components/ItemListContainer"
import "./App.css"

function App() {
  const welcomeMessage = "Welcome to Snowboard Store!"

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <ItemListContainer greeting={welcomeMessage} />
    </div>
  )
}

export default App
