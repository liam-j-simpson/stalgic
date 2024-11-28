import {
  IfAuthenticated,
  IfNotAuthenticated,
} from '../Authentication/Authenticated.tsx'
import { useAuth0 } from '@auth0/auth0-react'

// TODO: Add link to profile page by clicking on username or profile img

// TODO: Add link to dashboard when 'stalgic' is clicked

function Nav() {
  const { user, logout, loginWithRedirect } = useAuth0()

  const handleSignOut = () => {
    return logout()
  }

  const handleSignIn = () => {
    return loginWithRedirect()
  }

  return (
    <>
      <div className="flex items-center justify-between bg-[#13A25B] p-4">
        <div className="pt-12">
          <h1 className="pl-16 text-2xl font-bold text-white">STALGIC</h1>
        </div>

        <div className="flex items-center space-x-4 pr-16 pt-12 flex-col items-end">
          <IfAuthenticated>
            {user && (
              <div className="flex items-center space-x-2">
                <p className="text-white">{user?.name}</p>
                <img
                  src={user?.picture}
                  alt={user?.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
              </div>
            )}
            <button
              onClick={handleSignOut}
              className="text-white hover:underline"
            >
              Sign out
            </button>
          </IfAuthenticated>
          <IfNotAuthenticated>
            <button
              onClick={handleSignIn}
              className="text-white hover:underline"
            >
              Sign in
            </button>
          </IfNotAuthenticated>
        </div>
      </div>
    </>
  )
}

export default Nav
