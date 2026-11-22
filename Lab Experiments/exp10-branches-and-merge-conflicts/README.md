# Experiment 10 - Branches and Merge Conflicts
**CO3** | Git / GitHub

## Run the local demo
`bash demo.sh` creates a throw-away repo, produces a real conflict and resolves it. Copy its output into your report. Then repeat the same steps on a shared GitHub repo with a teammate.

## Steps against GitHub
```bash
git clone https://github.com/<owner>/<shared-repo>.git && cd <shared-repo>
git checkout -b feature/update-readme
# edit README.md
git add README.md && git commit -m "docs: update README on feature branch"
git push -u origin feature/update-readme

git checkout main && git pull origin main          # latest main
git checkout feature/update-readme
git merge main                                     # may report CONFLICT
# open the file, look for <<<<<<<, =======, >>>>>>>, edit to final text
git add README.md                                  # mark resolved
git commit -m "merge: resolve README conflict with main"
git push origin feature/update-readme
# open Pull Request on GitHub
```

## Report template
- Steps performed: ...
- Conflict encountered: file `README.md`, same line edited on both branches
- Resolution: kept both sentences / chose ... because ...
