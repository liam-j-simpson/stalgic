// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import LoadingPage from './LoadingPage'
import { waitFor } from '@testing-library/react'
import { render } from '@testing-library/react'

vi.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    user: {
      sub: 'auth0|123',
      email: '',
    },
    isAuthenticated: true,
    getAccessTokenSilently: vi.fn(() => 'token'),
  }),
}))

describe('Loading page', () => {
  it('renders loading page', async () => {
    const screen = render(<LoadingPage />)
    const loadingDiv = await waitFor(() => screen.findAllByTestId('loading'))

    expect(loadingDiv).toBeDefined()
  })
})
