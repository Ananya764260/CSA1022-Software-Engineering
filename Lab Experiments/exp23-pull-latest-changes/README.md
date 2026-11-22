# Experiment 23 - Pull Collaborator Changes
**CO4**

```bash
git clone https://github.com/<owner>/<repo>.git && cd <repo>
# collaborator edits a file and pushes to GitHub
git pull origin main
git log --oneline -5          # collaborator's commit appears
git show --stat HEAD          # files they changed
```
Run `bash demo.sh` to simulate a collaborator locally and capture sample output.
