# Phase 5C — Local Quote Sandbox

## Development behaviour

When SMTP is not configured, successful quote submissions are stored under:

```text
.local-data/quote-submissions/<request-id>/
Each submission includes:

- `submission.json`
- an `attachments` directory
- customer details
- vehicle details
- service selection
- repair description
- uploaded photo metadata

## Production behaviour

Production does not use the local fallback.

Production requires:

- complete SMTP configuration
- Cloudflare Turnstile secret
- a valid Turnstile token

Missing production configuration causes the endpoint to reject the request.

## Privacy

The `.local-data` directory is ignored by Git. Local test submissions may
contain personal information and must not be committed or shared.
```
