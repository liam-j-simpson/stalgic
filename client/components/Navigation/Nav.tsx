import { useEffect } from 'react'
import { User } from '../../../models/user.ts'
import { useUpsertProfile } from '../../hooks/useEditProfile.ts'
import {
  IfAuthenticated,
  IfNotAuthenticated,
} from '../Authentication/Authenticated.tsx'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'

// TODO: Add link to profile page by clicking on username or profile img

// TODO: Add link to dashboard when 'stalgic' is clicked

function Nav() {
  const { user, logout, loginWithRedirect } = useAuth0()
  const { handleProfileUpsert } = useUpsertProfile()

  const handleSignOut = () => {
    logout()
  }

  const handleLogIn = async () => {
    try {
      await loginWithRedirect()
    } catch (error) {
      console.error('Error during login:', error)
    }
  }

  useEffect(() => {
    if (user) {
      const profileData: User = {
        auth0_id: user?.sub || '',
        name: user?.name || '',
        email: user?.email || '',
        dob: user?.birthdate || null,
        profile_image: user?.picture || null,
      }
      handleProfileUpsert(profileData)
    }
  }, [user, handleProfileUpsert])

  return (
    <div className="flex items-center justify-between bg-[#13A25B]">
      <Link key="logo-to-dashboard" to={`/dashboard`}>
        <h1 className="pb-5 pl-16 pt-10 font-lalezar text-3xl font-bold text-white hover:text-[#FE5801]">
          STALGIC
        </h1>
      </Link>

      <div className="flex pr-16 text-white">
        <IfAuthenticated>
          <div className="flex items-center hover:underline">
            <Link key="profilePageLink" to={'/profile'}>
              <button>
                <p className="text-l space-l mr-3 font-labrada">{user?.name}</p>
              </button>
            </Link>

            <Link key="profilePageLink" to={'/profile'}>
              <button>
                <img
                  src={user?.picture}
                  alt={user?.name}
                  className="mr-3 h-10 w-10 rounded-full"
                />
              </button>
            </Link>

            <button onClick={handleSignOut}>
              <p className="text-l space-l font-labrada">Sign out</p>
            </button>
          </div>
        </IfAuthenticated>

        <IfNotAuthenticated>
          <div className="flex items-center hover:underline">
            <button onClick={handleLogIn}>
              <p className="text-l space-l font-labrada">Sign in</p>
            </button>
          </div>
        </IfNotAuthenticated>
      </div>
    </div>
  )
}

export default Nav
