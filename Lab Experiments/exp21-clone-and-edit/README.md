# Experiment 21 - Clone an Existing Repository and Edit a File
**CO3**

```bash
git clone https://github.com/<owner>/<repo>.git
cd <repo>
ls
# open a file, make a small change (typo fix / one line)
sed -i 's/teh/the/' README.md        # example typo fix
git diff                              # shows the change
```
Evidence: `git diff` output screenshot and repository URL.
