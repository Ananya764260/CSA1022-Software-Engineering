#!/usr/bin/env bash
# Simulates the whole exercise locally. A bare repository plays the role of GitHub, so the output
# (git log --oneline, git status, ignored files) is real. On GitHub you run the same commands.
set -e
SRC="$(cd "$(dirname "$0")" && pwd)/portfolio-website"
W=/tmp/q3-demo; rm -rf "$W"; mkdir -p "$W"; cd "$W"

git init -q --bare -b main github-remote.git                      # stands in for github.com/<user>/portfolio-website

echo '$ # Step 1: repository created on GitHub with an initial README'
git clone -q github-remote.git seed 2>/dev/null
( cd seed && git config user.email you@example.com && git config user.name "Your Name"
  echo "# portfolio-website" > README.md && git add README.md && git commit -qm "Initial commit" && git push -q origin main )

echo; echo '$ git clone https://github.com/<user>/portfolio-website.git'
git clone -q github-remote.git portfolio-website && cd portfolio-website
git config user.email you@example.com && git config user.name "Your Name"
ls -a

echo; echo '$ # Step 2: files that must NOT be committed appear in the working folder'
mkdir node_modules && echo "x" > node_modules/pkg.js && echo "API_KEY=secret123" > .env && echo "error" > debug.log && touch .DS_Store
echo '$ git status --short      (BEFORE .gitignore: junk and secrets show as untracked)'
git status --short

echo; echo '$ # Step 3: add .gitignore'
cp "$SRC/.gitignore" .gitignore
echo '$ git status --short      (AFTER .gitignore: only .gitignore itself is listed)'
git status --short
echo; echo '$ git status --ignored --short'
git status --ignored --short
echo; echo '$ git check-ignore -v .env debug.log node_modules/pkg.js'
git check-ignore -v .env debug.log node_modules/pkg.js
git add .gitignore && git commit -qm "chore: add .gitignore for node_modules, env files and logs"

echo; echo '$ # Step 4: update README.md with the project description'
cp "$SRC/README.md" README.md
git diff --stat
git add README.md && git commit -qm "docs: add project description to README"

echo; echo '$ # Step 5: add the website files'
mkdir -p css && cp "$SRC/index.html" . && cp "$SRC/css/style.css" css/
git add index.html css/style.css && git commit -qm "feat: add portfolio homepage and stylesheet"
echo '$ git add .   (ignored files are skipped)'; git add . ; git status --short || true

echo; echo '$ git push origin main'
git push origin main 2>&1 | sed 's#/tmp/q3-demo/##'

echo; echo '$ git log --oneline'
git log --oneline
echo; echo '$ git ls-files        (what Git tracks; no .env, node_modules or logs)'
git ls-files

echo; echo '$ # Caveat: .gitignore does not untrack files that were ALREADY committed'
echo "SECRET=1" > .env.local2 && git add -f .env.local2 && git commit -qm "oops: committed a secret"
echo ".env.local2" >> .gitignore
echo '$ git status --short      (still tracked: edits would still show)'; echo "SECRET=2" > .env.local2; git status --short
echo '$ git rm --cached .env.local2   (stop tracking, keep the file on disk)'
git rm -q --cached .env.local2; git status --short
