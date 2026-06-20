import { z } from 'zod'
import type {
  Collection,
  SearchTracksResponse,
  SoundCloudActivity,
  SoundCloudLike,
  SoundCloudPlayHistoryContext,
  SoundCloudPlaylist,
  SoundCloudStreamUrl,
  SoundCloudTrack,
  SoundCloudTranscoding,
  SoundCloudTsubToken,
  SoundCloudUser,
  SoundCloudUserSummary,
} from './types'

const looseObject = z.object({}).catchall(z.unknown())

const visualSchema = looseObject.extend({
  urn: z.string().optional(),
  entry_time: z.number().optional(),
  visual_url: z.string().optional(),
})

const visualsSchema = looseObject.extend({
  urn: z.string().optional(),
  enabled: z.boolean().optional(),
  visuals: z.array(visualSchema).optional(),
  tracking: z.unknown().optional(),
})

export const userSummarySchema = looseObject.extend({
  id: z.number(),
  kind: z.literal('user').optional(),
  username: z.string(),
  first_name: z.string().optional(),
  full_name: z.string().optional(),
  last_modified: z.string().optional(),
  last_name: z.string().optional(),
  followers_count: z.number().optional(),
  permalink: z.string().optional(),
  permalink_url: z.string().optional(),
  avatar_url: z.string().optional(),
  badges: looseObject
    .extend({
      pro: z.boolean().optional(),
      creator_mid_tier: z.boolean().optional(),
      pro_unlimited: z.boolean().optional(),
      verified: z.boolean().optional(),
    })
    .optional(),
  city: z.string().nullable().optional(),
  country_code: z.string().nullable().optional(),
  station_urn: z.string().optional(),
  station_permalink: z.string().optional(),
  urn: z.string().optional(),
  uri: z.string().optional(),
  verified: z.boolean().optional(),
}) satisfies z.ZodType<SoundCloudUserSummary>

export const userSchema = userSummarySchema.extend({
  comments_count: z.number().optional(),
  created_at: z.string().nullable().optional(),
  creator_subscription: z.record(z.string(), z.unknown()).optional(),
  creator_subscriptions: z.array(z.record(z.string(), z.unknown())).optional(),
  date_of_birth: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  followings_count: z.number().optional(),
  groups_count: z.number().optional(),
  likes_count: z.number().optional(),
  playlist_likes_count: z.number().optional(),
  playlist_count: z.number().optional(),
  reposts_count: z.number().nullable().optional(),
  track_count: z.number().optional(),
  visuals: looseObject
    .extend(visualsSchema.shape)
    .nullable()
    .optional(),
}) satisfies z.ZodType<SoundCloudUser>

export const transcodingSchema = looseObject.extend({
  url: z.string(),
  preset: z.string().optional(),
  duration: z.number().optional(),
  snipped: z.boolean().optional(),
  format: looseObject
    .extend({
      protocol: z.string().optional(),
      mime_type: z.string().optional(),
    })
    .optional(),
  quality: z.string().optional(),
  is_legacy_transcoding: z.boolean().optional(),
}) satisfies z.ZodType<SoundCloudTranscoding>

export const trackSchema = looseObject.extend({
  id: z.number(),
  kind: z.literal('track').optional(),
  title: z.string(),
  user: userSummarySchema.optional(),
  artwork_url: z.string().nullable().optional(),
  caption: z.string().nullable().optional(),
  commentable: z.boolean().optional(),
  comment_count: z.number().optional(),
  created_at: z.string().optional(),
  description: z.string().nullable().optional(),
  downloadable: z.boolean().optional(),
  download_count: z.number().optional(),
  display_date: z.string().optional(),
  duration: z.number().optional(),
  embeddable_by: z.string().optional(),
  full_duration: z.number().optional(),
  genre: z.string().optional(),
  has_downloads_left: z.boolean().optional(),
  label_name: z.string().nullable().optional(),
  last_modified: z.string().optional(),
  license: z.string().optional(),
  likes_count: z.number().optional(),
  media: looseObject
    .extend({
      transcodings: z.array(transcodingSchema).optional(),
    })
    .optional(),
  monetization_model: z.string().optional(),
  permalink: z.string().optional(),
  permalink_url: z.string().optional(),
  policy: z.string().optional(),
  playback_count: z.number().optional(),
  public: z.boolean().optional(),
  publisher_metadata: looseObject
    .extend({
      id: z.number().optional(),
      urn: z.string().optional(),
      artist: z.string().optional(),
      album_title: z.string().optional(),
      contains_music: z.boolean().optional(),
      explicit: z.boolean().optional(),
    })
    .nullable()
    .optional(),
  purchase_title: z.string().nullable().optional(),
  purchase_url: z.string().nullable().optional(),
  release_date: z.string().nullable().optional(),
  reposts_count: z.number().optional(),
  secret_token: z.string().nullable().optional(),
  sharing: z.string().optional(),
  state: z.string().optional(),
  station_urn: z.string().optional(),
  station_permalink: z.string().optional(),
  streamable: z.boolean().optional(),
  tag_list: z.string().optional(),
  track_authorization: z.string().optional(),
  uri: z.string().optional(),
  urn: z.string().optional(),
  user_id: z.number().optional(),
  visuals: visualsSchema.nullable().optional(),
  waveform_url: z.string().optional(),
}) satisfies z.ZodType<SoundCloudTrack>

export const playlistSchema = looseObject.extend({
  id: z.number(),
  kind: z.union([z.literal('playlist'), z.literal('system-playlist')]).optional(),
  title: z.string(),
  user: userSummarySchema.optional(),
  artwork_url: z.string().nullable().optional(),
  created_at: z.string().optional(),
  description: z.string().nullable().optional(),
  duration: z.number().optional(),
  embeddable_by: z.string().optional(),
  genre: z.string().optional(),
  is_album: z.boolean().optional(),
  label_name: z.string().nullable().optional(),
  last_modified: z.string().optional(),
  license: z.string().optional(),
  likes_count: z.number().optional(),
  managed_by_feeds: z.boolean().optional(),
  permalink: z.string().optional(),
  permalink_url: z.string().optional(),
  public: z.boolean().optional(),
  published_at: z.string().optional(),
  purchase_title: z.string().nullable().optional(),
  purchase_url: z.string().nullable().optional(),
  release_date: z.string().nullable().optional(),
  reposts_count: z.number().optional(),
  secret_token: z.string().nullable().optional(),
  set_type: z.string().optional(),
  sharing: z.string().optional(),
  tag_list: z.string().optional(),
  track_count: z.number().optional(),
  tracks: z.array(trackSchema).optional(),
  uri: z.string().optional(),
  urn: z.string().optional(),
  user_id: z.number().optional(),
}) satisfies z.ZodType<SoundCloudPlaylist>

export const collectionSchema = <T>(item: z.ZodType<T>): z.ZodType<Collection<T>> =>
  looseObject.extend({
    collection: z.array(item),
    next_href: z.string().nullable().optional(),
    query_urn: z.string().nullable().optional(),
  })

export const activitySchema = looseObject.extend({
  created_at: z.string().optional(),
  type: z.string().optional(),
  user: userSummarySchema.optional(),
  uuid: z.string().optional(),
  cursor: z.string().optional(),
  caption: z.unknown().optional(),
  playlist: playlistSchema.optional(),
  track: trackSchema.optional(),
}) satisfies z.ZodType<SoundCloudActivity>

export const likeSchema = looseObject.extend({
  created_at: z.string().optional(),
  kind: z.string().optional(),
  track: trackSchema.optional(),
  playlist: playlistSchema.optional(),
}) satisfies z.ZodType<SoundCloudLike>

export const playHistoryContextSchema = looseObject.extend({
  played_at: z.number().optional(),
  kind: z.string().optional(),
  context_urn: z.string().optional(),
  user: userSummarySchema.optional(),
  station: z.record(z.string(), z.unknown()).optional(),
  playlist: playlistSchema.optional(),
  system_playlist: z.union([playlistSchema, z.record(z.string(), z.unknown())]).optional(),
}) satisfies z.ZodType<SoundCloudPlayHistoryContext>

export const streamUrlSchema = looseObject.extend({
  url: z.string(),
}) satisfies z.ZodType<SoundCloudStreamUrl>

export const tsubTokenSchema = looseObject.extend({
  token: z.string(),
}) satisfies z.ZodType<SoundCloudTsubToken>

export const searchTracksResponseSchema = collectionSchema(trackSchema) satisfies z.ZodType<SearchTracksResponse>
