export type { HttpMethod } from '../endpoint'

export interface Collection<T> {
  readonly collection: readonly T[]
  readonly next_href?: string | null
  readonly query_urn?: string | null
}

export interface SoundCloudBadges {
  readonly pro?: boolean
  readonly creator_mid_tier?: boolean
  readonly pro_unlimited?: boolean
  readonly verified?: boolean
  readonly [key: string]: unknown
}

export interface SoundCloudVisual {
  readonly urn?: string
  readonly entry_time?: number
  readonly visual_url?: string
  readonly [key: string]: unknown
}

export interface SoundCloudVisuals {
  readonly urn?: string
  readonly enabled?: boolean
  readonly visuals?: readonly SoundCloudVisual[]
  readonly tracking?: unknown
  readonly [key: string]: unknown
}

export interface SoundCloudUserSummary {
  readonly id: number
  readonly kind?: 'user'
  readonly username: string
  readonly first_name?: string
  readonly full_name?: string
  readonly last_modified?: string
  readonly last_name?: string
  readonly followers_count?: number
  readonly permalink?: string
  readonly permalink_url?: string
  readonly avatar_url?: string
  readonly badges?: SoundCloudBadges
  readonly city?: string | null
  readonly country_code?: string | null
  readonly station_urn?: string
  readonly station_permalink?: string
  readonly urn?: string
  readonly uri?: string
  readonly verified?: boolean
  readonly [key: string]: unknown
}

export interface SoundCloudUser extends SoundCloudUserSummary {
  readonly comments_count?: number
  readonly created_at?: string | null
  readonly creator_subscription?: Record<string, unknown>
  readonly creator_subscriptions?: readonly Record<string, unknown>[]
  readonly date_of_birth?: string | null
  readonly description?: string | null
  readonly followings_count?: number
  readonly groups_count?: number
  readonly likes_count?: number
  readonly playlist_likes_count?: number
  readonly playlist_count?: number
  readonly reposts_count?: number | null
  readonly track_count?: number
  readonly visuals?: SoundCloudVisuals | null
}

export interface SoundCloudComment {
  readonly id: number
  readonly kind?: 'comment'
  readonly body: string
  readonly created_at?: string
  readonly timestamp?: number | null
  readonly track_id?: number
  readonly user?: SoundCloudUserSummary
  readonly user_id?: number
  readonly [key: string]: unknown
}

export interface SoundCloudTranscoding {
  readonly url: string
  readonly preset?: string
  readonly duration?: number
  readonly snipped?: boolean
  readonly format?: {
    readonly protocol?: 'hls' | 'progressive' | string
    readonly mime_type?: string
    readonly [key: string]: unknown
  }
  readonly quality?: 'hq' | 'sq' | 'lq' | string
  readonly is_legacy_transcoding?: boolean
  readonly [key: string]: unknown
}

export interface SoundCloudTrackMedia {
  readonly transcodings?: readonly SoundCloudTranscoding[]
  readonly [key: string]: unknown
}

export interface SoundCloudPublisherMetadata {
  readonly id?: number
  readonly urn?: string
  readonly artist?: string
  readonly album_title?: string
  readonly contains_music?: boolean
  readonly explicit?: boolean
  readonly [key: string]: unknown
}

export interface SoundCloudTrack {
  readonly id: number
  readonly kind?: 'track'
  readonly title: string
  readonly user?: SoundCloudUserSummary
  readonly artwork_url?: string | null
  readonly caption?: string | null
  readonly commentable?: boolean
  readonly comment_count?: number
  readonly created_at?: string
  readonly description?: string | null
  readonly downloadable?: boolean
  readonly download_count?: number
  readonly display_date?: string
  readonly duration?: number
  readonly embeddable_by?: string
  readonly full_duration?: number
  readonly genre?: string
  readonly has_downloads_left?: boolean
  readonly label_name?: string | null
  readonly last_modified?: string
  readonly license?: string
  readonly likes_count?: number
  readonly media?: SoundCloudTrackMedia
  readonly monetization_model?: string
  readonly permalink?: string
  readonly permalink_url?: string
  readonly policy?: string
  readonly playback_count?: number
  readonly public?: boolean
  readonly publisher_metadata?: SoundCloudPublisherMetadata | null
  readonly purchase_title?: string | null
  readonly purchase_url?: string | null
  readonly release_date?: string | null
  readonly reposts_count?: number
  readonly secret_token?: string | null
  readonly sharing?: string
  readonly state?: string
  readonly station_urn?: string
  readonly station_permalink?: string
  readonly streamable?: boolean
  readonly tag_list?: string
  readonly track_authorization?: string
  readonly uri?: string
  readonly urn?: string
  readonly user_id?: number
  readonly visuals?: SoundCloudVisuals | null
  readonly waveform_url?: string
  readonly [key: string]: unknown
}

export interface SoundCloudPlaylist {
  readonly id: number
  readonly kind?: 'playlist' | 'system-playlist'
  readonly title: string
  readonly user?: SoundCloudUserSummary
  readonly artwork_url?: string | null
  readonly created_at?: string
  readonly description?: string | null
  readonly duration?: number
  readonly embeddable_by?: string
  readonly genre?: string
  readonly is_album?: boolean
  readonly label_name?: string | null
  readonly last_modified?: string
  readonly license?: string
  readonly likes_count?: number
  readonly managed_by_feeds?: boolean
  readonly permalink?: string
  readonly permalink_url?: string
  readonly public?: boolean
  readonly published_at?: string
  readonly purchase_title?: string | null
  readonly purchase_url?: string | null
  readonly release_date?: string | null
  readonly reposts_count?: number
  readonly secret_token?: string | null
  readonly set_type?: string
  readonly sharing?: string
  readonly tag_list?: string
  readonly track_count?: number
  readonly tracks?: readonly SoundCloudTrack[]
  readonly uri?: string
  readonly urn?: string
  readonly user_id?: number
  readonly [key: string]: unknown
}

export interface SoundCloudActivity {
  readonly created_at?: string
  readonly type?: string
  readonly user?: SoundCloudUserSummary
  readonly uuid?: string
  readonly cursor?: string
  readonly caption?: unknown
  readonly playlist?: SoundCloudPlaylist
  readonly track?: SoundCloudTrack
  readonly [key: string]: unknown
}

export interface SoundCloudLike {
  readonly created_at?: string
  readonly kind?: 'like' | string
  readonly track?: SoundCloudTrack
  readonly playlist?: SoundCloudPlaylist
  readonly [key: string]: unknown
}

export interface SoundCloudPlayHistoryContext {
  readonly played_at?: number
  readonly kind?: string
  readonly context_urn?: string
  readonly user?: SoundCloudUserSummary
  readonly station?: Record<string, unknown>
  readonly playlist?: SoundCloudPlaylist
  readonly system_playlist?: SoundCloudPlaylist | Record<string, unknown>
  readonly [key: string]: unknown
}

export interface SoundCloudStreamUrl {
  readonly url: string
  readonly [key: string]: unknown
}

export interface SoundCloudTsubToken {
  readonly token: string
  readonly [key: string]: unknown
}

export type SearchTracksResponse = Collection<SoundCloudTrack>
