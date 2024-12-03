export interface User {
  auth0_id: string
  name: string
  email: string
  dob?: string | null
  profile_image?: string | null
}

export interface EditUser {
  name?: string 
  email?: string
  dob?: string | null
}
