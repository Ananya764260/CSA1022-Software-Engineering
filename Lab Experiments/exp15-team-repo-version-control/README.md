# Experiment 15 - Team Repository and Version Control
**CO3** | Git / GitHub

## Setup
1. Create repo `team-project` (public/private), add team members as collaborators (*Settings > Collaborators*).
2. Protect `main`: *Settings > Branches > Add rule* -> require pull request + 1 approval.
3. One branch per module:
   ```bash
   git checkout -b module/auth        # member 1
   git checkout -b module/catalog     # member 2
   git checkout -b module/reports     # member 3
   ```
4. Each member commits, pushes, opens a PR; another member reviews, then merge.
5. Resolve conflicts as in Experiment 10.
6. Document the workflow in the repo README (template below).

## README template for the team repo
```markdown
# Team Project
## Branching strategy
- `main`: stable, protected. `module/<name>`: one per module.
## Workflow
1. Branch from main  2. Commit small changes  3. Push  4. Open PR  5. Review (1 approval)  6. Merge  7. Delete branch
## Commit messages
`type: short description` (feat, fix, docs, test, chore)
## Team
| Member | Module |
```
## Submission
Repository link: <paste>
