export const libraries = [
  // Meta Frameworks
  { name: "Next.js", slug: "nextjs", category: "meta", badge: "popular" },
  { name: "Nuxt", slug: "nuxt", category: "meta", badge: "popular" },
  { name: "SvelteKit", slug: "sveltekit", category: "meta", badge: "popular" },
  { name: "Remix", slug: "remix", category: "meta", badge: "stable" },
  { name: "Astro", slug: "astro", category: "meta", badge: "new" },

  // UI Frameworks
  { name: "React", slug: "react", category: "ui", badge: "popular" },
  { name: "Vue", slug: "vue", category: "ui", badge: "popular" },
  { name: "Svelte", slug: "svelte", category: "ui", badge: "popular" },
  { name: "Angular", slug: "angular", category: "ui", badge: "popular" },
  { name: "Solid", slug: "solid", category: "ui", badge: "new" },

  // State Management
  { name: "Zustand", slug: "zustand", category: "state", badge: "popular" },
  {
    name: "Redux Toolkit",
    slug: "redux-toolkit",
    category: "state",
    badge: "popular",
  },
  { name: "Jotai", slug: "jotai", category: "state", badge: "new" },
  { name: "Pinia", slug: "pinia", category: "state", badge: "popular" },
  { name: "MobX", slug: "mobx", category: "state", badge: "stable" },

  // Data Fetching
  {
    name: "TanStack Query",
    slug: "tanstack-query",
    category: "fetching",
    badge: "popular",
  },
  { name: "Axios", slug: "axios", category: "fetching", badge: "popular" },
  { name: "SWR", slug: "swr", category: "fetching", badge: "popular" },
  { name: "tRPC", slug: "trpc", category: "fetching", badge: "new" },
  {
    name: "Apollo Client",
    slug: "apollo-client",
    category: "fetching",
    badge: "stable",
  },

  // Build Tools
  { name: "Vite", slug: "vite", category: "build", badge: "popular" },
  { name: "Turbopack", slug: "turbopack", category: "build", badge: "new" },
  { name: "esbuild", slug: "esbuild", category: "build", badge: "stable" },

  // Testing
  { name: "Vitest", slug: "vitest", category: "testing", badge: "popular" },
  {
    name: "Playwright",
    slug: "playwright",
    category: "testing",
    badge: "popular",
  },
  { name: "Jest", slug: "jest", category: "testing", badge: "popular" },

  // Utilities
  { name: "Zod", slug: "zod", category: "utils", badge: "popular" },
  { name: "Lodash", slug: "lodash", category: "utils", badge: "stable" },
  { name: "date-fns", slug: "date-fns", category: "utils", badge: "stable" },
  { name: "Radix UI", slug: "radix-ui", category: "utils", badge: "popular" },
];

export const librariesCount = libraries.length;
