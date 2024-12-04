import { Outlet } from 'react-router-dom'
import { IfAuthenticated } from '../components/Authentication/Authenticated'

function Dashboard() {
  return (
    <>
      <div>
        <IfAuthenticated>
          <Outlet />
        </IfAuthenticated>
      </div>
    </>
  )
}

export default Dashboard
