import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import routes from './routes.tsx'
import { Auth0Provider } from '@auth0/auth0-react'

const router = createBrowserRouter(routes)
const queryClient = new QueryClient()

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    /**
     * TODO: replace domain, clientId, and audience
     * Adding routes for specific pages (see pages on ticket!), base off rcmndr
     */
    <Auth0Provider
      domain="pohutukawa-team-capsule.au.auth0.com"
      clientId="QS4QbabOn2jHsO2BEhpu3b4mViiKhndF
client secret: ajxrmg93NyjZt-kn982hUPxkcH63WVFlz5Si3JsBPjEA1ztZosh9qvWcRfKEvz7c"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: 'https://stalgic/api',
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Auth0Provider>,
  )
})
