# Experiment 18 - Multi-Container App on Kubernetes (frontend + backend + database)
**CO3**

```bash
# Build images (minikube: eval $(minikube docker-env) first)
docker build -t todo-backend:1.0 backend
docker build -t todo-frontend:1.0 frontend

kubectl apply -f k8s/
kubectl get pods,svc
kubectl logs deploy/backend
minikube service frontend --url         # open in browser

# Scale the frontend
kubectl scale deployment frontend --replicas=5
kubectl get pods -l app=frontend
minikube dashboard                       # screenshot pods/services
```
Architecture: Browser -> `frontend` (nginx, NodePort 30080) -> `/api` proxied to `backend` (Flask) -> `db` (PostgreSQL, ClusterIP).
