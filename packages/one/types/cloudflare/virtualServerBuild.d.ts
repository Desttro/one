declare module 'virtual:one/server-build' {
    type CloudflareServerBuild = import('../cloudflare/createRequestHandler').CloudflareServerBuild;
    export const buildInfo: CloudflareServerBuild['buildInfo'];
    export const routeModules: CloudflareServerBuild['routeModules'];
    export const apiModules: CloudflareServerBuild['apiModules'];
    export const middlewareModules: CloudflareServerBuild['middlewareModules'];
    const serverBuild: CloudflareServerBuild;
    export default serverBuild;
}
//# sourceMappingURL=virtualServerBuild.d.ts.map