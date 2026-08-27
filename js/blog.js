// Fetches posts/index.json and posts/<slug>.md at runtime — no build step.
// Requires being served over http(s) (fetch of local files fails under
// the file:// protocol); run a static server locally, e.g.:
//   python -m http.server 8000

async function loadIndex() {
  const res = await fetch("posts/index.json");
  if (!res.ok) throw new Error("could not load posts/index.json");
  return res.json();
}

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

async function renderPostList() {
  const listEl = document.getElementById("post-list");
  try {
    const posts = await loadIndex();
    posts.sort((a, b) => (a.date < b.date ? 1 : -1));

    if (posts.length === 0) {
      listEl.innerHTML = '<p class="post-status">no posts yet — add one to posts/index.json</p>';
      return;
    }

    listEl.innerHTML = posts
      .map(
        (p) => `
      <a class="post-row" href="post.html?slug=${encodeURIComponent(p.slug)}">
        <div class="meta">${formatDate(p.date)}</div>
        <h3>${p.title}</h3>
        <p class="excerpt">${p.excerpt || ""}</p>
      </a>`
      )
      .join("");
  } catch (err) {
    listEl.innerHTML = `<p class="post-status">couldn't load posts (${err.message}). If you're opening this file directly, run a local server instead — see js/blog.js.</p>`;
  }
}

async function renderPost() {
  const headerEl = document.getElementById("post-header");
  const bodyEl = document.getElementById("post-body");
  const slug = new URLSearchParams(location.search).get("slug");

  if (!slug) {
    headerEl.querySelector(".post-status")?.remove();
    headerEl.insertAdjacentHTML("beforeend", "<p class=\"post-status\">no post specified.</p>");
    return;
  }

  try {
    const posts = await loadIndex();
    const meta = posts.find((p) => p.slug === slug);
    if (!meta) throw new Error("post not found in index.json");

    const res = await fetch(`posts/${slug}.md`);
    if (!res.ok) throw new Error(`could not load posts/${slug}.md`);
    const md = await res.text();

    document.title = `${meta.title} — Elad Sayag`;
    headerEl.querySelector(".post-status")?.remove();
    headerEl.insertAdjacentHTML(
      "beforeend",
      `<h1>${meta.title}</h1><div class="meta">${formatDate(meta.date)}</div>`
    );
    bodyEl.innerHTML = renderMarkdown(md);
  } catch (err) {
    headerEl.querySelector(".post-status")?.remove();
    headerEl.insertAdjacentHTML("beforeend", `<p class="post-status">couldn't load post (${err.message}).</p>`);
  }
}
