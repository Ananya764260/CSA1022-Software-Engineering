# Experiment 17 - Push and Pull Images with Docker Hub
**CO3**

```bash
# Machine A
docker build -t static-web:1.0 .
docker login
docker tag static-web:1.0 <dockerhub-user>/static-web:1.0
docker push <dockerhub-user>/static-web:1.0

# Machine B (or after `docker rmi` locally)
docker pull <dockerhub-user>/static-web:1.0
docker run -d -p 8080:80 <dockerhub-user>/static-web:1.0
curl http://localhost:8080
```
Submit each command with a screenshot (build, tag, push, Docker Hub repository page, pull, run, browser).
