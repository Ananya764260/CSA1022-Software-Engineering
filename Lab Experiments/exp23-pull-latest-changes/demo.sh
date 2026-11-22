#!/usr/bin/env bash
set -e
rm -rf /tmp/pull-demo && mkdir /tmp/pull-demo && cd /tmp/pull-demo
git init -q --bare -b main remote.git
git clone -q remote.git me 2>/dev/null; git clone -q remote.git collaborator 2>/dev/null
cd me && git config user.email me@example.com && git config user.name Me
echo "# Demo" > README.md && git add . && git commit -qm "initial" && git push -q origin main
cd ../collaborator && git config user.email c@example.com && git config user.name Collaborator
git pull -q origin main
echo "Collaborator was here" >> README.md && git commit -qam "collab: update README" && git push -q origin main
cd ../me
echo ">>> before pull"; git log --oneline
git pull origin main
echo ">>> after pull"; git log --oneline; cat README.md
