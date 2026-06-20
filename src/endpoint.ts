export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface Endpoint<
  Method extends HttpMethod,
  Path extends string,
  Params,
  Query,
  Body,
  Response,
> {
  readonly method: Method
  readonly path: Path
  readonly __types?: {
    readonly params: Params
    readonly query: Query
    readonly body: Body
    readonly response: Response
  }
}

export function endpoint<
  Method extends HttpMethod,
  Path extends string,
  Params = undefined,
  Query = undefined,
  Body = undefined,
  Response = unknown,
>(definition: {
  readonly method: Method
  readonly path: Path
}): Endpoint<Method, Path, Params, Query, Body, Response> {
  return definition
}

export type EndpointMap = Record<string, Endpoint<HttpMethod, string, unknown, unknown, unknown, unknown>>

export type ParamsOf<T> = T extends Endpoint<HttpMethod, string, infer Params, unknown, unknown, unknown>
  ? Params
  : never

export type QueryOf<T> = T extends Endpoint<HttpMethod, string, unknown, infer Query, unknown, unknown>
  ? Query
  : never

export type BodyOf<T> = T extends Endpoint<HttpMethod, string, unknown, unknown, infer Body, unknown>
  ? Body
  : never

export type ResponseOf<T> = T extends Endpoint<HttpMethod, string, unknown, unknown, unknown, infer Response>
  ? Response
  : never
