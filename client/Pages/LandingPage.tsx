import { useEffect } from 'react'
import { IfNotAuthenticated } from '../components/Authentication/Authenticated'
import { useAuth0 } from '@auth0/auth0-react'
import { useUpsertProfile } from '../hooks/useEditProfile'
import { User } from '../../models/user'

function LandingPage() {
  const { user, loginWithRedirect } = useAuth0()
  const { handleProfileUpsert } = useUpsertProfile()

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
    <>
      <section className="bg-[#13A25B] pl-16 font-lalezar">
        <div className="flex flex-col">
          <h1 className="be-cover mt-32 pt-20 font-lalezar text-9xl font-bold tracking-wider text-white">
            nostalgia grown with time
          </h1>
          <IfNotAuthenticated>
            <div className="flex items-center hover:underline ">
              <button
                onClick={handleLogIn}
                className="mr-28 inline-block h-14 w-36 rounded-full bg-[#ffffff] text-2xl font-bold text-[#13A25B] hover:bg-[#FE5801] hover:text-[#ffffff]"
              >
                <p className="text-l space-l font-labrada">Sign in</p>
              </button>
            </div>
          </IfNotAuthenticated>
        </div>
      </section>
    </>
  )
}

export default LandingPage
