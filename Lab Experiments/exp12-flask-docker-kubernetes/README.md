# Experiment 12 - Flask API -> Docker -> Docker Hub -> Kubernetes
**CO3**

```bash
# Run locally
pip install -r requirements.txt && python app.py          # http://localhost:5000

# Build, push
docker build -t <dockerhub-user>/flask-api:1.0 .
docker login
docker push <dockerhub-user>/flask-api:1.0

# Deploy (edit the image name in k8s/deployment.yaml first)
kubectl apply -f k8s/deployment.yaml -f k8s/service.yaml
kubectl get pods,svc
# Access via NodePort 30007
minikube service flask-api-service --url      # minikube
curl http://<node-ip>:30007/health
```
Evidence: `docker push` output, Docker Hub page, `kubectl get pods,svc`, `curl` response.
