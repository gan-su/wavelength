# Visual direction: palettes, type, logo

Three palettes, three type pairings, five logo directions. **Option A of each is what the
landing page currently uses.** The others are built to be swapped in by changing the CSS
variables at the top of `assets/css/styles.css`. Open `brand/palettes.html` in a browser
to compare them side by side before voting.

---

## 1. Palettes

All three keep the brief's deep purple / black / white spine. They differ in what the
purple is doing and how warm the white is, which changes the feeling more than the hue does.

### Option A: Deep Signal *(currently implemented)*

| Role | Hex | Notes |
|---|---|---|
| Ground | `#06040c` | Off-black with a violet bias. Never pure `#000`. |
| Surface | `#110b1d` | Panels and cards |
| Line | `#2e2044` | Hairlines, borders, schematic linework |
| Accent | `#7c3aed` | The only accent on the page |
| Accent bright | `#9b6bff` | Hover, glow, active states |
| Accent text | `#c4b5fd` | Annotations and figures on dark |
| Text | `#f6f3ff` | Cool white |
| Muted text | `#a197bc` | Body at 7.4:1 on ground |

**What it evokes:** instrumentation. A screen that is measuring something. The violet is
saturated enough to read as energy but sits on a near-black ground that keeps it from
feeling like a toy.

**Why it fits:** our central claim is "we know exactly who is reading". A palette that
looks like a readout supports that claim before a word is read.

**Risk:** this is close to the default "AI startup" palette. It only escapes that if the
purple is disciplined: one accent, no second neon colour, glow reserved for interactive
elements. The page follows that rule. Break it and this palette becomes generic instantly.

### Option B: Ultraviolet and Bone

| Role | Hex | Notes |
|---|---|---|
| Ground | `#0b0810` | Slightly warmer black |
| Surface | `#171220` | |
| Line | `#342a42` | |
| Accent | `#6b21a8` | Deeper, less electric purple |
| Accent bright | `#a855f7` | |
| Accent text | `#d8c9f0` | |
| Text | `#f4efe6` | **Bone white, not cool white** |
| Muted text | `#a89f96` | Warm grey |

**What it evokes:** print. A well-made annual report rather than a dashboard. The warm
white against deep purple reads as considered and slightly old-money.

**Why it might fit better:** if the audience skews toward investors rather than engineers,
warmth reads as trustworthy where cool reads as unproven. It also dodges the AI-purple
association almost entirely, because nobody ships bone white in that aesthetic.

**Risk:** loses the "live instrument" feeling. The HUD and schematic devices would need to
soften or come out, which means rebuilding the hero concept rather than recolouring it.

### Option C: Indigo Instrument

| Role | Hex | Notes |
|---|---|---|
| Ground | `#05070f` | Blue-biased black |
| Surface | `#0e1424` | |
| Line | `#23304d` | |
| Accent | `#4f46e5` | Indigo rather than violet |
| Accent bright | `#818cf8` | |
| Accent text | `#c7d2fe` | |
| Text | `#f2f5ff` | |
| Muted text | `#96a0bd` | |

**What it evokes:** infrastructure. Indigo reads as older and more institutional than
violet; it is the colour of things that handle money.

**Why it might fit better:** our buyer is nervous about handing money to a network that
might vanish. Indigo buys credibility that violet has to earn.

**Risk:** it is also the safest and least memorable of the three. Strong second choice,
weak first choice, unless Pranav's answer to "what makes them hesitate" is mostly trust.

### How to vote

Do it after the survey comes back, not before. Two rules:
1. Vote on the swatch board full-screen, not on these hex codes. Colour on a dark ground
   behaves nothing like colour in a table.
2. Whoever votes for an option has to name the emotion they want and why that palette
   produces it. "Looks cooler" does not count.

---

## 2. Type pairings

### Option A: Space Grotesk + Inter Tight + IBM Plex Mono *(currently implemented)*

- **Display:** Space Grotesk 500/600. Geometric, slightly quirky terminals, reads as
  technical without looking like a terminal emulator.
- **Body:** Inter Tight 400/500. Marginally narrower than Inter, so long paragraphs hold
  together at small sizes and it is not quite the web's default voice.
- **Data and annotation:** IBM Plex Mono 400/500. Carries every number, HUD readout and
  schematic label.

**Why:** the three-way split does real work. Display carries voice, body carries argument,
mono carries evidence. When a number appears in mono, it reads as measured rather than
claimed, which is the whole argument of the site.

**Cost:** three families. Subset them before launch, or this is the biggest thing on the page.

### Option B: Geist + Geist Mono

Two families from one system, so everything lines up by construction. Cleaner and more
neutral than Option A, noticeably closer to what every other dev-tool site uses. Pick this
if the team keeps arguing about typography; it is very hard to make ugly.

### Option C: Cabinet Grotesk + Inter Tight + IBM Plex Mono

Swap the display face for something with more personality. Cabinet Grotesk has wider
apertures and more character at large sizes, so the hero headline carries more of the brand
on its own. Pick this if the headline is doing the heavy lifting and the rest stays quiet.

**Not doing:** a serif display face. Serif here would read as editorial or luxury, and we are
neither. It is the single most common reflex in brand work and it would be wrong for us.

---

## 3. Logo directions

Five starting points. None is finished. The current site uses a placeholder wordmark built
from Direction 1, deliberately simple so it does not pretend to be a final answer.

**1. The waveform in a rounded square** *(currently on the site)*
A single continuous line, low amplitude then high then low, inside a rounded container.
Reads as a signal, a heartbeat, or a spike in attention, which is exactly what we sell.
Works at 16px, which most marks do not.
*Risk:* waveform marks are common in audio and analytics. Needs a distinctive amplitude
rhythm to avoid looking stock.

**2. Concentric rings with one marked node**
Straight from the hero schematic: rings of reach with one point highlighted on an inner
ring. Says "narrow room, right person" in a single shape and ties the mark to the page's
central diagram.
*Risk:* dies below about 24px. Would need a simplified small-size variant.

**3. The bracket**
Two facing corner marks, like a crop mark or a viewfinder framing empty space. The startup
goes in the gap. Extremely cheap to reproduce, works as a UI motif as well as a logo, and
can frame photography and headlines throughout the site.
*Risk:* abstract enough that it needs the wordmark beside it for a long time.

**4. Wordmark only, one modified letter**
Set the name in the display face and cut a single letter, the `l` or the `v`, into a signal
spike. No separate symbol to maintain.
*Risk:* no app icon, no favicon, no avatar. Solve that before committing.

**5. The slot**
A filled rectangle with a gap where an ad would sit, rendered as linework. The most literal
option and the most honest about the business.
*Risk:* literal marks age fast and box the company into one product.

**Where to start:** Directions 1 and 3 are the strongest pair to develop, because both
survive at favicon size and both extend into a system rather than sitting in a corner.
Sketch those two in black on white before touching colour. If a mark does not work in one
colour at 16px, no palette will save it.
