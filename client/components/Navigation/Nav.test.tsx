// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import nock from 'nock'
import Nav from './Nav'

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

const mockUser = {
  sub: 'auth0|123',
  name: 'Nikki Cupples',
  email: 'example@gmail.com',
  birthdate: '2002-10-22',
  picture: 'https://example.com/avatar.jpg',
}

const queryClient = new QueryClient()

describe('Nav Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    nock.cleanAll()
  })

  afterEach(() => {
    queryClient.clear()
  })

  it('shows user info when authenticated', () => {
    vi.fn().mockReturnValue({
      user: mockUser,
      isAuthenticated: true,
      logout: vi.fn(),
      loginWithRedirect: vi.fn(),
    })

    render(
      <QueryClientProvider client={queryClient}>
        <Nav />
      </QueryClientProvider>,
    )

    const userImg = screen.getByRole('img')

    expect(userImg).not.toBeNull()
    expect(screen.getByText('Sign out')).not.toBeNull()
  })

  it.todo('shows sign-in button when not authenticated', () => {
    vi.fn().mockReturnValue({
      sub: null,
      isAuthenticated: false,
      logout: vi.fn(),
      loginWithRedirect: vi.fn(),
    })

    render(
      <QueryClientProvider client={queryClient}>
        <Nav />
      </QueryClientProvider>,
    )

    expect(screen.getByText('Sign in')).not.toBeNull()
  })
})
