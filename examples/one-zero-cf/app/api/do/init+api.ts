import type { Endpoint } from 'one'

export const GET: Endpoint = async (request) => {
  return Response.json({
    hello: 'world',
  })
}
