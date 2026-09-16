# Brand brief: Wavelength

> **Status: working draft.** Everything here is a defensible starting position, not a
> decision. The parts that need a human answer are marked **[OPEN]** and map to the
> questions in `02-discovery-questions.md`.

> **[OPEN] Which brand is this?** The project notes mix two things: an ad-space
> marketplace for startups (the design brief) and **Serfis**, a marketing/content
> company whose live product serves car dealerships. Those are different companies with
> different audiences and they cannot share one identity. This brief and the landing page
> are written for the **ad-space marketplace**, working name **Wavelength** (taken from
> the repo). If the real target is Serfis, the structure of the page carries over but the
> copy and audience section do not. Settle this before anyone writes final copy.

---

## 1. What we sell

Advertising placements to startups: newsletter features, directory listings, site banners
and event sponsorships. We are an inventory business. The product is not "marketing" and
not "growth". It is a specific slot, on a specific date, in front of a specific list.

## 2. The one job of the site

**Let a founder decide, in under a minute, whether our audience is worth paying for, and
give them one way to start.**

Not: explain advertising. Not: build the category. A visitor arrives already knowing they
want attention. The only open question in their head is *"is this the right room, and what
does it cost?"* Everything on the page either answers that or gets cut.

Secondary job: make the operation look like something that will still exist in two years.
Startups have been burned by ad networks that disappear mid-campaign.

## 3. Audience

**Primary: the person who signs off on a $1k to $5k marketing spend at a seed-to-Series-A
startup.** Usually a founder, sometimes a first growth hire. Traits that matter:

- Budget is small enough that they feel it personally and large enough to need a reason.
- Deeply allergic to vagueness. They have been pitched "reach" a hundred times.
- They will read the pricing before the value prop. Assume the rate card is the landing page.
- They are comparing us against paid social, cold outbound, and doing nothing.

**Secondary: the list owners** (newsletter operators, community organisers) whose inventory
we sell, and who need to believe we will not embarrass them in front of their readers.

**[OPEN]** Is there a third audience, the investors who *read* the placements? They are the
product, not the customer. The site should describe them, never address them.

## 4. The one thing we must be believed on

**That the audience is who we say it is.** Every other claim rests on it. This is why the
page publishes list composition as a chart and a persona breakdown rather than a single
"180k readers" number. A vague reach figure reads as a lie to this audience; a specific,
slightly awkward breakdown reads as true.

Practical consequence: **we cannot ship the site with invented numbers.** The placeholder
figures in the page are marked in the HTML and listed in the README. Real ones, or none.

## 5. Tone of voice

**Plain, specific, slightly blunt.** We sound like an operator explaining their own
inventory, not like a brand.

| We do | We do not |
|---|---|
| Name the price in the first screen of the pricing section | Say "flexible pricing to suit your needs" |
| Say "one per issue, never stacked against a competitor" | Say "premium brand-safe placements" |
| Admit what we are bad at ("if the fit is wrong for your stage we will say so") | Claim to work for everyone |
| Use round, checkable claims | Use decimals to sound precise |

Banned from all copy: elevate, seamless, unleash, next-gen, revolutionise, supercharge,
"in today's fast-moving landscape". If a sentence would survive on a competitor's site
unchanged, rewrite it.

**Reading level:** a tired founder at 11pm. Short sentences. No sentence that needs a
second pass.

## 6. What we want people to feel

In order, and they are not the same feeling:

1. **Recognised.** "This is describing my actual problem, not a generic one."
2. **Oriented.** "I understand exactly what I would be buying and what it costs."
3. **Slightly reassured.** "These people are organised. This is not two guys and a Mailchimp."
4. **Mild urgency.** Inventory is finite and dated. A slot someone else can take is a
   deadline that does not need to be manufactured.

What we explicitly do **not** want: awe. A site that feels expensive to build makes a
budget-conscious founder wonder who is paying for it.

## 7. Visual direction in one line

Instrumentation, not decoration: a dark, engineered surface where the linework, the
readouts and the schematics all correspond to something real (reach, placement, depth,
composition). Full reasoning and alternates in `03-visual-direction.md`.

## 8. Proof we need before launch

Ranked by how much damage the absence does:

1. One real customer with a real number. One is enough. Zero is fatal.
2. Actual list composition data, even if unflattering.
3. Real logos, with written permission.
4. A screenshot of the reporting dashboard we promise.

## 9. How we will know the site works

- A founder who has never heard of us can say what we sell after ten seconds.
- Pricing is found without using the nav.
- The enquiry email names a placement and a date, rather than asking "how does this work?"
