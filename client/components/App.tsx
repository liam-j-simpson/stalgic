import { Button } from '../ui/Button.tsx'
import Nav from './Navigation/Nav'
import Dashboard from '../Pages/Dashboard'
import React from 'react'

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
