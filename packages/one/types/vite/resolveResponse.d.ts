import type { PlatformContext } from '../types';
export declare function resolveResponse(getResponse: () => Promise<Response>): Promise<Response>;
export declare function resolveAPIEndpoint(runEndpoint: () => Promise<any>, request: Request, params: Record<string, string>, platformContext?: PlatformContext): Promise<Response>;
//# sourceMappingURL=resolveResponse.d.ts.map