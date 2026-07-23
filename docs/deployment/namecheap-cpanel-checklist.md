# Namecheap cPanel Preview Deployment Checklist

## Temporary domain

- [ ] `delightful-fuchsia-horse.jsautobodyrepairs.com.au` resolves correctly
- [ ] HTTPS is active
- [ ] The main-domain coming-soon page remains unchanged

## Node.js application

```text
Node.js version: 22.23.0
Application mode: Production
Application root: js-auto-body-preview
Application URL: delightful-fuchsia-horse.jsautobodyrepairs.com.au
Startup file: server.js
```

## Initial environment variables

```text
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://delightful-fuchsia-horse.jsautobodyrepairs.com.au
NEXT_PUBLIC_SITE_INDEXABLE=false
NEXT_PUBLIC_BUSINESS_EMAIL=info@jsautobodyrepairs.com.au
```

Do not manually define `PORT`; Passenger supplies it.

## Quote delivery

Configure before testing real submissions:

```text
SMTP_HOST=
SMTP_PORT=465
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM_EMAIL=
SMTP_FROM_NAME=JS Auto Body Repairs
QUOTE_TO_EMAIL=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

Turnstile hostnames:

```text
delightful-fuchsia-horse.jsautobodyrepairs.com.au
jsautobodyrepairs.com.au
www.jsautobodyrepairs.com.au
```

## Deployment

```bash
npm run deploy:package
```

Upload and extract:

```text
.deployment/js-auto-body-namecheap-preview.zip
```

Then in cPanel:

1. Run NPM Install.
2. Activate the Node.js virtual environment in Terminal.
3. Change to `js-auto-body-preview`.
4. Run `npm run build`.
5. Restart the Node.js application.

Never upload local `node_modules`, `.next`, `.env` files, `.git`, `.local-data`, or `.gallery-source`.

## Verification

```bash
npm run deploy:smoke -- \
  https://delightful-fuchsia-horse.jsautobodyrepairs.com.au
```

Confirm:

- [ ] `/api/health` returns `ok: true`
- [ ] `X-Robots-Tag` contains `noindex`
- [ ] `/robots.txt` contains `Disallow: /`
- [ ] Navigation, contact actions, maps, consent controls and quote form work
- [ ] No critical browser-console errors

## Production launch

Before switching to the main domain:

- [ ] Set `NEXT_PUBLIC_SITE_URL=https://jsautobodyrepairs.com.au`
- [ ] Set `NEXT_PUBLIC_SITE_INDEXABLE=true`
- [ ] Rebuild and restart the application
- [ ] Certify SMTP and Turnstile
- [ ] Remove or redirect the temporary subdomain
