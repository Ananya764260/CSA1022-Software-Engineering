#!/usr/bin/env bash
set -e
rm -rf /tmp/conflict-demo && mkdir /tmp/conflict-demo && cd /tmp/conflict-demo
git init -q -b main && git config user.email "demo@example.com" && git config user.name "Demo"
echo "Project: Demo App" > README.md
git add . && git commit -qm "initial commit"

git checkout -qb feature/readme
echo "Project: Demo App - feature branch edit" > README.md
git commit -qam "feature: edit README"

git checkout -q main
echo "Project: Demo App - main branch edit" > README.md
git commit -qam "main: edit README"

git checkout -q feature/readme
echo ">>> merging main into feature (expect conflict)"
git merge main || true
echo ">>> file with conflict markers:"; cat README.md
echo ">>> resolving"
echo "Project: Demo App - combined edit from main and feature" > README.md
git add README.md && git commit -qm "merge: resolve README conflict"
echo ">>> history:"; git log --oneline --graph --all
