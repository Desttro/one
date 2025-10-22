# AGENTS.md

## Generated Artifacts & Non-Negotiables

- `worker-configuration.d.ts` is generated from the Cloudflare worker bindings. Never hand-edit it; rerun `yarn cf-typegen` after modifying `wrangler.jsonc` config or bindings.

## Setup

1. Install dependencies: `yarn install`
2. Configure GitHub OAuth:
   - Create GitHub App at https://github.com/settings/apps
   - Set callback URL: `http://localhost:8081/api/auth/callback/github`
   - Copy `.env.example` to `.env`
   - Fill `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`
3. Ensure Docker is running (recommend OrbStack on macOS)

## Development

Run in three separate terminals:

- Terminal 1: `yarn docker up`
- Terminal 2: `yarn zero`
- Terminal 3: `yarn dev`

For Tauri desktop app: `yarn dev:tauri`

Reset data: `yarn docker:start:clean`

## One Framework

One is a cross-platform React/React Native framework with Vite integration.
One is a framework that aims to make web and native development with React and React Native much simpler and faster.
One builds on Vite to serve both React web and React Native, it also provides file system–based routing, render modes, loaders, middleware, a CLI, Hono, and more.
To understand more about One, you should search for documentation (`apps/onestack.dev/data/docs/*.mdx`) under the site (`apps/onestack.dev`). This site contains guides, API references, and examples to help you grasp the framework's capabilities and practices.

### Core Features

- File system routing in `./app` directory
- Automatic route type generation (`routes.d.ts`)
- Loaders with tree shaking
- Platform-specific extensions: `.web.tsx`, `.native.tsx`, `.ios.tsx`, `.android.tsx`
- React version swapping: React 18 (native), React 19 (web)
- SSR-CSS plugin for dev-mode CSS
- Node module patching and optimization
- Routing modes: `+spa.tsx`, `+ssg.tsx`, `+ssr.tsx`, `+api.tsx`

### Build Commands

- Web build: `one build` or `one build web`
- Native builds: `one build ios` or `one build android`
- Production serve: `one serve` (requires prior build)
- Static serving: serve `dist/client` directory directly for SPA/SSG without loaders

### Routing

- Nested layouts via `_layout.tsx`
- Dynamic routes: `[slug].tsx`, `[...rest].tsx`
- Not-found routes: `+not-found.tsx`
- Groups with parentheses: `(group)/route.tsx`
- API routes: `route+api.tsx` with Request/Response objects

### Deployment

- Web: Hono server with Node/Vercel adapters
- Set `ONE_SERVER_URL` in production `.env`
- Supports SPA, SSG, SSR routing modes per page
