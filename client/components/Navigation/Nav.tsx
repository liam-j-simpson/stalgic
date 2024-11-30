import { useEffect } from 'react';
import { User } from '../../../models/user.ts';
import { useUpsertProfile } from '../../hooks/useEditProfile.ts';
import {
  IfAuthenticated,
  IfNotAuthenticated,
} from '../Authentication/Authenticated.tsx'
import { useAuth0 } from '@auth0/auth0-react'

// TODO: Add link to profile page by clicking on username or profile img

// TODO: Add link to dashboard when 'stalgic' is clicked

function Nav() {
  const { user, logout, loginWithRedirect } = useAuth0()
  const {  handleProfileUpsert } = useUpsertProfile()

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
  }, [ user, handleProfileUpsert])

  return (
    <div className="flex items-center justify-between bg-[#13A25B]">
      <h1 className="font-lalezar pb-5 pl-16 pt-10 text-3xl font-bold text-white">
        STALGIC
      </h1>

      <div className="flex pr-16 text-white">
        <IfAuthenticated>
          <div className="flex items-center hover:underline">
            <p className="font-labrada text-l space-l mr-3">{user?.name}</p>
            <img
              src={user?.picture}
              alt={user?.name}
              className="mr-3 h-10 w-10 rounded-full"
            />
            <button onClick={handleSignOut}>
              <p className="font-labrada text-l space-l">Sign out</p>
            </button>
          </div>
        </IfAuthenticated>

        <IfNotAuthenticated>
          <div className="flex items-center hover:underline">
            <button onClick={handleLogIn}>
              <p className="font-labrada text-l space-l">Sign in</p>
            </button>
          </div>
        </IfNotAuthenticated>
      </div>
    </div>
  );
}

export default Nav;