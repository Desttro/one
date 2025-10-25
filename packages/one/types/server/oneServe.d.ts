import type { Hono } from 'hono';
import type { One, RouteInfo } from '../vite/types';
export type ModuleLoaders = {
    loadRouteModule?: (route: RouteInfo<string>) => Promise<any>;
    loadAPIModule?: (route: RouteInfo<string>) => Promise<any>;
    loadMiddlewareModule?: (contextKey: string) => Promise<any>;
};
export declare function oneServe(oneOptions: One.PluginOptions, buildInfo: One.BuildInfo, app: Hono, moduleLoaders?: ModuleLoaders): Promise<void>;
//# sourceMappingURL=oneServe.d.ts.map