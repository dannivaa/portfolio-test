# DESIGN-SYSTEM.md
# Danylo Ivanov — Portfolio Design System
# Inspired by: damianskotzke.com — adapted to light theme + recruiter context
#
# INTENTIONAL DEVIATIONS FROM REFERENCE SITE (verified by live inspection):
# 1. Font: Inter (regular) instead of Inter Tight — same visual quality, wider availability
# 2. Base body size: 16px instead of 20px — tighter, more standard for text-heavy recruiter content
# 3. Hero weight: 700 instead of 500 — compensates for using regular Inter vs condensed Inter Tight
# 4. Nav: standard sticky top bar instead of floating pill — simpler, more recruiter-appropriate
# 5. Project cards: vertical full-width stack instead of 2-column grid — better for 2 projects
# 6. Experience: accordion (expand/collapse) instead of always-expanded 2-column cards — saves space
# 7. CTA button: rounded rect (4px) instead of full pill — cleaner in light theme context

---

## 1. COLOR TOKENS

```css
:root {
  /* Backgrounds */
  --color-bg:              #FFFFFF;
  --color-bg-secondary:    #F5F5F5;   /* subtle section background */
  --color-bg-card:         #F4F4F7;   /* project cards, experience items — matches reference */

  /* Text */
  --color-text:            #1A1A1A;   /* primary body & headings */
  --color-text-secondary:  #6B7280;   /* labels, metadata, captions */
  --color-text-muted:      #858593;   /* placeholder, disabled — matches reference muted */

  /* Accent */
  --color-accent:          #2563EB;
  --color-accent-hover:    #1D4ED8;

  /* Borders & Dividers */
  --color-border:          rgba(0, 0, 0, 0.08);
  --color-border-strong:   rgba(0, 0, 0, 0.16);

  /* Semantic */
  --color-badge-bg:        rgba(37, 99, 235, 0.08);
  --color-badge-text:      #2563EB;
}
```

---

## 2. TYPOGRAPHY

**Font:** Inter (regular, not Inter Tight) — loaded from Google Fonts
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

```css
:root {
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  /* Scale */
  --text-xs:    12px;   /* badges, labels uppercase */
  --text-sm:    14px;   /* footer, captions, secondary meta — matches reference logo label */
  --text-base:  16px;   /* body text — intentionally 16px vs reference's 20px */
  --text-lg:    18px;   /* nav logo, company names */
  --text-xl:    24px;   /* card titles, accordion company names, section subheadings */
  --text-2xl:   32px;   /* section headings (h2) */
  --text-3xl:   48px;   /* large headings */
  --text-hero:  clamp(36px, 5vw, 72px);  /* hero h1 — matches reference 72px max */

  /* Weights */
  --weight-regular:  400;
  --weight-medium:   500;
  --weight-semibold: 600;
  --weight-bold:     700;

  /* Line heights */
  --leading-tight:   1.1;   /* hero, large display text */
  --leading-snug:    1.3;   /* headings */
  --leading-normal:  1.5;   /* body */
  --leading-relaxed: 1.7;   /* long-form case study prose */
}
```

### Typography Usage Map

| Element | Size | Weight | Color | Note |
|---|---|---|---|---|
| Hero h1 | `--text-hero` | 700 | `--color-text` | 700 compensates for regular Inter vs Tight |
| Section h2 | `--text-2xl` | 700 | `--color-text` | |
| Card / Accordion h3 | `--text-xl` | 600 | `--color-text` | |
| Case study h1 | `--text-3xl` | 700 | `--color-text` | |
| Case study h2 | `--text-2xl` | 700 | `--color-text` | |
| Case study h3 | `--text-xl` | 600 | `--color-text` | |
| Body | `--text-base` | 400 | `--color-text` | |
| Label / Badge | `--text-xs` | 600 | `--color-badge-text` | uppercase, letter-spacing 0.08em |
| Secondary meta | `--text-sm` | 400 | `--color-text-secondary` | |
| Nav links | `--text-base` | 500 | `--color-text` | |
| Footer | `--text-sm` | 400 | `--color-text-secondary` | |

---

## 3. SPACING SYSTEM

8px base grid.

```css
:root {
  --space-1:   4px;
  --space-2:   8px;
  --space-3:   12px;
  --space-4:   16px;
  --space-5:   24px;
  --space-6:   32px;
  --space-7:   48px;
  --space-8:   64px;
  --space-9:   80px;
  --space-10:  120px;
}
```

---

## 4. LAYOUT

```css
:root {
  --max-width:         1200px;
  --container-padding: 24px;   /* mobile: 16px */

  --radius-sm:   4px;     /* badges, buttons — intentional departure from reference pill shape */
  --radius-md:   8px;     /* cards, images */
  --radius-lg:   16px;    /* larger card surfaces */
  --radius-xl:   32px;    /* reference uses 32px on project card images — use where needed */
  --radius-full: 9999px;  /* pill — available but not default */

  --shadow-sm:    0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md:    0 4px 12px rgba(0, 0, 0, 0.10);
  --shadow-hover: 0 8px 24px rgba(0, 0, 0, 0.12);

  --transition: 0.2s ease;
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}
```

---

## 5. COMPONENTS

### 5.1 Header / Nav
```
DESIGN DECISION: Standard sticky top bar — not the floating pill from reference.
The pill nav requires an avatar photo and doesn't translate well to a light recruiter context.

Position:   sticky, top: 0, z-index: 100
Height:     64px
Background: rgba(255, 255, 255, 0.85)
Backdrop:   blur(12px)             ← matches reference
Border:     border-bottom: 1px solid var(--color-border)

Left:  "Danylo Ivanov" text — var(--text-lg), weight 600, color: var(--color-text), links to #hero
Right: nav links + LinkedIn icon (20px SVG) + "Let's talk" CTA button

Nav links:
  font-size: var(--text-base)
  font-weight: 500
  color: var(--color-text)
  hover: color: var(--color-accent), transition: var(--transition)

Mobile (<768px): hamburger icon, aria-expanded="false", aria-label="Open menu"
  Dropdown: full-width, background: var(--color-bg), padding: var(--space-5)
```

### 5.2 Buttons

**Primary (CTA) — "Let's talk", "Send me an email"**
```css
.btn-primary {
  background:      var(--color-accent);
  color:           #FFFFFF;
  border-radius:   var(--radius-sm);   /* 4px — intentional, not pill */
  padding:         12px 24px;
  font-size:       var(--text-base);
  font-weight:     var(--weight-semibold);
  border:          none;
  cursor:          pointer;
  transition:      background var(--transition);
  text-decoration: none;
  display:         inline-flex;
  align-items:     center;
  gap:             var(--space-2);
}
.btn-primary:hover { background: var(--color-accent-hover); }
```

**Outline / Ghost**
```css
.btn-outline {
  background:      transparent;
  color:           var(--color-text);
  border:          1.5px solid var(--color-border-strong);
  border-radius:   var(--radius-sm);
  padding:         12px 24px;
  font-size:       var(--text-base);
  font-weight:     var(--weight-medium);
  cursor:          pointer;
  transition:      border-color var(--transition), color var(--transition);
  text-decoration: none;
  display:         inline-flex;
  align-items:     center;
}
.btn-outline:hover {
  border-color: var(--color-accent);
  color:        var(--color-accent);
}
```

**Text link with arrow**
```css
.link-arrow {
  color:           var(--color-text);
  font-size:       var(--text-base);
  font-weight:     var(--weight-medium);
  text-decoration: none;
  display:         inline-flex;
  align-items:     center;
  gap:             var(--space-2);
  transition:      color var(--transition);
}
.link-arrow:hover { color: var(--color-accent); }
```

### 5.3 Role / Scope Badge
```css
.badge {
  display:        inline-block;
  background:     var(--color-badge-bg);
  color:          var(--color-badge-text);
  font-size:      var(--text-xs);
  font-weight:    var(--weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding:        4px 8px;
  border-radius:  var(--radius-sm);
}
```

### 5.4 Project Cards — "Selected work"
```
DESIGN DECISION: Stacked vertically, full content width.
Reference uses 2-column grid with 32px radius. For 2 projects, vertical full-width
gives more visual weight and better image presentation.

Section title: "Selected work" — h2, var(--text-2xl), weight 700
               margin-bottom: var(--space-7)

Cards list: display: flex, flex-direction: column, gap: var(--space-8)

Each card:
  - Wrapper: display block, text-decoration none, color inherit

  - Image container:
      aspect-ratio: 2 / 1
      border-radius: var(--radius-xl)   ← 32px, matches reference card image radius
      overflow: hidden
      background: var(--color-bg-card)

  - Image:
      width: 100%, height: 100%, object-fit: cover
      transition: transform 0.4s ease
      hover (on card wrapper): transform: scale(1.02)

  - Meta (below image):
      margin-top: var(--space-5)

  - Role badge: .badge

  - Title: h3, var(--text-xl), weight 600, color: var(--color-text)
      margin-top: var(--space-3)

  - Description: p, var(--text-base), color: var(--color-text-secondary),
      line-height: var(--leading-normal), margin-top: var(--space-3), max-width: 640px

  - "View on Behance →": .link-arrow, margin-top: var(--space-4)
```

### 5.5 Experience — Accordion
```
DESIGN DECISION: Accordion with expand/collapse — not the always-expanded 2-column cards
from reference. Saves vertical space, more scannable for recruiters.

Section title: "Experience" — h2, var(--text-2xl), weight 700
               margin-bottom: var(--space-7)

Accordion list:
  border-top: 1px solid var(--color-border)

Each item (.accordion-item):
  border-bottom: 1px solid var(--color-border)

  Trigger button (.accordion-trigger):
    display:         flex
    justify-content: space-between
    align-items:     center
    width:           100%
    padding:         var(--space-6) 0
    background:      none
    border:          none
    cursor:          pointer
    text-align:      left

    - Company name: var(--text-xl), weight 700, color: var(--color-text)
    - Period: var(--text-sm), var(--color-text-secondary)
    - Icon: "+" closed → "−" open, var(--text-xl), var(--color-text-secondary)
    - aria-expanded: "false" / "true"

  Content (.accordion-content):
    padding:    0 0 var(--space-7)
    display:    grid
    gap:        var(--space-6)

    Desktop (≥1024px): grid-template-columns: repeat(4, 1fr)
    Tablet  (≥768px):  grid-template-columns: repeat(2, 1fr)
    Mobile  (<768px):  grid-template-columns: 1fr

    Column header: var(--text-xs), weight 600, uppercase, letter-spacing 0.08em,
                   color: var(--color-text-secondary), margin-bottom: var(--space-3)
    Column value:  var(--text-sm), weight 400, color: var(--color-text),
                   line-height: var(--leading-normal)

  JS: toggle .is-open class on .accordion-item
  Animation: max-height 0 → content height via JS, transition 0.3s ease

Below accordion: "More details on my LinkedIn →" — .link-arrow, margin-top: var(--space-6)
```

### 5.6 Company Logos Strip
```
Verified against reference: label 14px secondary color, logos at reduced opacity.

Label: "I worked with the teams at:"
  font-size:     var(--text-sm)    ← 14px, matches reference
  color:         var(--color-text-secondary)
  margin-bottom: var(--space-4)

Logos row:
  display:     flex
  align-items: center
  gap:         var(--space-7)
  flex-wrap:   wrap

Each company (text or SVG):
  font-size:   var(--text-lg)
  font-weight: var(--weight-semibold)
  color:       var(--color-text)
  opacity:     0.4    ← matches reference visual treatment

Section padding: var(--space-7) 0
```

### 5.7 Metrics Strip (Case Study)
```
Display: grid
  Desktop: grid-template-columns: repeat(4, 1fr)
  Mobile:  grid-template-columns: repeat(2, 1fr)
Gap:            var(--space-6)
Border-bottom:  1px solid var(--color-border)
Padding-bottom: var(--space-7)
Margin-bottom:  var(--space-7)

Each stat:
  - Number: var(--text-3xl), weight 700, color: var(--color-text), line-height: 1
  - Label:  var(--text-sm), color: var(--color-text-secondary), margin-top: var(--space-2)
```

### 5.8 Metadata Cards (Case Study)
```
Verified: reference experience cards use 40px 48px padding.
Metadata cards use a slightly lighter version of the same pattern.

Display:   flex, flex-wrap: wrap, gap: var(--space-5)

Each card:
  background:    var(--color-bg-card)          ← #F4F4F7
  border-radius: var(--radius-md)
  padding:       var(--space-5) var(--space-6) ← 24px 32px
  min-width:     160px
  flex:          1

  Header: var(--text-xs), weight 600, uppercase, letter-spacing 0.08em,
          color: var(--color-text-secondary), margin-bottom: var(--space-3)
  Value:  var(--text-base), weight 500, color: var(--color-text),
          line-height: var(--leading-normal)
```

### 5.9 Contact Section
```
Background: var(--color-bg-secondary)
Padding:    var(--space-10) 0

Heading:  h2, var(--text-2xl), weight 700
Subline:  p, var(--text-lg), color: var(--color-text-secondary),
          margin-top: var(--space-3), max-width: 480px

CTA:      .btn-primary "Send me an email", margin-top: var(--space-6)

Social links:
  display:    flex
  gap:        var(--space-5)
  margin-top: var(--space-6)
  flex-wrap:  wrap

  Each: 20px SVG icon + label
    font-size: var(--text-base)
    color:     var(--color-text-secondary)
    hover:     var(--color-accent)
```

### 5.10 Footer
```
Border-top: 1px solid var(--color-border)
Padding:    var(--space-5) 0
Display:    flex, justify-content: space-between, align-items: center

Left:  "© 2026 Danylo Ivanov" — var(--text-sm), var(--color-text-secondary)
Right: social icon links (LinkedIn, Behance, Telegram)
  SVG:   18px
  color: var(--color-text-secondary)
  hover: var(--color-accent)
  gap:   var(--space-4)
```

---

## 6. PAGE SECTIONS — HOMEPAGE

```
[Header]         sticky, 64px, blur nav
[Hero]           padding-top: var(--space-10), padding-bottom: var(--space-9)
[Company Logos]  padding: var(--space-7) 0
[Projects]       padding: var(--space-10) 0
[Experience]     padding: var(--space-10) 0
[Contact]        padding: var(--space-10) 0, background: var(--color-bg-secondary)
[Footer]         padding: var(--space-5) 0
```

### Hero Typography Pattern
```html
<h1>
  Not just <span class="strike">assumptions</span> —<br>
  <em class="accent">user research</em><br>
  and <strong>data.</strong>
</h1>
```
```css
h1 {
  font-size:   var(--text-hero);      /* clamp(36px, 5vw, 72px) */
  font-weight: var(--weight-bold);    /* 700 — compensates for regular Inter */
  line-height: var(--leading-tight);  /* 1.1 */
  color:       var(--color-text);
  max-width:   900px;
}
.accent {
  color:      var(--color-accent);
  font-style: normal;
}
.strike {
  text-decoration: line-through;
  color:           var(--color-text-secondary);
}
```

---

## 7. PAGE SECTIONS — CASE STUDY

```
[Nav]             standard sticky header + "← Back to work" link
[Case Hero]       padding: var(--space-10) 0 var(--space-7)
[Metrics Strip]   padding: var(--space-7) 0
[Metadata Cards]  padding: var(--space-7) 0
[Narrative]       padding: var(--space-8) 0 — prose sections with images between
[Key Findings]    callout block — accent left border
[Design Screens]  full-width images, border-radius: var(--radius-xl), gap: var(--space-6)
[Key Learnings]   3-col card grid desktop, 1-col mobile
[Case CTA]        "Let's work together" + button, background: var(--color-bg-secondary)
```

### Case Study Hero
```html
<section class="case-hero">
  <span class="badge">UX/UI Design · Education · Mobile</span>
  <h1>SKVOT — Designing a mobile app for Ukraine's largest pop-culture school</h1>
  <p class="subline">End-to-end UX/UI design concept — from user research to high-fidelity UI.</p>
</section>
```
```css
.case-hero {
  padding: var(--space-10) 0 var(--space-7);
}
.case-hero h1 {
  font-size:     clamp(32px, 4vw, 56px);
  font-weight:   var(--weight-bold);
  line-height:   var(--leading-snug);
  max-width:     800px;
  margin-top:    var(--space-4);
}
.case-hero .subline {
  font-size:  var(--text-lg);
  color:      var(--color-text-secondary);
  max-width:  640px;
  margin-top: var(--space-4);
}
```

### Key Finding Callout
```css
.callout {
  background:    var(--color-bg-secondary);
  border-left:   3px solid var(--color-accent);
  border-radius: var(--radius-md);
  padding:       var(--space-5) var(--space-6);
  margin:        var(--space-7) 0;
}
.callout .stat {
  font-size:   var(--text-2xl);
  font-weight: var(--weight-bold);
  color:       var(--color-accent);
}
.callout .stat-label {
  font-size:  var(--text-sm);
  color:      var(--color-text-secondary);
  margin-top: var(--space-2);
}
```

### Key Learnings Grid
```css
.learnings-grid {
  display:               grid;
  grid-template-columns: repeat(3, 1fr);
  gap:                   var(--space-5);
  margin-top:            var(--space-7);
}
@media (max-width: 768px) {
  .learnings-grid { grid-template-columns: 1fr; }
}
.learning-card {
  background:    var(--color-bg-card);
  border-radius: var(--radius-md);
  padding:       var(--space-6);
}
.learning-card h4 {
  font-size:     var(--text-base);
  font-weight:   var(--weight-semibold);
  color:         var(--color-text);
  margin-bottom: var(--space-3);
}
.learning-card p {
  font-size:   var(--text-sm);
  color:       var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}
```

### Narrative Prose
```css
.case-prose {
  max-width:   680px;
  font-size:   var(--text-base);
  line-height: var(--leading-relaxed);
  color:       var(--color-text);
}
.case-prose h2 {
  font-size:     var(--text-2xl);
  font-weight:   var(--weight-bold);
  margin-top:    var(--space-8);
  margin-bottom: var(--space-4);
}
.case-prose h3 {
  font-size:     var(--text-xl);
  font-weight:   var(--weight-semibold);
  margin-top:    var(--space-6);
  margin-bottom: var(--space-3);
}
.case-prose p { margin-bottom: var(--space-4); }
```

---

## 8. RESPONSIVE BREAKPOINTS

```css
/* Mobile first — base <768px: single column, 16px padding */

@media (min-width: 768px) {
  :root { --container-padding: 24px; }
  /* 2-col: metadata cards, learnings (intermediate) */
}

@media (min-width: 1024px) {
  /* Full desktop:
     - Accordion expanded grid: 4 columns
     - Learnings grid: 3 columns
     - Metrics strip: 4 columns
  */
}
```

---

## 9. ACCESSIBILITY

- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section id="" aria-label="">`, `<article>`, `<footer>`
- Heading hierarchy: `h1` hero → `h2` sections → `h3` cards → `h4` accordion sub-labels
- `aria-expanded="false/true"` on accordion triggers and hamburger button
- `aria-label` on all icon-only links
- `alt` text on all images — descriptive, not filenames
- Focus ring: `outline: 2px solid var(--color-accent); outline-offset: 4px;`
- Contrast: `#1A1A1A` on `#FFFFFF` = 16.1:1 ✓ | `#6B7280` on `#FFFFFF` = 4.6:1 ✓

---

## 10. SCROLL ANIMATIONS (optional, vanilla JS)

```css
.animate-in {
  opacity:    0;
  transform:  translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.animate-in.is-visible {
  opacity:   1;
  transform: translateY(0);
}
```
```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
```

---

## 11. META TAGS

```html
<html lang="en">
<head>
  <title>Danylo Ivanov — Product Designer</title>
  <meta name="description" content="Product Designer (Mobile, UX/UI) building mobile experiences through user research and data. Human-centered. Data-driven.">
  <meta property="og:title" content="Danylo Ivanov — Product Designer">
  <meta property="og:description" content="Product Designer (Mobile, UX/UI) building mobile experiences through user research and data.">
  <meta property="og:type" content="website">
  <meta property="og:image" content="/og-image.jpg">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
```

---

## 12. WHAT'S EXCLUDED vs damianskotzke.com

Deliberately not included — wrong context for a recruiter portfolio:
- Testimonials section
- Pricing / Offer section
- Manifesto section
- FAQ section
- Availability status badge in hero
- Social follower counts in footer
- Avatar photo in nav
- Floating pill nav shape
- Dark hero background / gradient

Final structure: **Header → Hero → Company Logos → Projects → Experience → Contact → Footer**