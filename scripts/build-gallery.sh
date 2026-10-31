#!/usr/bin/env bash
# Regenerates the root README.md table and index.html gallery from the project folders.
# Run from the repo root after adding a new challenge:  ./scripts/build-gallery.sh
set -euo pipefail

cd "$(dirname "$0")/.."

USER="maadhav-codes"
REPO="frontend-mentor-solutions"
BASE="https://$USER.github.io/$REPO"

projects=()
for d in */; do
  [ -f "${d}index.html" ] || continue
  projects+=("${d%/}")
done

# alphabetical, so the gallery order is stable
IFS=$'\n' projects=($(printf '%s\n' "${projects[@]}" | sort))
unset IFS

count=${#projects[@]}

title_of() {
  local t
  t=$(grep -oim1 '<title>[^<]*' "$1/index.html" | sed 's/<title>[[:space:]]*//; s/[[:space:]]*$//')
  t="${t#Frontend Mentor | }"; t="${t#Frontend Mentor| }"; t="${t#Frontend Mentor - }"
  [ -n "$t" ] || t="$1"
  printf '%s' "$t"
}

date_of() { git log --reverse --format=%ad --date=format:'%b %Y' -- "$1" | head -1; }

# ---------- README ----------
{
  echo "# Frontend Mentor solutions"
  echo
  echo "$count challenges in one repo, with every project's original commit history intact"
  echo "(\`git log -- <project>/\`). Each folder is a self-contained static site, served live from GitHub Pages."
  echo
  echo "| # | Project | Code | Live demo | First commit |"
  echo "|--:|---|---|---|---|"
  i=0
  for p in "${projects[@]}"; do
    i=$((i+1))
    t=$(title_of "$p" | sed 's/|/\\|/g')
    echo "| $i | **$t** | [\`$p/\`](./$p) | [demo ↗]($BASE/$p/) | $(date_of "$p") |"
  done
  echo
  echo "---"
  echo
  echo "The original \`fm-*\` repositories are archived, so older links keep resolving."
  echo "No build step: open \`<project>/index.html\`, or run \`python3 -m http.server\` in the repo root."
} > README.md

# ---------- index.html ----------
{
cat <<'HTML'
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Frontend Mentor solutions — Mayur Dayal</title>
<meta name="description" content="Frontend Mentor challenge solutions, each with a live demo and its original git history.">
<style>
  :root {
    --bg: #f6f7f9; --card: #fff; --ink: #16181d; --muted: #6b7280;
    --line: #e4e7ec; --accent: #3b5bdb;
  }
  @media (prefers-color-scheme: dark) {
    :root { --bg: #101216; --card: #171a20; --ink: #ecedf1; --muted: #9aa1ad;
            --line: #262a33; --accent: #8ba4ff; }
  }
  * { box-sizing: border-box; }
  body {
    margin: 0; background: var(--bg); color: var(--ink);
    font: 16px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }
  .wrap { max-width: 1080px; margin: 0 auto; padding: 56px 20px 72px; }
  header h1 { margin: 0 0 8px; font-size: clamp(1.6rem, 3vw, 2.1rem); letter-spacing: -.02em; }
  header p { margin: 0; color: var(--muted); max-width: 60ch; }
  header a { color: var(--accent); text-decoration: none; }
  header a:hover { text-decoration: underline; }
  .grid {
    margin-top: 36px; display: grid; gap: 14px;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
  .card {
    background: var(--card); border: 1px solid var(--line); border-radius: 12px;
    padding: 18px; display: flex; flex-direction: column; gap: 10px;
    transition: border-color .15s ease, transform .15s ease;
  }
  .card:hover { border-color: var(--accent); transform: translateY(-2px); }
  .card h2 { margin: 0; font-size: 1rem; line-height: 1.3; font-weight: 600; }
  .card h2 a { color: inherit; text-decoration: none; }
  .card h2 a:hover { color: var(--accent); }
  .meta { color: var(--muted); font-size: .82rem; }
  .row { margin-top: auto; display: flex; gap: 14px; font-size: .85rem; }
  .row a { color: var(--accent); text-decoration: none; }
  .row a:hover { text-decoration: underline; }
  footer { margin-top: 44px; color: var(--muted); font-size: .85rem; }
  footer a { color: var(--accent); text-decoration: none; }
</style>
</head>
<body>
<div class="wrap">
  <header>
    <h1>Frontend Mentor solutions</h1>
    <p>
HTML
echo "      $count challenges built one day at a time, each keeping its original commit history."
cat <<HTML
      Source: <a href="https://github.com/$USER/$REPO">github.com/$USER/$REPO</a>
    </p>
  </header>
  <main class="grid">
HTML
  for p in "${projects[@]}"; do
    t=$(title_of "$p")
    printf '    <article class="card">\n'
    printf '      <h2><a href="./%s/">%s</a></h2>\n' "$p" "$t"
    printf '      <span class="meta">%s</span>\n' "$(date_of "$p")"
    printf '      <div class="row"><a href="./%s/">Live demo ↗</a><a href="https://github.com/%s/%s/tree/main/%s">Code</a></div>\n' "$p" "$USER" "$REPO" "$p"
    printf '    </article>\n'
  done
cat <<HTML
  </main>
  <footer>
    Built with HTML, CSS and vanilla JS · <a href="https://github.com/$USER/$REPO">source on GitHub</a>
  </footer>
</div>
</body>
</html>
HTML
} > index.html

echo "wrote README.md and index.html ($count projects)"
