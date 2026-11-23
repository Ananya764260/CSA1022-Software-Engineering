# Q2 - Containerise a Node.js Express Notes Application
**CO3 | CO1 | 25 marks**

A simple Notes API (Express) with a small web page. Notes can be **listed, added, edited and deleted**. They are saved to `/app/data/notes.json`.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/notes` | List all notes |
| GET | `/notes/:id` | Get one note |
| POST | `/notes` | Add a note (`{"title": "...", "content": "..."}`) |
| PUT | `/notes/:id` | Edit a note |
| DELETE | `/notes/:id` | Delete a note |
| GET | `/health` | Health check |
| GET | `/` | Web page for the notes |

Files: `src/` (app code), `test/` (tests), `public/index.html` (UI), `Dockerfile`, `.dockerignore`, `screenshots/` (put your evidence here).

---

## Part A - Design and Implementation (15 marks)

### 1. Run without Docker (optional check)
```bash
npm install
npm test                 # unit tests (store) + API tests
npm start                # http://localhost:3000
```

### 2. Build the image
```bash
docker build -t <dockerhub-user>/notes-app:1.0 .
docker images | grep notes-app
```

### 3. Run the container locally
```bash
docker run -d --name notes -p 3000:3000 <dockerhub-user>/notes-app:1.0
docker ps
docker logs notes
```
Open `http://localhost:3000`.

### 4. Test the functionality inside the container
```bash
# add two notes
curl -X POST localhost:3000/notes -H "Content-Type: application/json" -d '{"title":"Buy milk","content":"2 litres"}'
curl -X POST localhost:3000/notes -H "Content-Type: application/json" -d '{"title":"Docker lab","content":"push image"}'

# list
curl localhost:3000/notes

# edit note 1
curl -X PUT localhost:3000/notes/1 -H "Content-Type: application/json" -d '{"content":"3 litres"}'

# invalid input (expect 400) and missing note (expect 404)
curl -i -X POST localhost:3000/notes -H "Content-Type: application/json" -d '{"content":"no title"}'
curl -i localhost:3000/notes/99

# check from inside the container itself
docker exec notes wget -qO- http://localhost:3000/health
docker exec notes cat /app/data/notes.json
docker inspect --format='{{.State.Health.Status}}' notes     # healthy
```

| Test | Expected result |
|---|---|
| POST valid note | `201` and the note JSON |
| GET `/notes` | Array with both notes |
| PUT `/notes/1` | `200`, content updated |
| POST without title | `400 {"error":"title is required"}` |
| GET `/notes/99` | `404` |
| `/health` | `{"status":"ok"}` |

### 5. Push to Docker Hub
```bash
docker login
docker push <dockerhub-user>/notes-app:1.0
docker tag  <dockerhub-user>/notes-app:1.0 <dockerhub-user>/notes-app:latest
docker push <dockerhub-user>/notes-app:latest
```

### 6. Submit
- `Dockerfile`, `.dockerignore`
- Screenshots in `screenshots/`: `docker-build.png`, `docker-run.png`, `browser.png`, `curl-tests.png`, `docker-push.png`, `dockerhub-page.png`
- Docker Hub link: `https://hub.docker.com/r/<dockerhub-user>/notes-app`

---

## Part B - Analysis (10 marks)

### Dockerfile instructions
| Instruction | What it does | Why it is there |
|---|---|---|
| `FROM node:22-alpine` | Starts from an official image with Node.js 22 on Alpine Linux | Gives a ready runtime; Alpine keeps the image small (about 150 MB instead of 1 GB) |
| `WORKDIR /app` | Sets (and creates) the working folder for later instructions | All commands run in one known place |
| `COPY package*.json ./` | Copies only `package.json` first | Docker caches each layer. The dependency layer is rebuilt only when `package.json` changes, not on every code edit |
| `RUN npm install --omit=dev && npm cache clean --force` | Installs only runtime packages, then removes the npm cache | Smaller image, no test or dev tools in production |
| `COPY src ./src` / `COPY public ./public` | Copies the application code | Code is copied after dependencies, so editing code keeps the install layer cached |
| `RUN mkdir -p /app/data && chown -R node:node /app` | Creates the data folder and gives the `node` user ownership | The non-root user must be allowed to write `notes.json` |
| `USER node` | Runs everything after as the unprivileged `node` user | If the app is compromised, the attacker is not root |
| `ENV PORT=3000 DATA_FILE=/app/data/notes.json` | Sets default environment variables | Configuration without changing code |
| `EXPOSE 3000` | Documents the port the app listens on | Informational; `-p 3000:3000` actually publishes it |
| `HEALTHCHECK ...` | Docker calls `/health` every 30 s | `docker ps` shows `healthy` or `unhealthy`, so failures are detected |
| `CMD ["node", "src/server.js"]` | Default start command (exec form) | Node is PID 1 and receives stop signals correctly |

### Why a `.dockerignore` file?
It lists files that are **not sent to the Docker build context**, in the same way `.gitignore` works for Git.
- `node_modules`: the container installs its own, so copying the host's (possibly Windows/macOS-built) modules could break the app and would bloat the image.
- `.git`, `test`, `screenshots`, `*.md`, `Dockerfile`: not needed at runtime. Leaving them out makes the image smaller and the build faster.
- `.env` and `data`: prevents secrets and local data from being baked into an image that is then pushed publicly to Docker Hub.

### How I verified the app works inside the container
1. `docker ps` shows the container `Up` and `healthy`, with port `0.0.0.0:3000->3000/tcp`.
2. `docker logs notes` shows `Notes app listening on port 3000`.
3. `curl` requests from the host (add, list, edit, error cases) return the expected status codes and JSON.
4. `docker exec notes cat /app/data/notes.json` shows the notes saved in the container's filesystem, and `docker exec notes wget -qO- localhost:3000/health` confirms the app answers from inside.

### What happens to the notes when the container is removed?
Notes live in the container's writable layer at `/app/data/notes.json`. That layer belongs to the container, so:
- `docker stop` + `docker start`: notes are **kept** (same container, same layer).
- `docker rm notes` and `docker run` again: notes are **lost**; the new container starts from the clean image.

To keep notes beyond the container's lifetime, store the data folder in a volume:
```bash
docker run -d --name notes -p 3000:3000 -v notes-data:/app/data <dockerhub-user>/notes-app:1.0
# ...add notes, then:
docker rm -f notes
docker run -d --name notes -p 3000:3000 -v notes-data:/app/data <dockerhub-user>/notes-app:1.0
curl localhost:3000/notes      # notes are still there
```
The named volume `notes-data` is managed by Docker outside the container's layer, so it survives `docker rm`. (Remove it deliberately with `docker volume rm notes-data`.)
