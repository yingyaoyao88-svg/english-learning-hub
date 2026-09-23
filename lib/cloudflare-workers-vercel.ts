/**
 * Vercel build-time fallback for the Cloudflare Workers environment module.
 * The production Cloudflare build does not use Next.js' webpack aliases and
 * continues to receive the real D1 binding from `cloudflare:workers`.
 */
export const env: { DB?: D1Database } = {};
