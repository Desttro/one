import { createRequestHandler } from 'one/cloudflare'

const handleFetch = createRequestHandler(() => import('virtual:one/server-build'))

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    return handleFetch(request, env, ctx)
  },
}
