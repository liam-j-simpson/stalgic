import { Outlet } from 'react-router-dom'
import Nav from './Navigation/Nav'

export default function Layout() {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main className="max-h-full min-h-screen bg-[#13A25B]">
        <Outlet />
      </main>
      <footer></footer>
    </>
  )
}
