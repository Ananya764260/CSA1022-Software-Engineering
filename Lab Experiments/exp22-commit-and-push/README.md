# Experiment 22 - Commit Locally and Push
**CO4**

```bash
git clone https://github.com/<username>/<repo>.git && cd <repo>
echo "Updated by <your name>" >> README.md
git add README.md
git commit -m "Updated README"
git push origin main
git log --oneline -3
```
Evidence: output of `git log --oneline -3` and the commit visible on GitHub.
