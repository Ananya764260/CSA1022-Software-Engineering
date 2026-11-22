# Experiment 14 - Continuous Deployment with GitHub Actions
**CO4**

1. Push this folder to a GitHub repo (root of repo = contents of this folder, `.github/workflows` at repo root).
2. Add repo secrets (*Settings > Secrets and variables > Actions*): `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`, plus cloud secrets for your target (see workflow comments).
3. Push a change to `main` -> *Actions* tab shows build, push, deploy.
4. Verify: change the message in `app.py`, push again, confirm new version is live.

Deploy target in the workflow: Kubernetes cluster (GKE/AKS/any) using a base64 kubeconfig secret `KUBE_CONFIG`; swap the step for AWS ECS if you prefer.
