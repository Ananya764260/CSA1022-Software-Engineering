# Experiment 20 - Create Repo, Clone, Edit README, Push
**CO3**

```bash
# 1. GitHub: New repository -> name: my-personal-project -> tick "Add a README"
# 2. Clone
git clone https://github.com/<username>/my-personal-project.git
cd my-personal-project
# 3. Edit README.md
cat >> README.md <<'TXT'

## About
A personal project to practise Git and GitHub. Built for CSA10 Software Engineering.
TXT
# 4. Stage, commit, push
git status
git add README.md
git commit -m "docs: add project description"
git push origin main
```
Evidence: screenshot of the terminal and the updated README on GitHub; repo link: `<paste>`.
