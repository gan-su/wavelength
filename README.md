# Wavelength

Landing page and brand direction for a platform that sells advertising placements to
startups: newsletter features, directory listings, site banners and event sponsorships.

```
index.html                    the landing page
assets/css/styles.css         all styling; every colour is a token in :root
assets/js/main.js             boot sequence, scroll narrative, HUD, reveals
brand/01-brand-brief.md       audience, the site's one job, tone, what to feel
brand/02-discovery-questions.md  ten interview questions + the survey for Pranav
brand/03-visual-direction.md  three palettes, three type pairings, five logo directions
brand/palettes.html           swatch board for comparing the palettes as a group
```

## Viewing it

Open `index.html` in a browser. There is no build step and nothing to install. Fonts and
icons come from CDNs, so the first load needs a network connection.

To restart the boot animation, open a new tab or clear session storage. It is deliberately
set to run once per session rather than on every navigation.

Open `brand/palettes.html` full screen when the group votes on colour.

---

## Read this before showing it to anyone outside the team

**Every number, logo, quote and price on the page is invented.** They are there so the
layout can be judged at realistic density. They are marked with `PLACEHOLDER` comments in
`index.html`. Publishing them as-is would be claiming customers we do not have.

Replace or remove, in this order:

1. **Stats band** (`<!-- PLACEHOLDER METRICS -->`): 184,200 readers, 3.1% CTR, 1,940
   investors, 41 startups placed.
2. **Audience split** (`#audience`): the 38 / 26 / 22 / 14 role breakdown and the chart.
3. **Rate card** (`<!-- PLACEHOLDER PRICING -->`): $480, $1,250, $2,100 and the "about 20%"
   quarterly discount.
4. **Social proof** (`<!-- PLACEHOLDER -->`): eight invented company names with generated
   monogram marks, and two invented testimonials. Real logos need written permission.
5. **Contact details**: `hello@wavelength.ad`, `press@wavelength.ad`, the phone number.
6. **Placement imagery**: the three `picsum.photos` URLs are stand-ins for real creative.
   If an image fails to load the slot falls back to a labelled "your creative here" panel,
   which is also what an unsold placement should look like.

The brand name **Wavelength** is taken from the repository name and is a working title. See
the open question at the top of `brand/01-brand-brief.md`: the project notes describe both
this ad marketplace and **Serfis**, a marketing company serving car dealerships. Those are
different businesses and cannot share one identity. Settle that before final copy.

---

## Design decisions worth knowing

**Static HTML, not a framework.** The deliverable is a design the group reviews and edits.
A toolchain would add a barrier between the team and the page for no benefit at this stage.
Everything here ports directly to React or Next later; the CSS is already tokenised.

**One theme.** The black ground is the brand, not a dark mode, so there is no light variant
and no section inverts mid-page.

**One accent.** Violet `#7c3aed` is the only accent colour anywhere. Glow is reserved for
interactive elements. The moment a second accent appears, this palette stops looking
designed and starts looking like every AI startup site.

**Radius rule:** panels 14px, controls 10px, chips 6px. No exceptions.

**No scroll listeners.** Scroll position, the hero narrative, the depth readout and the
progress bar are all driven by `IntersectionObserver`, which the browser batches. The depth
readout uses a ladder of twenty invisible markers spanning the scrollable range, which is
why it moves in 5% steps.

**The schematics are load-bearing.** The hero rings are reach tiers, the callouts label
real placement types, the depth readout is real scroll position. Blueprint linework that
decorated nothing would be the thing this page is trying not to be.

**Motion, and turning it off.** The boot sequence, scroll narrative, line-draw, counters and
marquee each exist to communicate something specific. All of them collapse under
`prefers-reduced-motion: reduce`: the pinned hero becomes an ordinary static hero showing
the headline immediately, and nothing animates.

**Degradation.** With JavaScript off, the hero shows the headline and CTA directly and every
section is visible. The FAQ toggle is drawn in CSS rather than with an icon font, so a
blocked CDN cannot break a control.

## Checked

- No horizontal overflow at 390px, 768px or 1440px.
- All text passes WCAG AA against its background; body text runs 5.2:1 to 7.4:1, headings 18.6:1.
- No console errors.
- Keyboard focus is visible on every interactive element.

## Known gaps

- **Fonts load from Google Fonts via `<link>`.** Self-host and subset them before launch;
  three families is the largest thing on the page.
- **Icons load from jsDelivr.** Decorative only; the page reads correctly without them, but
  self-host these too for production.
- **The boot overlay delays first paint by about 1.9 seconds** on a first visit. That is a
  deliberate trade for the opening effect. If conversion matters more than theatre, cut it;
  it is one function call in `main.js`.
- **No form.** The CTA opens a mail client. A real form needs a backend decision first.
- **Copy is a first draft by an AI.** Rewrite it in your own voice before launch, per the
  research plan. It is written to be specific rather than to be kept.
