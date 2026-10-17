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
NEXT_PUBLIC_SITE_URL=https://YOUR-REAL-DOMAIN.at
NEXT_PUBLIC_INDEXING_ENABLED=true
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
```

No domain is fabricated. Without a valid HTTPS domain, canonical URLs and absolute JSON-LD links are omitted. Indexing is disabled until explicitly enabled. Vercel previews remain noindex even when the production flag is true. The sitemap is empty while indexing is disabled.

Enable indexing only after the business details, offered services, domain and legal pages are complete. The production flag must be set before the production build; changing it requires a rebuild. robots.txt does not by itself remove a page already indexed; the noindex metadata is also provided.

Service and BreadcrumbList JSON-LD are emitted when the real domain is configured. RoofingContractor is emitted only when actual business name, street, postal code and phone are present. No invented ratings or address appear in structured data. Structured data does not guarantee rich results.

Search Console:
1. Verify your domain with DNS, or set the HTML verification variable.
2. Rebuild after adding the verification variable.
3. Submit the production /sitemap.xml.
4. Inspect the actual production pages.

## Google Tag Manager, GA4 and Google Ads

Only one GTM container is supported:

```env
NEXT_PUBLIC_GTM_ID=GTM-YOURREALID
```

The example above must be replaced by your actual container ID. Keep the setting empty to leave tracking disabled.

GA4 and Ads are configured in GTM, not as additional gtag.js snippets in the code. Installing GTM does not configure either product automatically.

### Consent setup

Basic Consent Mode is the default. The GTM script is not requested before a visitor grants analytics or marketing permission. Defaults are denied, and the selected consent values are queued before GTM is loaded.

Consent categories:
- Statistics: analytics_storage.
- Marketing: ad_storage, ad_user_data and ad_personalization.
- The first-party cookie `rundrdach_consent_v1` retains the selected categories for 180 days.

IMPORTANT: complete the GTM container consent configuration before activating it.
- GA4/Google tag and GA4 event tags: require analytics_storage as an **additional** consent check, so they do not fire merely because marketing was accepted.
- Ads conversion/remarketing tags: require the relevant advertising consent categories. Do not fire them on statistics-only permission.
- Do not use All Pages or automatic history triggers to fire measurement before the required category is granted.
- For a GTM consent template, use Google's dedicated consent APIs and confirm initialization order in Tag Assistant. Do not add a second consent banner or reset a saved choice to granted.
- Explicitly apply consent checks to any non-Google tag.

Built-in checks alone can allow some Google tags to send cookieless pings. The additional consent requirements are needed for this project's chosen basic behavior.

When all optional consent is withdrawn after GTM has loaded, the page is reloaded to discard the loaded container. When one category remains permitted, its container remains; correct category checks in GTM are required. Accessible recognized tracking cookies are removed when permission is withdrawn. The site cannot delete third-party cookies or historical platform data.

No pre-consent action history is replayed. No bot exceptions are included.

### Events and page views

| Event | Trigger | Suggested purpose |
| --- | --- | --- |
| phone_click | Actual click on a configured telephone link | Contact intent |
| whatsapp_click | Actual click on a configured WhatsApp link | Contact intent |
| quote_request_click | Click on a quote CTA | Funnel step |
| generate_lead | Provider-confirmed form acceptance | Lead conversion |
| page_view | Initial permitted view and subsequent route change | GA4 page reporting |

Public parameters: service_type, cta_location and page_path. No form content, contact data or URL query strings are sent. A phone click is not a completed phone call.

Choose one page-view strategy:
1. In the GTM Google tag configuration set `send_page_view` to false.
2. Turn off automatic page/history-change reporting in GA4 Enhanced Measurement.
3. Fire a GA4 Event tag named `page_view` on the custom `page_view` event.
4. Map page_path, page_location and page_title from dataLayer.
5. Do not add a GTM History Change page-view trigger in parallel.

A permitted initial page view is emitted when statistics consent becomes available. Navigation emits one view per pathname change. Privacy-sensitive query strings are excluded.

For each conversion, choose either a direct Ads conversion tag or a GA4 import. Avoid counting the same lead through both as primary conversions. Use actual conversion IDs and labels in GTM.

### Optional additional services

Meta Pixel and Microsoft Clarity can be added later through the same GTM container with their own consent checks and an updated privacy/cookie notice. Neither is installed or loaded in this project. No extra tracking SDK exists in the source.

### Manual verification after configuring your accounts

Use browser network tools and Tag Assistant:
- New visit: no GTM request before permission.
- Reject optional: no measurement tags.
- Statistics only: GA4 allowed; Ads blocked.
- Marketing only: Ads allowed; GA4 blocked.
- Accept both: one container and one page view per navigation.
- Reopen cookie settings, change selection, withdraw all and confirm the reload.
- Click phone/WhatsApp and submit the configured form; check one event per action.
- Confirm no names, phone numbers, emails or messages in analytics payloads.
- Check refresh/direct access and viewport sizes 360, 768, 1440 pixels.

Real Google accounts and delivery integrations have not been tested without your IDs and credentials.

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
