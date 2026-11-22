# Experiment 24 - `feature-login` Branch and Pull Request
**CO4**

```bash
git checkout -b feature-login
# create login.py (provided in this folder)
git add login.py test_login.py
git commit -m "feat: add simple login function"
git push -u origin feature-login
# GitHub -> Compare & pull request (base: main <- feature-login) -> Create -> Merge
```
Files: [`login.py`](login.py), [`test_login.py`](test_login.py). Run tests: `pip install pytest && pytest`.
