import { Outlet } from 'react-router-dom'
import ListAllCapsules from '../components/ViewCapsule/ListAllCapsules'

function Dashboard() {
  return (
    <>
      <div>
        <ListAllCapsules userId={''} />
        <Outlet />
      </div>
    </>
  )
}

export default Dashboard
