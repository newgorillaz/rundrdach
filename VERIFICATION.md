# Verification

Verified on 2026-10-13:

- Production build: passed (Next.js 16.4.0).
- Strict TypeScript check: passed.
- ESLint: passed.
- Automated tests: 10 passed, 0 failed.
- Prerendered HTML: all 10 static content pages have one H1, unique titles, de-AT language and no external tracking script.
- Four service routes are statically generated; the contact page and contact API are server-rendered.

The tests cover initial denial, rejection, separate categories, one GTM load, deduplicated page views, withdrawal, absent tracking IDs, malformed stored preferences, form origin/field/spam validation, absent delivery configuration and provider-confirmed success using a mocked provider.

Not verified: live GA4/Ads/GTM accounts, real email delivery, browser viewport rendering, Austrian legal review, actual project/material claims or deployment to an external host. No IDs, credentials, domain or fabricated references are bundled.
