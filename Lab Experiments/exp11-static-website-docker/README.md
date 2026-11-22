# Experiment 11 - Static Website with Docker + Nginx
**CO3**

```bash
docker build -t static-site:1.0 .
docker run -d --name static-site -p 8080:80 static-site:1.0
# open http://localhost:8080
docker ps
docker logs static-site
docker stop static-site && docker rm static-site
```
Evidence: screenshots of `docker build`, `docker ps` and the browser page.
