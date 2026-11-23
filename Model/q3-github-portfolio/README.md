# Q3 - GitHub Repository Setup with .gitignore and README
**CO4 | CO1 | 25 marks**

Personal portfolio website repository: create it on GitHub with a README, clone it, add a `.gitignore`, update the README, and push. **One commit per change.**

| Path | Purpose |
|---|---|
| `portfolio-website/` | The files that go into your repo: `index.html`, `css/style.css`, `.gitignore`, `README.md` |
| `run-demo.sh` | Replays the whole exercise locally (a bare repo stands in for GitHub) |
| `evidence/demo-output.txt` | Real output of the demo, including `git log --oneline` |
| `screenshots/` | **Put your GitHub and terminal screenshots here** |

---

## Part A - Design and Implementation (15 marks)

### 1. Create the GitHub repository
GitHub > **New repository** > name `portfolio-website` > Public > tick **Add a README file** > Create.

### 2. Clone to your local machine
```bash
git clone https://github.com/<username>/portfolio-website.git
cd portfolio-website
git config user.name  "Your Name"
git config user.email "you@example.com"
```

### 3. Add `.gitignore` (commit 1)
Copy `portfolio-website/.gitignore` into the repo.
```bash
git status                       # .gitignore appears as untracked
git add .gitignore
git commit -m "chore: add .gitignore for node_modules, env files and logs"
```

### 4. Update `README.md` with a project description (commit 2)
Copy `portfolio-website/README.md` (or write your own) over the default README.
```bash
git diff
git add README.md
git commit -m "docs: add project description to README"
```

### 5. Add the website (commit 3)
```bash
mkdir css      # then copy index.html and css/style.css into the repo
git add index.html css/style.css
git commit -m "feat: add portfolio homepage and stylesheet"
```

### 6. Push to GitHub
```bash
git push origin main
git log --oneline
```
Then refresh the repository page on GitHub and screenshot the file list, the rendered README and the commit history. Optional: enable **Settings > Pages** to publish the site.

### Evidence
`screenshots/`: `repo-created.png`, `git-clone.png`, `gitignore-commit.png`, `readme-commit.png`, `git-push.png`, `github-repo.png`, `github-commits.png`.
Repository link: `https://github.com/<username>/portfolio-website`

To see real sample output of every step, run `bash run-demo.sh`. The result is saved in `evidence/demo-output.txt`.

---

## Part B - Analysis (10 marks)

### Why is `.gitignore` needed?
A repository should contain **source files only**. `.gitignore` tells Git which untracked files and folders to leave out:
- **Generated or downloadable files** (`node_modules/`, `dist/`, `build/`): they can be recreated with `npm install` or a build, and are very large and noisy in history.
- **Secrets** (`.env`): API keys and passwords committed to a public repo are exposed. Even if deleted later, they stay in the history.
- **Machine-specific files** (`.DS_Store`, `.vscode/`, `*.log`): they differ per developer and cause pointless diffs and merge conflicts.

### How Git treats ignored files
Real output from the demo (`evidence/demo-output.txt`):
```
$ git status --short            # BEFORE .gitignore
?? .DS_Store
?? .env
?? debug.log
?? node_modules/

$ git status --short            # AFTER .gitignore
?? .gitignore                   # only the new file; ignored files disappeared

$ git status --ignored --short
!! .env   !! debug.log   !! node_modules/   !! .DS_Store      # "!!" = ignored

$ git check-ignore -v .env debug.log
.gitignore:5:.env        .env
.gitignore:9:*.log       debug.log
```
- Ignored files **stay on disk** but Git does not list them as untracked, and `git add .` does not stage them (only `git add -f` forces it).
- The `.gitignore` file itself **is committed**, so every collaborator shares the same rules.
- It only affects **untracked** files. A file that was already committed stays tracked until you run `git rm --cached <file>` (shown at the end of the demo).
- Patterns: `folder/` matches a directory, `*.log` matches by extension, `!file` re-includes, and lines starting with `#` are comments.

### `git log --oneline` output
```
2d12990 feat: add portfolio homepage and stylesheet
d1294ee docs: add project description to README
f6cba81 chore: add .gitignore for node_modules, env files and logs
7a1f95d Initial commit
```
(Hashes differ on your machine.)

### Why separate commits for `.gitignore` and the README?
1. **One logical change per commit.** `.gitignore` is repository configuration; the README is documentation. Each commit message says exactly what changed.
2. **Easy review and history.** `git log --oneline` reads like a changelog, and reviewers see small diffs.
3. **Safe undo.** `git revert f6cba81` removes only the ignore rules without touching the documentation (and the reverse). With a combined commit you would have to undo both.
4. **Easier debugging.** `git bisect` and `git blame` point to the precise change.
5. **Ignore rules first.** Committing `.gitignore` before the website files means junk and secrets can never slip into later commits.
6. The README is the project's front page. Keeping its commit separate shows documentation was a deliberate step, and its history can be followed on its own with `git log -- README.md`.
