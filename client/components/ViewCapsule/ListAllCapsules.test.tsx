//@vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest'
import nock from 'nock'
import { getCapsules } from '../../apis/api'
import { useAuth0 } from '@auth0/auth0-react'

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

describe('List all capsules', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('GET route should return a users capsule data', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/capsule/')
      .reply(200, [
        {
          title: 'Guasha Progress',
          time: '30/11/2026 14:00',
          description: 'Contour that face',
          tags: ['health', 'wellbeing'],
          id: 1,
        },
        {
          title: 'Painting',
          time: '01/08/2025 09:00',
          description: 'Photos from over the years, super cool',
          tags: ['art', 'design'],
          id: 3,
        },
      ])

    const { getAccessTokenSilently } = useAuth0()
    const token = await getAccessTokenSilently()

    const data = await getCapsules(token)
    expect(data).toEqual([
      {
        title: 'Guasha Progress',
        time: '30/11/2026 14:00',
        description: 'Contour that face',
        tags: ['health', 'wellbeing'],
        id: 1,
      },
      {
        title: 'Painting',
        time: '01/08/2025 09:00',
        description: 'Photos from over the years, super cool',
        tags: ['art', 'design'],
        id: 3,
      },
    ])

    expect(scope.isDone()).toBe(true)
  })

  it.todo('should throw an error if the API call fails', () => {})
})
