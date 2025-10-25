import { Hono } from 'hono';
import { type ModuleLoaders } from './server/oneServe';
import type { One } from './vite/types';
type ServeWorkerOptions = {
    disableStaticServer?: boolean;
    moduleLoaders?: ModuleLoaders;
};
export declare function serve(buildInfo: One.BuildInfo, options?: ServeWorkerOptions): Promise<Hono<import("hono/types").BlankEnv, import("hono/types").BlankSchema, "/">>;
export {};
//# sourceMappingURL=serve-worker.d.ts.map