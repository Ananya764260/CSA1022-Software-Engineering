# Experiment 25 - Fork, Feature Branch and Pull Request to Upstream
**CO4**

```bash
# Fork partner's repo on GitHub, then:
git clone https://github.com/<you>/<repo>.git && cd <repo>
git remote add upstream https://github.com/<partner>/<repo>.git
git fetch upstream && git merge upstream/main     # fetch latest team changes
git checkout -b feature/<your-feature>
# implement feature (do not touch unrelated code)
git add . && git commit -m "feat: <your feature>"
git push -u origin feature/<your-feature>
# GitHub: Contribute -> Open pull request (base repo = partner/upstream)
```
Submission: PR link `<paste>` + short description of the feature.
