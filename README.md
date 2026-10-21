# portfolio

My personal site: **[ayush-agarwal07.github.io/portfolio](https://ayush-agarwal07.github.io/portfolio/)**

One page with my experience, projects and research. The hero is an ASCII black hole you can feed by clicking it, and scrolling dives into it.

Built with Next.js, React and TypeScript, exported as a static site to GitHub Pages. The animations are plain text in `<pre>` tags, no canvas or animation libraries.

## Running locally

```bash
npm install
npm run dev    # http://localhost:3000/portfolio
```

`npm run check` type-checks and `npm run build` writes the static site to `out/`.

## Where things are

- `data/portfolio.tsx`: all the copy. Most edits only touch this file.
- `app/page.tsx`: page structure
- `app/globals.css`: styles and the light/dark color tokens
- `components/`: the ASCII animations and the theme toggle

## Deploying

Every push to `main` builds and deploys through `.github/workflows/deploy.yml`. In the repo's Pages settings, the source has to be **GitHub Actions**, not a branch.

[ayush-agarwal07.github.io](https://ayush-agarwal07.github.io) currently redirects here from a separate repo. To serve the site from the root instead, rename this repo to `ayush-agarwal07.github.io` and remove `basePath` from `next.config.mjs`.
