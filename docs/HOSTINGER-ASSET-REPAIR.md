# Hostinger asset delivery repair — 17 October 2026

## Confirmed production failures

- Home and process HTML returned HTTP 200 after redeployment.
- A fresh in-app browser reproduced `ChunkLoadError: Loading chunk 974 failed` for `/_next/static/chunks/app/page-cb5c20176908d90b.js`.
- That browser response had status 200 and an empty body. Separate uncached HTTP requests to JS/CSS timed out.
- Eleven tested `/_next/image` URLs returned 503; an additional remote-image request timed out.
- Original public images returned valid image bytes with HTTP 200.

This establishes asset delivery failures; it does not establish the exact Hostinger proxy/process fault. Browser cache alone is not an adequate explanation.

## Change

- Use compressed original images directly with Next Image `unoptimized`, retaining lazy loading, dimensions, alt text and existing design. Original local images are below 260 KB each. Responsive on-demand resizing is bypassed as a reliability tradeoff.
- Set a production-only `/site-assets` asset prefix and copy `.next/static` into `public/site-assets/_next/static` after building. Hostinger can serve these as ordinary public files, like the working original images.
- Explicit standalone output, with public files and static bundles included for standalone hosting as documented by Next.js.
- Reject missing/empty browser bundles during packaging and check SHA-256 equality of all copies. No server code or environment files are copied into public assets.
- Add `scripts/check-hosting-assets.py`, which checks actual response bodies and MIME types, not just HTTP status. Run it against a production origin after deployment.

## Validation before push

- Production build using Node 22.23.3 passed (59 generated entries).
- TypeScript passed.
- Standalone Node 22 server: 56 prerendered routes returned their expected status (including the expected 404).
- All 61 browser asset responses matched the build files byte for byte.
- Six main pages and 33 directly referenced local assets passed the hosting smoke check.
- Production browser failure was reproduced. Subsequent browser access was disabled in Work settings, so a visual desktop/mobile check of the repaired build could not be completed.
- Local testing uses macOS. Hostinger Linux and live deployment need post-deployment verification.

## hPanel steps

Keep Next.js / main / Node 22.x / root ./ / npm / npm run build / output .next.
Deploy the commit containing this repair. If GitHub auto-deployment has already succeeded for it, do not start a duplicate deployment. Otherwise click Save and redeploy.
If a Hostinger/CDN cache is enabled, purge its old cached content after deployment. Check in a private window.
Fresh HTML must reference `/site-assets/_next/static/…`; photos must use direct `/images/…` URLs, not `/_next/image?…`.
If it still fails, support should check public_html synchronization and the failing asset URL's response body, plus Node startup and routing. A successful build alone does not confirm a healthy website.

References:
- https://nextjs.org/docs/app/api-reference/config/next-config-js/assetPrefix
- https://nextjs.org/docs/app/api-reference/config/next-config-js/output
- https://nextjs.org/docs/app/api-reference/components/image
