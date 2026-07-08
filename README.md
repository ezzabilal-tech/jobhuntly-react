# JobHuntly – Frontend (React)

Recreation of the first 3 pages of the JobHuntly job-hunting website (Figma community template), hand-coded with React + plain CSS — no AI design tools, no Tailwind/UI kits.

## Pages included
1. **Home** (`/`) – hero search, popular categories, featured jobs, CTA banner.
2. **Find Jobs** (`/jobs`) – search bar, sidebar filters, job results list.
3. **Job Detail** (`/jobs/:id`) – full job description, responsibilities, sidebar facts.

## Setup

```bash
npm install
npm start
```

App runs at `http://localhost:3000`.

## Notes on fidelity to the Figma file

I could not open the actual Figma canvas (colors, exact spacing, real logos, real
copy) programmatically — Figma links require an authenticated session to
render layer data. This build uses:

- The well-known JobHuntly color/type system (indigo `#4640DE` primary,
  Epilogue font, soft `#F8F8FD` backgrounds) commonly used in this template.
- Placeholder company/job logos (solid blocks) instead of the real brand marks.
- Realistic but placeholder job copy.

**For an exact, pixel-perfect match**, send me either:
- Screenshots of each of your 3 frames, or
- The Dev Mode CSS export for each frame (select frame → right panel → "Code"), or
- View access to the file.

I'll then tighten spacing, colors, fonts, and swap in the real content/logos to match exactly.

## Structure

```
src/
  components/   Navbar, Footer (shared)
  pages/        Home, FindJobs, JobDetail (+ their .css)
  App.jsx        routes
  index.js       entry point
```
