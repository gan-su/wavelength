# Serfis website

Static site for [Serfis](https://serfis.ai): three pages, no build step.

- `index.html` – Home
- `about.html` – About
- `contact.html` – Contact
- `styles.css` – design tokens and layout (mirrors the Figma "Serfis" variable collection)
- `contact.js` – contact form handling (see Notes below)

Design source: Figma file "Serfis Website" (`a4uj1sqfwzOrOoiH9Xm48p`). The Figma file still reflects the earlier Shopify-content-engine positioning and has not yet been updated to match the current copy below.

## Positioning (current)

Serfis creates AI-generated video ads that help funded startups build brand awareness. The product is in development; the site is honest about that (see the "Building and testing" labels on Home and About).

A previous version of this site targeted businesses selling physical products on Shopify. That positioning, and the Services page, have been removed as of this revision.

## Run locally

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

## Deploy on GitHub Pages

Settings → Pages → Source: "Deploy from a branch" → `main` / root. No configuration needed.

## Notes

- Fonts load from Google Fonts. Self-host `Instrument Sans` and `Geist` before a production launch.
- The contact form has no backend yet. Submitting it opens the visitor's mail client with the message pre-filled (via `contact.js`) and shows a "Message sent" confirmation, but Serfis has no way to confirm the email actually went out until a real form endpoint is wired up. Swap the `mailto:` logic in `contact.js` for a real endpoint when one exists.
- The hero uses a labelled "Brand assets" placeholder and three labelled "Video preview" placeholders in the video-style cards. Replace with real video thumbnails/clips when available.
