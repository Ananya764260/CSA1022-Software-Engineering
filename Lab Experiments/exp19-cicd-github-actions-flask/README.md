# Experiment 19 - CI/CD Pipeline with GitHub Actions (Flask + Docker)
**CO3**

1. Push this folder as the root of a new GitHub repo.
2. Secrets: `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`, `RENDER_DEPLOY_HOOK` (Render/Heroku-style deploy hook URL or equivalent).
3. Push to `main` -> workflow runs tests, builds and pushes the image, then triggers the deploy.
4. Submit the workflow file (`.github/workflows/ci-cd.yml`) and the deployment URL.

For AWS/Heroku, replace the *Deploy* step: `heroku container:release` or `aws ecs update-service --force-new-deployment`.
