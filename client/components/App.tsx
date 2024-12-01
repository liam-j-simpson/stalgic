import { Outlet } from 'react-router-dom'
import LandingPage from '../Pages/LandingPage'

function App() {
  return (
    <>
      <div className="app">
        <LandingPage />
        <Outlet />
      </div>
    </>
  )
}

export default App
