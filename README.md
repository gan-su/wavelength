# Serfis website

Static site for [Serfis](https://serfis.ai): four pages, no build step.

- `index.html` – Home
- `services.html` – Services
- `about.html` – About
- `contact.html` – Contact
- `styles.css` – design tokens and layout (mirrors the Figma "Serfis" variable collection)

Design source: Figma file "Serfis Website" (`a4uj1sqfwzOrOoiH9Xm48p`).

## Run locally

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

## Deploy on GitHub Pages

Settings → Pages → Source: "Deploy from a branch" → `main` / root. No configuration needed.

## Notes

- Fonts load from Google Fonts. Self-host `Instrument Sans` and `Geist` before a production launch.
- The contact form has no backend yet; it opens the visitor's mail client addressed to hello@serfis.ai. Swap `action` for a form endpoint when one exists.
- The hero uses a labelled "Product photo" slot. Replace it with a real product image (4:3) when available.
