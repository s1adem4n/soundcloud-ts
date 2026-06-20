import { describe, expect, expectTypeOf, test, vi } from 'vitest'
import { SoundCloudApiError, SoundCloudClient } from '../src'
import type { FetchLike, SoundCloudTrack } from '../src'
import { searchTracksResponseSchema, trackSchema } from '../src/v2/schemas'

describe('SoundCloudClient', () => {
  test('requests a typed v2 endpoint', async () => {
    const fetch = vi.fn<FetchLike>(async () => jsonResponse([{ id: 123, title: 'A track' }]))
    const client = new SoundCloudClient({
      accessToken: 'access-token',
      clientId: 'client-id',
      baseUrl: 'https://example.test',
      fetch,
    })

    const tracks = await client.v2.request('GET /tracks', {
      query: { ids: [123], app_locale: 'en' },
    })

    expectTypeOf(tracks).toEqualTypeOf<readonly SoundCloudTrack[]>()
    expect(tracks[0]?.title).toBe('A track')
    expect(fetch).toHaveBeenCalledWith(
      new URL('https://example.test/tracks?client_id=client-id&ids=123&app_locale=en'),
      expect.objectContaining({
        headers: expect.objectContaining(new Headers({ authorization: 'OAuth access-token' })),
        method: 'GET',
      }),
    )
  })

  test('serializes array query values like the web api capture', async () => {
    const fetch = vi.fn<FetchLike>(async () => jsonResponse([]))
    const client = new SoundCloudClient({
      accessToken: 'access-token',
      baseUrl: 'https://example.test',
      fetch,
    })

    await client.v2.request('GET /tracks', {
      query: { ids: [123, 456] },
    })

    expect(fetch.mock.calls[0]?.[0]).toEqual(new URL('https://example.test/tracks?ids=123%2C456'))
  })

  test('supports newly captured playlist social endpoints', async () => {
    const fetch = vi.fn<FetchLike>(async () => jsonResponse({ collection: [] }))
    const client = new SoundCloudClient({
      accessToken: 'access-token',
      baseUrl: 'https://example.test',
      fetch,
    })

    await client.v2.request('GET /playlists/:playlistId/likers', {
      params: { playlistId: 1734884394 },
      query: { limit: 9, offset: 0, linked_partitioning: 1 },
    })

    expect(fetch.mock.calls[0]?.[0]).toEqual(
      new URL('https://example.test/playlists/1734884394/likers?limit=9&offset=0&linked_partitioning=1'),
    )
  })

  test('allows request query to override the default client id', async () => {
    const fetch = vi.fn<FetchLike>(async () => jsonResponse([{ id: 123, title: 'A track' }]))
    const client = new SoundCloudClient({
      accessToken: 'access-token',
      clientId: 'default-id',
      baseUrl: 'https://example.test',
      fetch,
    })

    await client.v2.request('GET /tracks', {
      query: { ids: '123', client_id: 'request-id' },
    })

    expect(fetch.mock.calls[0]?.[0]).toEqual(new URL('https://example.test/tracks?client_id=request-id&ids=123'))
  })

  test('allows request headers to override the default authorization header', async () => {
    const fetch = vi.fn<FetchLike>(async () => jsonResponse([{ id: 123, title: 'A track' }]))
    const client = new SoundCloudClient({
      accessToken: 'default-token',
      baseUrl: 'https://example.test',
      fetch,
    })

    await client.v2.request('GET /tracks', {
      query: { ids: '123' },
      headers: { authorization: 'Bearer request-token' },
    })

    expect(fetch.mock.calls[0]?.[1]?.headers).toEqual(expect.objectContaining(new Headers({ authorization: 'Bearer request-token' })))
  })

  test('throws an api error for non-2xx responses', async () => {
    const fetch = vi.fn<FetchLike>(async () =>
      jsonResponse({ message: 'bad id' }, { status: 404, statusText: 'Not Found' }),
    )
    const client = new SoundCloudClient({
      baseUrl: 'https://example.test',
      fetch,
    })

    await expect(
      client.v2.request('GET /tracks', {
        query: { ids: '123' },
      }),
    ).rejects.toMatchObject({
      name: 'SoundCloudApiError',
      status: 404,
      body: { message: 'bad id' },
    } satisfies Partial<SoundCloudApiError>)
  })
})

describe('v2 schemas', () => {
  test('parses track payloads while preserving unknown fields', () => {
    const track = trackSchema.parse({
      id: 123,
      kind: 'track',
      title: 'A track',
      user: {
        id: 456,
        username: 'artist',
      },
      soundcloud_extra: true,
    })

    expect(track.title).toBe('A track')
    expect(track.soundcloud_extra).toBe(true)
  })

  test('parses paginated track search responses', () => {
    const result = searchTracksResponseSchema.parse({
      collection: [{ id: 1, title: 'first' }],
      next_href: 'https://api-v2.soundcloud.com/search/tracks?offset=10',
    })

    expect(result.collection[0]?.title).toBe('first')
  })
})

function jsonResponse(body: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(body), {
    headers: { 'content-type': 'application/json' },
    ...init,
  })
}
