// Editing a profile
// Name, email, photo
// DOB does not change
// Link to Auth0 next

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as api from '../apis/api.ts'
import { useAuth0 } from '@auth0/auth0-react'
import { User } from '../../models/user.ts'
// import { useNavigate } from 'react-router-dom'

// export function useUpsertProfile() {
  
//   const { user, getAccessTokenSilently } = useAuth0()

//   const queryClient = useQueryClient()
//   const { data, isLoading } = useQuery({
//     queryKey: ['user'],
//     queryFn: async () => {
//       const accessToken = await getAccessTokenSilently()
//       if (user && user.sub) {
//         const response = await api.getUser(accessToken)
//         return response
//       }
//     },
//   })

//   const mutation = useMutation({
//     mutationFn: ({
//       profileData,
//       token,
//     }: {
//       profileData: User
//       token: string
//     }) => api.upsertUser(profileData, token),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['user'] })
      
//     },

//     onError: (error) => {
//       console.error("Mutation error:", error);
//     },
//   })

//   return { data, isLoading, mutation }
// }

export function useUpsertProfile() {
  const { user, getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      if (!user || !user.sub) {
        console.warn("User is not defined or missing 'sub' property.");
        return null;
      }

      try {
        const accessToken = await getAccessTokenSilently();
        console.log("Access token:", accessToken);

        // Fetch user from the database
        const response = await api.getUser(accessToken);
        console.log("getUser Response:", response);

        if (!response) {
          console.log("User not found. Creating a new user...");
          const profileData = {
            auth0_id: user.sub,
            name: user.name || '',
            email: user.email || '',
            dob: user.birthdate || '', // Default or collected later
            profile_image: user.picture || '',
          };
          const upsertResponse = await api.upsertUser(profileData, accessToken);
          console.log("User created successfully:", upsertResponse);
          return upsertResponse;
        }

        return response;
      } catch (error) {
        console.error("Error fetching or creating user data:", error);
        throw error;
      }
    },
    enabled: !!user && !!user.sub, // Run only when user is defined
    initialData: null, // Prevent undefined state
  });

  const mutation = useMutation({
    mutationFn: ({ profileData, token }: { profileData: User; token: string }) =>
      api.upsertUser(profileData, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      console.error("Error during mutation:", error);
    },
  });

  return { data, isLoading, isError, mutation };
}
// const navigate = useNavigate()
// navigate('/my-songs')

// -- UPSERT NEW USER TO DATABASE -- //
export async function upsertUser(profileData: User, token: string) {
  const res = await request
    .post('/api/vi/user')
    .set('Authorization', `Bearer ${token}`)
    .send(profileData);

  return res.body
}

// -- VIEW USER IN DATABASE -- //

export async function getUser(token: string) {
  const res = await request
  .get('/api/vi/user')
  .set('Authorization', `Bearer ${token}`)
  .set('Content-Type', 'application/json')

  return res.body as User
}