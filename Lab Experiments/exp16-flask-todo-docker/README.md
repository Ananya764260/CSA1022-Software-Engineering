# Experiment 16 - Containerise a Flask To-Do App
**CO3**

```bash
docker build -t <dockerhub-user>/flask-todo:1.0 .
docker run -d --name todo -p 5000:5000 <dockerhub-user>/flask-todo:1.0

# Test inside the container
curl -X POST localhost:5000/todos -H "Content-Type: application/json" -d '{"title":"Learn Docker"}'
curl localhost:5000/todos
curl -X PUT localhost:5000/todos/1
curl -X DELETE localhost:5000/todos/1 -i
docker exec todo python -m pytest -q          # unit tests inside the container

docker login && docker push <dockerhub-user>/flask-todo:1.0
```
Submit: `Dockerfile` + screenshots of each curl result and the pytest run.
