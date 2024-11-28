import {
  IfAuthenticated,
  IfNotAuthenticated,
} from '../Authentication/Authenticated.tsx'
import { useAuth0 } from '@auth0/auth0-react'

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
      <div>
        <IfAuthenticated>
          <button onClick={handleSignOut}>Sign out</button>
          {user && (
            <>
              <img src={user?.picture} alt={user?.name} />
              <p>Signed in as: {user?.email}</p>
            </>
          )}
        </IfAuthenticated>
        <IfNotAuthenticated>
          <button onClick={handleSignIn}>Sign in</button>
        </IfNotAuthenticated>
      </div>
      <h1>Stalgic</h1>
    </>
  )
}

export default Nav
