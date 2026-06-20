import type { BodyOf, EndpointMap, ParamsOf, QueryOf, ResponseOf } from './endpoint'
import { v2Endpoints, type V2Endpoints } from './v2/endpoints'

export type FetchLike = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>

export interface SoundCloudClientOptions {
  readonly accessToken?: string
  readonly authScheme?: 'Bearer' | 'OAuth'
  readonly clientId?: string
  readonly baseUrl?: string
  readonly fetch?: FetchLike
  readonly headers?: HeadersInit
}

export type RequestInput<TEndpoint> = (ParamsOf<TEndpoint> extends undefined
  ? { readonly params?: never }
  : { readonly params: ParamsOf<TEndpoint> }) &
  (QueryOf<TEndpoint> extends undefined
    ? { readonly query?: never }
    : { readonly query?: QueryOf<TEndpoint> }) &
  (BodyOf<TEndpoint> extends undefined
    ? { readonly body?: never }
    : { readonly body: BodyOf<TEndpoint> }) & {
    readonly headers?: HeadersInit
    readonly signal?: AbortSignal
  }

export type RequestArgs<TEndpoint> = ParamsOf<TEndpoint> extends undefined
  ? [input?: RequestInput<TEndpoint>, init?: RequestInit]
  : [input: RequestInput<TEndpoint>, init?: RequestInit]

export class SoundCloudApiError extends Error {
  readonly status: number
  readonly response: Response
  readonly body: unknown

  constructor(response: Response, body: unknown) {
    super(`SoundCloud API request failed with ${response.status} ${response.statusText}`)
    this.name = 'SoundCloudApiError'
    this.status = response.status
    this.response = response
    this.body = body
  }
}

export class SoundCloudClient {
  readonly v2: SoundCloudApi<V2Endpoints>

  constructor(options: SoundCloudClientOptions = {}) {
    this.v2 = new SoundCloudApi(v2Endpoints, {
      baseUrl: options.baseUrl ?? 'https://api-v2.soundcloud.com',
      accessToken: options.accessToken,
      authScheme: options.authScheme,
      clientId: options.clientId,
      fetch: options.fetch,
      headers: options.headers,
    })
  }
}

class SoundCloudApi<TEndpoints extends EndpointMap> {
  readonly #baseUrl: string
  readonly #accessToken?: string
  readonly #authScheme: 'Bearer' | 'OAuth'
  readonly #clientId?: string
  readonly #endpoints: TEndpoints
  readonly #fetch: FetchLike
  readonly #headers?: HeadersInit

  constructor(endpoints: TEndpoints, options: Required<Pick<SoundCloudClientOptions, 'baseUrl'>> & SoundCloudClientOptions) {
    this.#baseUrl = options.baseUrl
    this.#accessToken = options.accessToken
    this.#authScheme = options.authScheme ?? 'OAuth'
    this.#clientId = options.clientId
    this.#endpoints = endpoints
    this.#fetch = options.fetch ?? globalThis.fetch.bind(globalThis)
    this.#headers = options.headers
  }

  async request<TKey extends Extract<keyof TEndpoints, string>>(
    route: TKey,
    ...args: RequestArgs<TEndpoints[TKey]>
  ): Promise<ResponseOf<TEndpoints[TKey]>> {
    const [input, init] = args
    const endpoint = this.#endpoints[route]
    const url = buildUrl(this.#baseUrl, endpoint.path, input?.params, {
      client_id: this.#clientId,
      ...toQueryObject(input?.query),
    })
    const response = await this.#fetch(url, {
      ...init,
      method: endpoint.method,
      headers: mergeHeaders(this.#headers, input?.headers, init?.headers, input?.body, this.#accessToken, this.#authScheme),
      body: input?.body === undefined ? init?.body : JSON.stringify(input.body),
      signal: input?.signal ?? init?.signal,
    })

    const body = await readBody(response)
    if (!response.ok) {
      throw new SoundCloudApiError(response, body)
    }

    return body as ResponseOf<TEndpoints[TKey]>
  }
}

function buildUrl(
  baseUrl: string,
  pathTemplate: string,
  params: unknown,
  query: Record<string, unknown>,
): URL {
  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
  let path = pathTemplate.replace(/^\//, '')

  if (params && typeof params === 'object') {
    for (const [key, value] of Object.entries(params)) {
      path = path.replace(`:${key}`, encodeURIComponent(String(value)))
    }
  }

  if (/(^|[/]):[A-Za-z_]/.test(path) || /::[A-Za-z_]/.test(path)) {
    throw new TypeError(`Missing route params for ${pathTemplate}`)
  }

  const url = new URL(path, base)
  for (const [key, value] of Object.entries(query)) {
    appendQueryParam(url.searchParams, key, value)
  }
  return url
}

function appendQueryParam(searchParams: URLSearchParams, key: string, value: unknown): void {
  if (value === undefined || value === null) {
    return
  }
  if (Array.isArray(value)) {
    searchParams.append(key, value.map(String).join(','))
    return
  }
  searchParams.append(key, String(value))
}

function toQueryObject(query: unknown): Record<string, unknown> {
  if (query === undefined || query === null || typeof query !== 'object') {
    return {}
  }
  return query as Record<string, unknown>
}

function mergeHeaders(
  defaults: HeadersInit | undefined,
  input: HeadersInit | undefined,
  init: HeadersInit | undefined,
  body: unknown,
  accessToken: string | undefined,
  authScheme: 'Bearer' | 'OAuth',
): Headers {
  const headers = new Headers(defaults)
  mergeInto(headers, input)
  mergeInto(headers, init)
  if (accessToken !== undefined && !headers.has('authorization')) {
    headers.set('authorization', `${authScheme} ${accessToken}`)
  }
  if (body !== undefined && !headers.has('content-type')) {
    headers.set('content-type', 'application/json')
  }
  return headers
}

function mergeInto(headers: Headers, source: HeadersInit | undefined): void {
  if (source === undefined) {
    return
  }
  new Headers(source).forEach((value, key) => headers.set(key, value))
}

async function readBody(response: Response): Promise<unknown> {
  if (response.status === 204) {
    return undefined
  }

  const contentType = response.headers.get('content-type') ?? ''
  if (contentType.includes('application/json')) {
    return response.json()
  }

  return response.text()
}
