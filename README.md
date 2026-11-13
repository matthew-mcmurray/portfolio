# Matthew McMurray — Portfolio

Next.js 16 · React 19 · JavaScript · CSS Modules · self-hosted fonts. No backend.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

## Where things live

| What | File |
| --- | --- |
| **All text, links, colors, media paths** | `src/content/site.ts` |
| Name animation — final look per letter | `src/components/name-scramble/glyphs.ts` (`FINAL_GLYPHS`) |
| Name animation — timing | top of `src/components/name-scramble/NameScramble.tsx` |
| Global colors, fonts, spacing tokens | `src/app/globals.css` (`:root`) |
| Landing page order | `src/app/page.tsx` |
| Case study pages (`/work/[slug]`) | `src/app/work/[slug]/` |

## Adding your images & videos

1. Put files in `public/media/` (e.g. `public/media/dashboard.mp4`).
2. In `src/content/site.ts`, set `src: "/media/dashboard.mp4"` on the item.
3. Empty `src` = a placeholder slot, so you can see where things go.

Tips: export video loops as MP4 (H.264), muted, 5–15s, under ~3 MB, and
add a `poster` image. Use `.webp` for stills. Videos only play while on screen.

## Changing the name animation

`FINAL_GLYPHS` has one entry per character of your name (the space included).
Each entry picks a font (`sans`, `serif`, `pixel`, `stretch`, `grotesk`) plus
options: `weight`, `width` (50–150, stretch font only), `italic`, `outline`,
`shadow`, `accent`. Design the final word in Figma, then copy the choices in.
To remove the scanline texture, delete the `.name::after` block in
`NameScramble.module.css`.

To use different fonts: `npm i @fontsource/<font>`, import it in
`src/app/layout.tsx`, and add it to `FONTS` in `glyphs.ts`.

## Deploy (Vercel)

1. Push this folder to a GitHub repo.
2. vercel.com → Add New Project → import the repo → Deploy.
3. Every `git push` redeploys. Add a custom domain under Settings → Domains.

## Before you send it

- [ ] Replace every `[Company]`, `[App Name]`, `[College]` and `TODO` in `site.ts`
- [ ] Add `public/resume.pdf`
- [ ] Set your email, LinkedIn, GitHub, and `sourceUrl`
- [ ] Check on your phone
