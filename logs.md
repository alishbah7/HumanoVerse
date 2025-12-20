Node version: v24.12.0
[ERROR] Error: Unable to build website for locale en.
    at tryToBuildLocale (/vercel/path0/frontend/node_modules/@docusaurus/core/lib/commands/build/build.js:83:15)
    at async /vercel/path0/frontend/node_modules/@docusaurus/core/lib/commands/build/build.js:35:9
    at async mapAsyncSequential (/vercel/path0/frontend/node_modules/@docusaurus/utils/lib/jsUtils.js:21:24)
    at async Command.build (/vercel/path0/frontend/node_modules/@docusaurus/core/lib/commands/build/build.js:34:5)
    at async Promise.all (index 0)
    at async runCLI (/vercel/path0/frontend/node_modules/@docusaurus/core/lib/commands/cli.js:56:5)
    at async file:///vercel/path0/frontend/node_modules/@docusaurus/core/bin/docusaurus.mjs:44:3 {
  [cause]: [BetterAuthError: Invalid base URL: /api/auth. Please provide a valid base URL.] {
    cause: 'TypeError: Invalid URL'
  }
}
Error: Command "npm run build" exited with 1