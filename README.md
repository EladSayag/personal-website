# Personal Website

Static site: plain HTML/CSS/JS, no build step, no framework. Portfolio/resume
homepage plus a Markdown-based blog.

## Structure

```
index.html        home page (hero, about, projects, lectures, education, contact)
blog.html         blog index (reads posts/index.json)
post.html         single post view (reads posts/<slug>.md)
css/style.css     all styling (dark theme, CSS variables at the top)
js/markdown.js    tiny dependency-free Markdown -> HTML renderer
js/blog.js        fetches posts/index.json and renders list/post pages
posts/index.json  post metadata: slug, title, date, excerpt
posts/*.md        post content, one file per post
```

## Editing content

- **Your info**: edit the placeholder text directly in `index.html`
  (name, role, bio, skills, projects, lectures, education, contact links/email).
- **New blog post**: add a Markdown file to `posts/`, then add a matching
  entry to the top of `posts/index.json`. See `posts/welcome-to-my-blog.md`
  for a worked example of supported Markdown syntax.

## Running locally

Fetching `posts/index.json` and the `.md` files requires a real HTTP server
(opening `index.html` directly via `file://` will fail with a CORS error).
From this folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploying

This is a static site — any static host works, with no build command and
`index.html` as the entry point.

- **Netlify**: drag-and-drop this folder at https://app.netlify.com/drop,
  or connect a GitHub repo containing it for auto-deploys on push.
- **Vercel**: import the GitHub repo at https://vercel.com/new — no
  framework preset / build command needed.
- **GitHub Pages**: push to a repo and enable Pages on the `main` branch,
  root folder.
