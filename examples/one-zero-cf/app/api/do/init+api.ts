import type { Endpoint } from 'one'

export const GET: Endpoint = async (request, plaformContext) => {
  console.log('plaformContext', plaformContext)
  return Response.json({
    hello: 'world',
  })
}
