# Google Tag Manager Production Setup

## Application event contract

The website pushes these events into `window.dataLayer`:

- `page_view`
- `generate_lead`
- `quote_form_start`
- `quote_form_validation_error`
- `quote_cta_click`
- `phone_click`
- `email_click`
- `directions_click`
- `gallery_project_open`
- `web_vital`
- `analytics_consent_granted`
- `analytics_consent_denied`

## Required environment variable

```text
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

The warning about Meta is deliberate. Your existing banner only provides analytics consent, while advertising consent remains denied. Treating analytics consent as permission for advertising pixels would be poor privacy design.

# Part 3 — Configure the local production build

## 1. Set your GTM container ID

Replace the placeholder before running:

```bash
cd "$HOME/Workspace/js-auto-body-repairs"

export JS_AUTO_BODY_GTM_ID="GTM-REPLACE_ME"

if ! printf '%s' "$JS_AUTO_BODY_GTM_ID" \
  | grep -Eq '^GTM-[A-Z0-9]+$'
then
  echo "ERROR: Enter the real GTM container ID."
  exit 1
fi
