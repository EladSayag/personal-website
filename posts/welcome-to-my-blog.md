This is the first post on the blog. It's written in plain **Markdown** — no
build step, no server, just a `.md` file that gets fetched and rendered by
the browser.

## How to add a new post

1. Write a new Markdown file in the `posts/` folder, e.g. `posts/my-post.md`.
2. Add an entry for it at the top of `posts/index.json`:

```json
{
  "slug": "my-post",
  "title": "My Post Title",
  "date": "2026-09-01",
  "excerpt": "One sentence teaser shown on the blog index."
}
```

3. That's it — `blog.html` reads `index.json` to build the list, and
   `post.html?slug=my-post` fetches `posts/my-post.md` and renders it.

## What's supported

Headings, **bold**, *italic*, `inline code`, fenced code blocks, links,
images, blockquotes, and both list types:

- unordered items
- like this one

> A blockquote, if you need one.

That covers most of what a blog post needs without pulling in a Markdown
library or a build pipeline.
