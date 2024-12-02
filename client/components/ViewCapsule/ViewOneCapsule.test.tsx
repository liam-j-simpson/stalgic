// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest'
import nock from 'nock'
import { getCapsuleById } from '../../apis/api'
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

describe('List one capsule by ID', () => {
  afterEach(() => {
    nock.cleanAll()
  })
  
  it('GET BY ID route should return one capsule', async () => {
    const mockCapsuleData = { singleCapsule: {
      title: 'Guasha Progress',
      time: '30/11/2026 14:00',
      description: 'Contour that face',
      tags: ['health', 'wellbeing'],
      id: 1,
    }}

    const getScope = nock('http://localhost')
      .get('/api/v1/capsule/1')
      .reply(200, mockCapsuleData)

    const { getAccessTokenSilently } = useAuth0()
    const token = await getAccessTokenSilently()

    const result = await getCapsuleById(token, 1)

    expect(result).toEqual(mockCapsuleData.singleCapsule)
    expect(getScope.isDone()).toBeTruthy()
  })
})
