import {defineLive} from 'next-sanity/live'
import {client} from '@/sanity/lib/client'
import {token} from '@/sanity/lib/token'
import {projectId} from '@/sanity/lib/api'

const isConfigured = projectId && projectId !== 'dummy' && projectId !== ''

const live = isConfigured
  ? defineLive({
      client,
      serverToken: token,
      browserToken: token,
    })
  : null

type SanityFetchParams = Parameters<NonNullable<typeof live>['sanityFetch']>[0]

export async function sanityFetch(params: SanityFetchParams) {
  if (!live) {
    return {data: null as any}
  }
  return live.sanityFetch(params)
}

export const SanityLive = live?.SanityLive ?? (() => null)
