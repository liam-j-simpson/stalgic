// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest'
import nock from 'nock'
import { deleteCapsule } from '../../apis/api'
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

describe('Delete one capsule by ID', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('DELETE BY ID route should remove capsule and all associated data', async () => {
    const mockCapsuleData = {
      title: 'Guasha Progress',
      time: '30/11/2026 14:00',
      description: 'Contour that face',
      tags: ['health', 'wellbeing'],
      id: 1,
    }

    const getScope = nock('http://localhost')
      .delete('/api/v1/capsule/1')
      .reply(200, mockCapsuleData)

    const { getAccessTokenSilently } = useAuth0()
    const token = await getAccessTokenSilently()

    const result = await deleteCapsule(token, 1)

    expect(result).toBeUndefined()
    expect(getScope.isDone()).toBeTruthy()
  })
})
