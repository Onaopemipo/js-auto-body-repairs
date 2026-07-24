# JS Auto Body Repairs Post-Launch Verification

## Production

- [ ] All public routes return HTTP 200
- [ ] HTTP redirects to HTTPS
- [ ] `/api/health` returns `ok: true`
- [ ] Production does not send `noindex`
- [ ] `robots.txt` allows crawling
- [ ] `robots.txt` references `/sitemap.xml`
- [ ] Sitemap contains all primary routes
- [ ] Placeholder or pending content has been removed

## Quote delivery

- [ ] Quote form structure test passes
- [ ] Synthetic production quote returns HTTP 2xx
- [ ] Workshop receives the enquiry email
- [ ] Customer acknowledgement is received if implemented
- [ ] Reply-to address points to the customer
- [ ] Photo attachment delivery is tested separately
- [ ] Spam handling is reviewed
- [ ] SMTP credentials remain only in cPanel

## Analytics

- [ ] Google Analytics does not load after rejection
- [ ] Google Analytics loads after acceptance
- [ ] Correct GA4 Measurement ID is used
- [ ] Realtime report receives the verification visit
- [ ] Quote submission conversion event appears
- [ ] Internal testing traffic is filtered or documented

## Search Console

- [ ] Domain property added for `jsautobodyrepairs.com.au`
- [ ] DNS TXT ownership record added in Namecheap
- [ ] Domain ownership verified
- [ ] `https://jsautobodyrepairs.com.au/sitemap.xml` submitted
- [ ] Homepage inspected
- [ ] Indexing requested where appropriate
- [ ] Page indexing and enhancement reports reviewed

## Mobile

- [ ] Automated iPhone profile passes
- [ ] Automated Android profile passes
- [ ] No horizontal overflow
- [ ] No JavaScript console errors
- [ ] Navigation works one-handed
- [ ] Tap targets are usable
- [ ] Quote form works with the mobile keyboard
- [ ] Photos can be selected from a real phone
- [ ] Phone and email links open correctly
- [ ] Screenshots reviewed visually

## Logs

- [ ] Production stderr contains no current startup failures
- [ ] No repeated 500 or 503 errors
- [ ] Build ID exists
- [ ] Quote failures are logged without exposing sensitive data
- [ ] Log files do not expose SMTP passwords or customer details
- [ ] A weekly log-review routine is established

## Sign-off

- Verification date:
- Production commit:
- Production tag:
- Build ID:
- Verified by:
- Outstanding defects:
