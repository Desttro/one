import type { Endpoint } from 'one'

export const GET: Endpoint = async (request) => {
    console.log(request)
  return Response.json({
    hello: 'world'
  })
}


// // Durable Object endpoint - trigger DO to start watching
// app.get("/api/do/init", async (c) => {
// 	// Get or create a DO instance with a fixed ID
// 	const id = c.env.ZERO_DO.idFromName("/");
// 	const stub = c.env.ZERO_DO.get(id);

// 	// Call init to trigger the DO to start watching messages
// 	const doUrl = new URL(c.req.url);
// 	doUrl.pathname = "/init";

// 	return await stub.fetch(doUrl);
// });