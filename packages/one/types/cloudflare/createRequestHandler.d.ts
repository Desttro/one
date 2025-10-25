import type { One } from '../vite/types';
type LoadServerBuild = () => Promise<CloudflareServerBuild> | CloudflareServerBuild;
export type CloudflareServerBuild = {
    buildInfo: One.BuildInfo;
    routeModules: Record<string, any>;
    apiModules: Record<string, any>;
    middlewareModules: Record<string, any>;
};
export declare function createRequestHandler(loadServerBuild: LoadServerBuild): (request: Request, env?: unknown, ctx?: unknown) => Promise<Response>;
export {};
//# sourceMappingURL=createRequestHandler.d.ts.map