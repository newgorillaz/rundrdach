# Rundrdach — Wien, Österreich

German-language roofing website built with Next.js App Router, TypeScript, React and Tailwind CSS. Self-hosted Inter fonts. No external imagery. Neutral architectural image placeholders can be replaced with your own photography.

## Quick start

Requires Node.js 20.9 or newer (Node.js 22 LTS recommended).

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

On Windows, copy `.env.example` to `.env.local` using File Explorer instead of the `cp` command.

```bash
npm run check
npm test
npm run build
npm start
```

## Pages

| URL | German page |
| --- | --- |
| / | Startseite |
| /dacheindeckung | Dacheindeckung |
| /dachreparatur | Dachreparatur |
| /dachabdichtung | Dachabdichtung |
| /dachzubehoer | Dachzubehör |
| /referenzen | Portfolio / Referenzen |
| /kontakt | Kontakt |
| /impressum | Impressum |
| /datenschutz | Datenschutz |
| /cookies | Cookie-Informationen |
| /agb | Vertragsbedingungen |
| /sitemap.xml | Sitemap |
| /robots.txt | Robots rules |

## Complete the business details

Edit `src/config/site.ts`:
- Phone, WhatsApp, email and actual business address.
- Legal business name and Austrian company information.
- Opening hours and genuine social profiles.
- Review and approve the offered services/materials in `src/data/services.ts`. The user supplied roofing, repairs, waterproofing and accessories; the copy is a draft of their scope.
- Complete and review the legal drafts in `src/app/impressum`, `datenschutz`, `cookies` and `agb`.

Phone and WhatsApp buttons are hidden while their values are empty. No fabricated contact details, reviews, qualifications, years of experience or completed projects are included.

## Replace the image placeholders

The `ImagePlaceholder` component supports a `src` and `alt` property. Without a source, it displays an explicitly labelled architectural placeholder.

Put real photos in `public/images/`, preferably WebP or AVIF. For example:

```tsx
<ImagePlaceholder
  src="/images/dach-wien.webp"
  alt="Ziegeldach mit ausgeführtem Firstanschluss in Wien"
/>
```

Add genuine references to `src/data/projects.ts`. The homepage shows the first three. The portfolio shows all entries. Every project has a title, service, location, description, image and German alt text. Placeholder cards are explicitly labelled as not being project references.

## Contact form

The form is disabled until all three server variables are configured:

```env
RESEND_API_KEY=
CONTACT_FROM_EMAIL=
CONTACT_TO_EMAIL=
```

Use a verified sender domain in your Resend account. The recipient is your actual business inbox. These values are server-only and must never use the `NEXT_PUBLIC_` prefix.

The endpoint `POST /api/kontakt` validates the fields, checks the request origin, uses a honeypot, limits payload size and escapes the email content. It returns success only after Resend confirms acceptance. Acceptance means the provider accepted the email, not proof that an inbox received it. `generate_lead` is emitted only after that success response.

Local rate limiting is included. For distributed production limiting, configure:

```env
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

The shared store records a hash of the source IP with a one-hour expiry; the local fallback resets when an instance restarts. Update the privacy draft for whichever services you activate. Do not put API keys in the repository.

## SEO and indexing

Each page has original German copy, one H1, unique title and description, relevant internal links and visible breadcrumbs. Services target Wien. The site uses `de-AT` and `de_AT`.

```env
NEXT_PUBLIC_SITE_URL=https://www.r-und-r-dach.at
NEXT_PUBLIC_INDEXING_ENABLED=true
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=YdFJNuk6dv7W_EJRskOmtMxzbdkI0N1M7doDMV6OBw4
```

The production domain defaults to `https://www.r-und-r-dach.at` when `NEXT_PUBLIC_SITE_URL` is empty. Indexing is enabled for that production site unless `NEXT_PUBLIC_INDEXING_ENABLED=false`. Vercel previews remain noindex. The sitemap is empty while indexing is disabled.

Service and BreadcrumbList JSON-LD are emitted when the domain is configured. RoofingContractor is emitted only when actual business name, street, postal code and phone are present. No invented ratings or address appear in structured data. Structured data does not guarantee rich results.

Search Console:
1. The HTML verification meta tag is emitted from `googleSiteVerification` (code default or env override).
2. Rebuild after changing the verification variable.
3. Submit the production /sitemap.xml.
4. Inspect the actual production pages on https://www.r-und-r-dach.at/.

## Google Ads, consent and optional GTM

Google Ads is installed directly in the app (not only via GTM):

```env
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-18521702973
```

The ID defaults in code when the env variable is unset. The base tag loads only after Marketing consent. Click conversions:

| Action | Conversion send_to |
| --- | --- |
| Phone link click | `AW-18521702973/As6YCJ_l760dEL2E6_9E` |
| WhatsApp button click | `AW-18521702973/uDMaCKLl760dEL2E6_9E` |
| Email link click | `AW-18521702973/IieACLDI57EdEL2E6_9E` (value 1.0, currency RON) |

Phone and email clicks wait for the Ads callback (or a short timeout) before opening `tel:` / `mailto:`. WhatsApp opens in a new tab and does not delay navigation. Without Marketing consent the links work immediately and no Ads conversion is sent.

An optional GTM container remains supported:

```env
NEXT_PUBLIC_GTM_ID=GTM-YOURREALID
```

Keep GTM empty when you only need the direct Ads tag. If GTM is set, configure GA4 inside that container; do not double-count the same primary conversion in Ads and GA4.

### Consent setup

Basic Consent Mode is the default. Neither the Google Ads `gtag.js` script nor GTM is requested before a visitor grants the matching permission. Defaults are denied, and the selected consent values are queued before tags load.

Consent categories:
- Statistics: analytics_storage.
- Marketing: ad_storage, ad_user_data and ad_personalization (required for the Ads tag and click conversions).
- The first-party cookie `rundrdach_consent_v1` retains the selected categories for 180 days.

IMPORTANT when also using GTM:
- GA4/Google tag and GA4 event tags: require analytics_storage as an **additional** consent check.
- Extra Ads tags in GTM: require advertising consent; do not fire them on statistics-only permission.
- Do not use All Pages or automatic history triggers to fire measurement before the required category is granted.

When all optional consent is withdrawn after Ads or GTM has loaded, the page is reloaded to discard the loaded scripts. Accessible recognized tracking cookies are removed when permission is withdrawn. The site cannot delete third-party cookies or historical platform data.

No pre-consent action history is replayed. No bot exceptions are included.

### Events and page views

| Event | Trigger | Suggested purpose |
| --- | --- | --- |
| phone_click | Actual click on a configured telephone link | Contact intent + Ads phone conversion |
| whatsapp_click | Actual click on a configured WhatsApp link | Contact intent + Ads WhatsApp conversion |
| email_click | Actual click on a configured email link | Contact intent + Ads email conversion |
| quote_request_click | Click on a quote CTA | Funnel step (dataLayer / GTM) |
| generate_lead | Provider-confirmed form acceptance | Lead conversion (dataLayer / GTM) |
| page_view | Initial permitted view and subsequent route change | GA4 page reporting via GTM |

Public parameters: service_type, cta_location and page_path. No form content, contact data or URL query strings are sent. A phone click is not a completed phone call.

### Manual verification

Use browser network tools and Tag Assistant:
- New visit: no `gtag/js?id=AW-…` request before Marketing permission.
- Reject optional: no Ads or GTM measurement tags.
- Statistics only: Ads blocked; GTM analytics only if configured.
- Marketing only: Ads tag loads; phone / email / WhatsApp conversions fire on click.
- Withdraw all after tags loaded and confirm the reload.
- Confirm no names, phone numbers, emails or messages in analytics payloads.
- Check refresh/direct access and viewport sizes 360, 768, 1440 pixels.

## Deploy on Vercel

1. Unzip this project and push the contents of the rundrdach folder to a GitHub repository.
2. Import the repository into Vercel; select Next.js and the project root.
3. Add the required environment variables to Production. Add secrets through Vercel settings.
4. Build command: `npm run build`. Install command: `npm ci`.
5. Deploy, add your actual domain, then verify the contact form, consent and SEO.
6. Rebuild after changing any NEXT_PUBLIC variable.

No deployment, hosting identity or existing account credentials are bundled.

## Reference documentation

- https://nextjs.org/docs/app
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://developers.google.com/tag-platform/security/guides/consent
- https://developers.google.com/search/docs/appearance/structured-data/local-business
- https://resend.com/docs/api-reference/emails/send-email
- https://www.dsb.gv.at/
- https://www.wko.at/

The legal pages deliberately remain editable drafts; actual operator, service-provider and contractual details are required before public launch.
