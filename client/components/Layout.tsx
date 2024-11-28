import { Outlet } from 'react-router-dom'
import Nav from './Navigation/Nav'

export default function Layout() {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main className="bg-[#13A25B] max-h-full min-h-screen">
        <Outlet />
      </main>
      <footer></footer>
    </>
  )
}
