import type { One } from './vite/types';
/** The list of input keys will become optional, everything else will remain the same. */
export type PickPartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type GlobbedRouteImports = Record<string, () => Promise<unknown>>;
export type Endpoint = (req: Request) => Response | string | Object | null;
export type RenderApp = (props: RenderAppProps) => Promise<string>;
export type PlatformContext = {
    env?: Record<string, unknown>;
    executionCtx?: unknown;
    /**
     * Raw platform-specific request context. Cloudflare Workers expose bindings on `env` and
     * the execution context via Hono, so we keep this generic for future platforms.
     */
    requestContext?: unknown;
    cf?: unknown;
    [key: string]: unknown;
};
export type LoaderProps<Params extends Object = Record<string, string | string[]>> = {
    path: string;
    params: Params;
    request?: Request;
    platform?: PlatformContext;
};
export type RenderAppProps = {
    mode: One.RouteRenderMode;
    path: string;
    preloads?: string[];
    css?: string[];
    loaderServerData?: any;
    loaderData?: any;
    loaderProps?: LoaderProps;
};
//# sourceMappingURL=types.d.ts.map