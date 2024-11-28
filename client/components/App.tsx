import { Button } from '../ui/Button.tsx'
import Nav from './Navigation/Nav'
import Dashboard from "../Pages/Dashboard"

function App() {
  return (
    <>
      <div className="app">
        <Button>Hi</Button>
        <Nav />
        <Dashboard />
      </div>
    </>
  )
}

export default App
