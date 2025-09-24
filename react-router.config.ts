import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  // Enable static export for Pages deployment
  buildEnd: async ({ viteConfig }) => {
    // This will be handled by the build process
  }
} satisfies Config;
