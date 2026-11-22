# Experiment 9 - Fork-and-Pull-Request Workflow
**CO3** | Git / GitHub

## Commands
```bash
# 1. Fork on GitHub (Fork button) the repo, e.g. octocat/Spoon-Knife
# 2. Clone YOUR fork
git clone https://github.com/<your-username>/<repo>.git && cd <repo>
git remote add upstream https://github.com/<original-owner>/<repo>.git

# 3. Branch
git checkout -b feature/add-greeting-function

# 4. Change (add a function / fix bug / update README)
echo "Added greeting helper - <your name>" >> README.md

# 5. Commit and push
git add . && git commit -m "feat: add greeting helper and README note"
git push -u origin feature/add-greeting-function

# 6. Open PR on GitHub: base = main, compare = feature/add-greeting-function
# 7. Review: partner comments via 'Files changed' -> 'Review changes'
# 8. Address feedback
git add . && git commit -m "fix: address review comments" && git push
# 9. Approve + 'Merge pull request'
git checkout main && git pull upstream main
```

## Submission template (`SUBMISSION.md`)
See [SUBMISSION.md](SUBMISSION.md).
