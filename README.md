# MANAS CHANDRA — Portfolio v3

> Personal portfolio website built with Next.js 16, Three.js, and Framer Motion.

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS |
| Animation | Framer Motion |
| 3D | Three.js + @react-three/fiber + @react-three/drei |
| Font | Geist (Sans + Mono) |
| Deployment | Vercel |

---

## Features

- **3D Particle Field** — Three.js canvas fixed behind all content, scroll-driven tilt + z-drift, 2000 particles (800 mobile), ~6% orange accent particles
- **Scroll Parallax** — Hero name, tagline, projects, and skills all move at independent rates creating a depth illusion
- **Experience Card 3D Tilt** — Mouse-tracking perspective tilt on hover with spring physics
- **Scroll Progress Bar** — Thin orange indicator at the top of the viewport
- **Custom Cursor** — Dot + spring-lagged ring, morphs on interactive elements (desktop only)
- **Stats Counter** — Numbers count up on viewport entry with ease-out animation
- **OG Image** — Auto-generated Open Graph image matching the site's design language
- **Resume Download** — Direct PDF download from the hero CTA

---

## Sections

```
Hero → About → Experience → Projects → Skills → Contact
```

---

## Design System

```
Background   #0F0F0F
Text         #F0F0F0
Accent       #FF6B00
Surface      #161616
Border       #222222
```

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Root page — wires all sections
│   ├── layout.tsx            # Fonts, SEO metadata, Cursor
│   ├── globals.css           # Design tokens, dot-grid, noise overlay
│   ├── icon.tsx              # Favicon (MC. mark)
│   ├── opengraph-image.tsx   # Auto-generated OG image
│   └── twitter-image.tsx     # Twitter card image
├── components/
│   ├── Navbar.tsx            # Floating pill nav + scroll progress bar
│   ├── Hero.tsx              # Full-screen hero with parallax + stat counters
│   ├── About.tsx             # Bio, interests grid, currently strip
│   ├── Experience.tsx        # Work + education cards with 3D tilt
│   ├── Projects.tsx          # Project rows with scroll parallax
│   ├── Skills.tsx            # Skill category cards with staggered parallax
│   ├── Contact.tsx           # Two-column layout, contact info card
│   ├── ParticleField.tsx     # Three.js particle scene
│   ├── ParticleFieldClient.tsx # SSR-safe wrapper for ParticleField
│   └── Cursor.tsx            # Custom cursor (dot + ring)
└── data/
    └── resume.ts             # Single source of truth for all content
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000)

---

## Performance Notes

- Particle count capped at 800 on mobile, DPR capped at 1.5
- `ParticleField` respects `prefers-reduced-motion` — renders nothing if set
- Three.js loaded with `dynamic({ ssr: false })` — no SSR penalty
- All scroll-driven styles use `mounted` guards to prevent hydration mismatch

---

## License

MIT — feel free to use as reference or inspiration. If you do, a credit would be appreciated.

---

<p align="center">Designed & Built by <strong>Manas Chandra</strong></p>
