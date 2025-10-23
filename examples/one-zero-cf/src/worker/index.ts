// import server from '../dist/server/index.js'

// `server` by měl exportovat Honovou aplikaci nebo objekt s fetch.
// U One jej často získáte jako default export.
// export default {
//   async fetch(request: Request, env: any, ctx: ExecutionContext) {
//     // předejte env do serveru; podle potřeby doplňte context
//     return server.fetch(request, env, ctx)
//   },
// }


export default {
	async fetch(request, env, ctx): Promise<Response> {
		return new Response('Hello World!');
	},
} satisfies ExportedHandler<Env>;