import { endpoint } from '../endpoint'
import type {
  Collection,
  SearchTracksResponse,
  SoundCloudActivity,
  SoundCloudComment,
  SoundCloudLike,
  SoundCloudPlayHistoryContext,
  SoundCloudPlaylist,
  SoundCloudStreamUrl,
  SoundCloudTsubToken,
  SoundCloudTrack,
  SoundCloudUser,
} from './types'

interface ClientQuery {
  readonly client_id?: string
  readonly app_version?: string | number
  readonly app_locale?: string
}

interface PaginationQuery {
  readonly limit?: number
  readonly offset?: number | string
  readonly linked_partitioning?: 1 | boolean
}

interface TrackIdParams {
  readonly trackId: number | string
}

interface UserIdParams {
  readonly userId: number | string
}

interface PlaylistIdParams {
  readonly playlistId: number | string
}

interface UserFollowedByParams {
  readonly userId: number | string
  readonly followedByUserId: number | string
}

interface UserNotFollowedByParams {
  readonly userId: number | string
  readonly notFollowedByUserId: number | string
}

interface MediaHlsParams {
  readonly trackId: number | string
  readonly transcodingId: string
}

interface SoundCloudUserUrnParams {
  readonly userUrn: `soundcloud:users:${number | string}`
}

interface SoundCloudPlaylistUrnParams {
  readonly playlistUrn: `soundcloud:playlists:${number | string}`
}

interface TracksQuery extends ClientQuery {
  readonly ids: string | readonly (number | string)[]
}

interface PlaylistQuery extends ClientQuery {
  readonly representation?: 'full' | 'mini' | string
  readonly secret_token?: string
}

interface RepresentationQuery extends ClientQuery, PaginationQuery {
  readonly representation?: 'mini' | '' | string
}

interface SearchQuery extends ClientQuery, PaginationQuery {
  readonly q: string
  readonly facet?: string
  readonly user_id?: number | string
  readonly 'filter.content_tier'?: string
}

interface QueriesSearchQuery extends ClientQuery, PaginationQuery {
  readonly q: string
}

interface CommentsQuery extends ClientQuery, PaginationQuery {
  readonly threaded?: 0 | 1 | boolean
  readonly sort?: 'newest' | string
  readonly secret_token?: string
}

interface TrackRelatedQuery extends ClientQuery, PaginationQuery {
  readonly user_id?: number | string
}

interface RelatedArtistsQuery extends ClientQuery, PaginationQuery {
  readonly creators_only?: boolean
  readonly page_size?: number
}

interface StatsTopTracksQuery extends ClientQuery, PaginationQuery {
  readonly from: number | string
  readonly to: number | string
}

interface StreamQuery extends ClientQuery, PaginationQuery {
  readonly activityTypes?: string
  readonly consent_string?: string
  readonly device_locale?: string
  readonly promoted_playlist?: boolean | string
  readonly tcf_version?: number | string
  readonly user_urn?: string
}

interface MediaHlsQuery extends Pick<ClientQuery, 'client_id'> {
  readonly track_authorization: string
}

interface TsubSubscribeQuery extends Pick<ClientQuery, 'client_id'> {
  readonly auth: string
  readonly registrationID: string
}

interface PlayHistoryBody {
  readonly track_urn?: string
  readonly context_urn?: string
  readonly played_at?: string
  readonly [key: string]: unknown
}

type IdListResponse = readonly number[]
type ActivitiesResponse = Collection<SoundCloudActivity>
type StreamResponse = Collection<SoundCloudActivity>
type LibraryResponse = Collection<SoundCloudActivity>
type SearchResponse = Collection<SoundCloudTrack | SoundCloudUser | SoundCloudPlaylist>
type MeResponse = SoundCloudUser | Record<string, unknown>
type PrivacySettingsResponse = Record<string, unknown>
type VerifiedProfileResponse = Record<string, unknown>
type WebProfilesResponse = readonly Record<string, unknown>[]
type PlayHistoryContextsResponse = Collection<SoundCloudPlayHistoryContext>
type StreamUrlResponse = SoundCloudStreamUrl
type SuggestedTagsResponse = Collection<unknown>
type StatsTopTracksResponse = Collection<unknown>
type TsubTokenResponse = SoundCloudTsubToken
type TsubSubscribeResponse = string

export const v2Endpoints = {
  'GET /tracks': endpoint<'GET', '/tracks', undefined, TracksQuery, undefined, readonly SoundCloudTrack[]>({
    method: 'GET',
    path: '/tracks',
  }),
  'GET /users/:userId': endpoint<'GET', '/users/:userId', UserIdParams, ClientQuery, undefined, SoundCloudUser>({
    method: 'GET',
    path: '/users/:userId',
  }),
  'GET /playlists/:playlistId': endpoint<
    'GET',
    '/playlists/:playlistId',
    PlaylistIdParams,
    PlaylistQuery,
    undefined,
    SoundCloudPlaylist
  >({
    method: 'GET',
    path: '/playlists/:playlistId',
  }),
  'GET /tracks/:trackId/comments': endpoint<
    'GET',
    '/tracks/:trackId/comments',
    TrackIdParams,
    CommentsQuery,
    undefined,
    Collection<SoundCloudComment>
  >({
    method: 'GET',
    path: '/tracks/:trackId/comments',
  }),
  'GET /tracks/:trackId/related': endpoint<
    'GET',
    '/tracks/:trackId/related',
    TrackIdParams,
    TrackRelatedQuery,
    undefined,
    Collection<SoundCloudTrack>
  >({
    method: 'GET',
    path: '/tracks/:trackId/related',
  }),
  'GET /tracks/:trackId/albums': endpoint<
    'GET',
    '/tracks/:trackId/albums',
    TrackIdParams,
    RepresentationQuery,
    undefined,
    Collection<SoundCloudPlaylist>
  >({
    method: 'GET',
    path: '/tracks/:trackId/albums',
  }),
  'GET /tracks/:trackId/playlists_without_albums': endpoint<
    'GET',
    '/tracks/:trackId/playlists_without_albums',
    TrackIdParams,
    RepresentationQuery,
    undefined,
    Collection<SoundCloudPlaylist>
  >({
    method: 'GET',
    path: '/tracks/:trackId/playlists_without_albums',
  }),
  'GET /tracks/:trackId/likers': endpoint<
    'GET',
    '/tracks/:trackId/likers',
    TrackIdParams,
    ClientQuery & PaginationQuery,
    undefined,
    Collection<SoundCloudUser>
  >({
    method: 'GET',
    path: '/tracks/:trackId/likers',
  }),
  'GET /tracks/:trackId/reposters': endpoint<
    'GET',
    '/tracks/:trackId/reposters',
    TrackIdParams,
    ClientQuery & PaginationQuery,
    undefined,
    Collection<SoundCloudUser>
  >({
    method: 'GET',
    path: '/tracks/:trackId/reposters',
  }),
  'GET /playlists/:playlistId/likers': endpoint<
    'GET',
    '/playlists/:playlistId/likers',
    PlaylistIdParams,
    ClientQuery & PaginationQuery,
    undefined,
    Collection<SoundCloudUser>
  >({
    method: 'GET',
    path: '/playlists/:playlistId/likers',
  }),
  'GET /playlists/:playlistId/reposters': endpoint<
    'GET',
    '/playlists/:playlistId/reposters',
    PlaylistIdParams,
    ClientQuery & PaginationQuery,
    undefined,
    Collection<SoundCloudUser>
  >({
    method: 'GET',
    path: '/playlists/:playlistId/reposters',
  }),
  'GET /users/:userId/tracks': endpoint<
    'GET',
    '/users/:userId/tracks',
    UserIdParams,
    RepresentationQuery,
    undefined,
    Collection<SoundCloudTrack>
  >({
    method: 'GET',
    path: '/users/:userId/tracks',
  }),
  'GET /users/:userId/toptracks': endpoint<
    'GET',
    '/users/:userId/toptracks',
    UserIdParams,
    ClientQuery & PaginationQuery,
    undefined,
    Collection<SoundCloudTrack>
  >({
    method: 'GET',
    path: '/users/:userId/toptracks',
  }),
  'GET /users/:userId/track_likes': endpoint<
    'GET',
    '/users/:userId/track_likes',
    UserIdParams,
    ClientQuery & Pick<PaginationQuery, 'limit' | 'offset'>,
    undefined,
    Collection<SoundCloudLike>
  >({
    method: 'GET',
    path: '/users/:userId/track_likes',
  }),
  'GET /users/:userId/albums': endpoint<
    'GET',
    '/users/:userId/albums',
    UserIdParams,
    RepresentationQuery,
    undefined,
    Collection<SoundCloudPlaylist>
  >({
    method: 'GET',
    path: '/users/:userId/albums',
  }),
  'GET /users/:userId/playlists_without_albums': endpoint<
    'GET',
    '/users/:userId/playlists_without_albums',
    UserIdParams,
    RepresentationQuery,
    undefined,
    Collection<SoundCloudPlaylist>
  >({
    method: 'GET',
    path: '/users/:userId/playlists_without_albums',
  }),
  'GET /users/:userId/likes': endpoint<
    'GET',
    '/users/:userId/likes',
    UserIdParams,
    ClientQuery & PaginationQuery,
    undefined,
    Collection<SoundCloudLike>
  >({
    method: 'GET',
    path: '/users/:userId/likes',
  }),
  'GET /users/:userId/comments': endpoint<
    'GET',
    '/users/:userId/comments',
    UserIdParams,
    ClientQuery & PaginationQuery,
    undefined,
    Collection<SoundCloudComment>
  >({
    method: 'GET',
    path: '/users/:userId/comments',
  }),
  'GET /users/:userId/followers': endpoint<
    'GET',
    '/users/:userId/followers',
    UserIdParams,
    ClientQuery & PaginationQuery,
    undefined,
    Collection<SoundCloudUser>
  >({
    method: 'GET',
    path: '/users/:userId/followers',
  }),
  'GET /users/:userId/followings': endpoint<
    'GET',
    '/users/:userId/followings',
    UserIdParams,
    ClientQuery & PaginationQuery,
    undefined,
    Collection<SoundCloudUser>
  >({
    method: 'GET',
    path: '/users/:userId/followings',
  }),
  'GET /users/:userId/followers/followed_by/:followedByUserId': endpoint<
    'GET',
    '/users/:userId/followers/followed_by/:followedByUserId',
    UserFollowedByParams,
    ClientQuery & PaginationQuery,
    undefined,
    Collection<SoundCloudUser>
  >({
    method: 'GET',
    path: '/users/:userId/followers/followed_by/:followedByUserId',
  }),
  'GET /users/:userId/followings/not_followed_by/:notFollowedByUserId': endpoint<
    'GET',
    '/users/:userId/followings/not_followed_by/:notFollowedByUserId',
    UserNotFollowedByParams,
    ClientQuery & PaginationQuery,
    undefined,
    Collection<SoundCloudUser>
  >({
    method: 'GET',
    path: '/users/:userId/followings/not_followed_by/:notFollowedByUserId',
  }),
  'GET /users/:userId/featured-profiles': endpoint<
    'GET',
    '/users/:userId/featured-profiles',
    UserIdParams,
    ClientQuery & PaginationQuery,
    undefined,
    Collection<SoundCloudUser>
  >({
    method: 'GET',
    path: '/users/:userId/featured-profiles',
  }),
  'GET /users/:userId/relatedartists': endpoint<
    'GET',
    '/users/:userId/relatedartists',
    UserIdParams,
    RelatedArtistsQuery,
    undefined,
    Collection<SoundCloudUser>
  >({
    method: 'GET',
    path: '/users/:userId/relatedartists',
  }),
  'GET /users/:userId/spotlight': endpoint<
    'GET',
    '/users/:userId/spotlight',
    UserIdParams,
    ClientQuery & PaginationQuery,
    undefined,
    Collection<SoundCloudTrack | SoundCloudPlaylist>
  >({
    method: 'GET',
    path: '/users/:userId/spotlight',
  }),
  'GET /users/:userUrn/web-profiles': endpoint<
    'GET',
    '/users/:userUrn/web-profiles',
    SoundCloudUserUrnParams,
    ClientQuery,
    undefined,
    WebProfilesResponse
  >({
    method: 'GET',
    path: '/users/:userUrn/web-profiles',
  }),
  'GET /users/:userUrn/stats/top-lists/plays/track': endpoint<
    'GET',
    '/users/:userUrn/stats/top-lists/plays/track',
    SoundCloudUserUrnParams,
    StatsTopTracksQuery,
    undefined,
    StatsTopTracksResponse
  >({
    method: 'GET',
    path: '/users/:userUrn/stats/top-lists/plays/track',
  }),
  'GET /search': endpoint<'GET', '/search', undefined, SearchQuery, undefined, SearchResponse>({
    method: 'GET',
    path: '/search',
  }),
  'GET /search/tracks': endpoint<
    'GET',
    '/search/tracks',
    undefined,
    SearchQuery,
    undefined,
    SearchTracksResponse
  >({
    method: 'GET',
    path: '/search/tracks',
  }),
  'GET /search/users': endpoint<'GET', '/search/users', undefined, SearchQuery, undefined, Collection<SoundCloudUser>>({
    method: 'GET',
    path: '/search/users',
  }),
  'GET /search/albums': endpoint<
    'GET',
    '/search/albums',
    undefined,
    SearchQuery,
    undefined,
    Collection<SoundCloudPlaylist>
  >({
    method: 'GET',
    path: '/search/albums',
  }),
  'GET /search/playlists_without_albums': endpoint<
    'GET',
    '/search/playlists_without_albums',
    undefined,
    SearchQuery,
    undefined,
    Collection<SoundCloudPlaylist>
  >({
    method: 'GET',
    path: '/search/playlists_without_albums',
  }),
  'GET /search/queries': endpoint<
    'GET',
    '/search/queries',
    undefined,
    QueriesSearchQuery,
    undefined,
    Collection<unknown>
  >({
    method: 'GET',
    path: '/search/queries',
  }),
  'GET /stream': endpoint<'GET', '/stream', undefined, StreamQuery, undefined, StreamResponse>({
    method: 'GET',
    path: '/stream',
  }),
  'GET /stream/users/:userId': endpoint<
    'GET',
    '/stream/users/:userId',
    UserIdParams,
    ClientQuery & PaginationQuery,
    undefined,
    StreamResponse
  >({
    method: 'GET',
    path: '/stream/users/:userId',
  }),
  'GET /stream/users/:userId/reposts': endpoint<
    'GET',
    '/stream/users/:userId/reposts',
    UserIdParams,
    ClientQuery & PaginationQuery,
    undefined,
    StreamResponse
  >({
    method: 'GET',
    path: '/stream/users/:userId/reposts',
  }),
  'GET /activities': endpoint<'GET', '/activities', undefined, ClientQuery & Pick<PaginationQuery, 'limit' | 'linked_partitioning'>, undefined, ActivitiesResponse>({
    method: 'GET',
    path: '/activities',
  }),
  'GET /recent-tracks/:tag': endpoint<
    'GET',
    '/recent-tracks/:tag',
    { readonly tag: string },
    ClientQuery & PaginationQuery,
    undefined,
    Collection<SoundCloudTrack>
  >({
    method: 'GET',
    path: '/recent-tracks/:tag',
  }),
  'GET /media/:trackUrn/:transcodingId/stream/hls': endpoint<
    'GET',
    '/media/soundcloud:tracks::trackId/:transcodingId/stream/hls',
    MediaHlsParams,
    MediaHlsQuery,
    undefined,
    StreamUrlResponse
  >({
    method: 'GET',
    path: '/media/soundcloud:tracks::trackId/:transcodingId/stream/hls',
  }),
  'GET /media/:trackUrn/:transcodingId/stream/progressive': endpoint<
    'GET',
    '/media/soundcloud:tracks::trackId/:transcodingId/stream/progressive',
    MediaHlsParams,
    MediaHlsQuery,
    undefined,
    StreamUrlResponse
  >({
    method: 'GET',
    path: '/media/soundcloud:tracks::trackId/:transcodingId/stream/progressive',
  }),
  'GET /tags/suggested/:playlistUrn': endpoint<
    'GET',
    '/tags/suggested/:playlistUrn',
    SoundCloudPlaylistUrnParams,
    ClientQuery & PaginationQuery,
    undefined,
    SuggestedTagsResponse
  >({
    method: 'GET',
    path: '/tags/suggested/:playlistUrn',
  }),
  'GET /tsub/token': endpoint<'GET', '/tsub/token', undefined, ClientQuery, undefined, TsubTokenResponse>({
    method: 'GET',
    path: '/tsub/token',
  }),
  'GET /tsub/subscribe': endpoint<
    'GET',
    '/tsub/subscribe',
    undefined,
    TsubSubscribeQuery,
    undefined,
    TsubSubscribeResponse
  >({
    method: 'GET',
    path: '/tsub/subscribe',
  }),
  'GET /me': endpoint<'GET', '/me', undefined, Pick<ClientQuery, 'client_id'>, undefined, MeResponse>({
    method: 'GET',
    path: '/me',
  }),
  'POST /me': endpoint<'POST', '/me', undefined, Pick<ClientQuery, 'client_id'>, unknown, MeResponse>({
    method: 'POST',
    path: '/me',
  }),
  'GET /me/settings/privacy': endpoint<
    'GET',
    '/me/settings/privacy',
    undefined,
    Pick<ClientQuery, 'client_id'>,
    undefined,
    PrivacySettingsResponse
  >({
    method: 'GET',
    path: '/me/settings/privacy',
  }),
  'GET /me/verified-profile': endpoint<
    'GET',
    '/me/verified-profile',
    undefined,
    ClientQuery,
    undefined,
    VerifiedProfileResponse
  >({
    method: 'GET',
    path: '/me/verified-profile',
  }),
  'GET /me/library/all': endpoint<
    'GET',
    '/me/library/all',
    undefined,
    ClientQuery & PaginationQuery,
    undefined,
    LibraryResponse
  >({
    method: 'GET',
    path: '/me/library/all',
  }),
  'GET /me/play-history/contexts': endpoint<
    'GET',
    '/me/play-history/contexts',
    undefined,
    ClientQuery & PaginationQuery,
    undefined,
    PlayHistoryContextsResponse
  >({
    method: 'GET',
    path: '/me/play-history/contexts',
  }),
  'POST /me/play-history': endpoint<'POST', '/me/play-history', undefined, ClientQuery, PlayHistoryBody, undefined>({
    method: 'POST',
    path: '/me/play-history',
  }),
  'GET /me/mutings/users/ids': endpoint<
    'GET',
    '/me/mutings/users/ids',
    undefined,
    ClientQuery & Pick<PaginationQuery, 'limit' | 'linked_partitioning'>,
    undefined,
    IdListResponse
  >({
    method: 'GET',
    path: '/me/mutings/users/ids',
  }),
  'GET /me/shortcuts/followings': endpoint<
    'GET',
    '/me/shortcuts/followings',
    undefined,
    ClientQuery & PaginationQuery,
    undefined,
    Collection<SoundCloudUser>
  >({
    method: 'GET',
    path: '/me/shortcuts/followings',
  }),
  'GET /me/shortcuts/own-tracks': endpoint<
    'GET',
    '/me/shortcuts/own-tracks',
    undefined,
    ClientQuery & PaginationQuery,
    undefined,
    Collection<SoundCloudTrack>
  >({
    method: 'GET',
    path: '/me/shortcuts/own-tracks',
  }),
  'GET /me/shortcuts/track-likes': endpoint<
    'GET',
    '/me/shortcuts/track-likes',
    undefined,
    ClientQuery & PaginationQuery,
    undefined,
    Collection<SoundCloudTrack>
  >({
    method: 'GET',
    path: '/me/shortcuts/track-likes',
  }),
  'GET /me/track_reposts/ids': endpoint<
    'GET',
    '/me/track_reposts/ids',
    undefined,
    ClientQuery & Pick<PaginationQuery, 'limit'>,
    undefined,
    IdListResponse
  >({
    method: 'GET',
    path: '/me/track_reposts/ids',
  }),
  'GET /me/playlist_reposts/ids': endpoint<
    'GET',
    '/me/playlist_reposts/ids',
    undefined,
    ClientQuery & Pick<PaginationQuery, 'limit'>,
    undefined,
    IdListResponse
  >({
    method: 'GET',
    path: '/me/playlist_reposts/ids',
  }),
} as const

export type V2Endpoints = typeof v2Endpoints
export type V2EndpointKey = keyof V2Endpoints
