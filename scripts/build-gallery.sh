#!/usr/bin/env bash
# Regenerates the root README.md and index.html gallery, grouped by Frontend Mentor tier.
# Tier = top-level folder (newbie/, junior/, ...), exactly as Frontend Mentor names them.
# Run from the repo root after adding a challenge:  ./scripts/build-gallery.sh
set -euo pipefail

cd "$(dirname "$0")/.."

USER="maadhav-codes"
REPO="frontend-mentor-solutions"
BASE="https://$USER.github.io/$REPO"

# Frontend Mentor order; any other top-level tier folder is appended alphabetically.
TIER_ORDER=(newbie junior intermediate advanced guru)

tiers=()
for t in "${TIER_ORDER[@]}"; do
  compgen -G "$t/*/index.html" >/dev/null && tiers+=("$t")
done
for d in */; do
  t=${d%/}
  [ -f "$t/index.html" ] && continue          # skip nothing-to-do
  compgen -G "$t/*/index.html" >/dev/null || continue
  [[ " ${tiers[*]} " == *" $t "* ]] || tiers+=("$t")
done

projects_in() { compgen -G "$1/*/index.html" | while read -r f; do echo "${f%/index.html}"; done | sort; }

title_of() {
  local t
  t=$(grep -oim1 '<title>[^<]*' "$1/index.html" | sed 's/<title>[[:space:]]*//; s/[[:space:]]*$//')
  t="${t#Frontend Mentor | }"; t="${t#Frontend Mentor| }"; t="${t#Frontend Mentor - }"
  [ -n "$t" ] || t=$(basename "$1")
  printf '%s' "$t"
}

date_of() { git log --reverse --format=%ad --date=format:'%b %Y' -- "$1" | head -1; }

total=0
for t in "${tiers[@]}"; do
  n=$(projects_in "$t" | wc -l | tr -d ' '); total=$((total + n))
done

cap() { printf '%s' "${1^}"; }

# ---------- README ----------
{
  echo "# Frontend Mentor solutions"
  echo
  echo "$total challenges in one repo, grouped by Frontend Mentor difficulty, with every project's"
  echo "original commit history intact (\`git log -- <tier>/<project>/\`). Each folder is a"
  echo "self-contained static site, served live from GitHub Pages."
  echo
  echo "Live gallery: **<$BASE/>**"
  for t in "${tiers[@]}"; do
    echo
    echo "## $(cap "$t") ($(projects_in "$t" | wc -l | tr -d ' '))"
    echo
    echo "| # | Project | Code | Live demo | First commit |"
    echo "|--:|---|---|---|---|"
    i=0
    for p in $(projects_in "$t"); do
      i=$((i+1))
      title=$(title_of "$p" | sed 's/|/\\|/g')
      echo "| $i | **$title** | [\`$p/\`](./$p) | [demo ↗]($BASE/$p/) | $(date_of "$p") |"
    done
  done
  echo
  echo "---"
  echo
  echo "Tiers follow Frontend Mentor's own ratings. The original \`fm-*\` repositories are archived,"
  echo "so older links keep resolving. No build step: open any \`index.html\`, or run"
  echo "\`python3 -m http.server\` in the repo root."
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
<meta name="description" content="Frontend Mentor challenge solutions grouped by difficulty, each with a live demo and its original git history.">
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
  header p { margin: 0; color: var(--muted); max-width: 62ch; }
  header a, footer a { color: var(--accent); text-decoration: none; }
  header a:hover, footer a:hover { text-decoration: underline; }
  .tiers { margin-top: 40px; display: flex; flex-direction: column; gap: 40px; }
  .tier-head { display: flex; align-items: baseline; gap: 10px; margin-bottom: 14px; }
  .tier-head h2 { margin: 0; font-size: 1.15rem; letter-spacing: -.01em; }
  .tier-head .count { color: var(--muted); font-size: .85rem; }
  .grid {
    display: grid; gap: 14px;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
  .card {
    background: var(--card); border: 1px solid var(--line); border-radius: 12px;
    padding: 18px; display: flex; flex-direction: column; gap: 10px;
    transition: border-color .15s ease, transform .15s ease;
  }
  .card:hover { border-color: var(--accent); transform: translateY(-2px); }
  .card h3 { margin: 0; font-size: 1rem; line-height: 1.3; font-weight: 600; }
  .card h3 a { color: inherit; text-decoration: none; }
  .card h3 a:hover { color: var(--accent); }
  .meta { color: var(--muted); font-size: .82rem; }
  .row { margin-top: auto; display: flex; gap: 14px; font-size: .85rem; }
  .row a { color: var(--accent); text-decoration: none; }
  .row a:hover { text-decoration: underline; }
  footer { margin-top: 44px; color: var(--muted); font-size: .85rem; }
</style>
</head>
<body>
<div class="wrap">
  <header>
    <h1>Frontend Mentor solutions</h1>
    <p>
HTML
echo "      $total challenges built one day at a time, grouped by difficulty, each keeping its original"
echo "      commit history. Source: <a href=\"https://github.com/$USER/$REPO\">github.com/$USER/$REPO</a>"
cat <<'HTML'
    </p>
  </header>
  <div class="tiers">
HTML
for t in "${tiers[@]}"; do
  n=$(projects_in "$t" | wc -l | tr -d ' ')
  printf '    <section>\n'
  printf '      <div class="tier-head"><h2>%s</h2><span class="count">%s projects</span></div>\n' "$(cap "$t")" "$n"
  printf '      <div class="grid">\n'
  for p in $(projects_in "$t"); do
    printf '        <article class="card">\n'
    printf '          <h3><a href="./%s/">%s</a></h3>\n' "$p" "$(title_of "$p")"
    printf '          <span class="meta">%s</span>\n' "$(date_of "$p")"
    printf '          <div class="row"><a href="./%s/">Live demo ↗</a><a href="https://github.com/%s/%s/tree/main/%s">Code</a></div>\n' "$p" "$USER" "$REPO" "$p"
    printf '        </article>\n'
  done
  printf '      </div>\n'
  printf '    </section>\n'
done
cat <<HTML
  </div>
  <footer>
    Built with HTML, CSS and vanilla JS · <a href="https://github.com/$USER/$REPO">source on GitHub</a>
  </footer>
</div>
</body>
</html>
HTML
} > index.html

echo "wrote README.md and index.html — $total projects across ${#tiers[@]} tiers (${tiers[*]})"
