# Experiment 13 - CI/CD with Jenkins and Docker
**CO4**

## Setup
1. Run Jenkins with Docker access:
   ```bash
   docker run -d --name jenkins -p 8081:8080 -p 50000:50000 \
     -v jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock \
     jenkins/jenkins:lts-jdk17
   docker exec -u root jenkins sh -c "apt-get update && apt-get install -y docker.io python3 python3-pip python3-venv"
   ```
2. Open `http://localhost:8081`, unlock with `docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword`, install suggested plugins.
3. Add credentials: *Manage Jenkins > Credentials* -> Username/password, ID `dockerhub-creds`.
4. New Item -> **Pipeline** -> *Pipeline script from SCM* -> your repo, script path `Jenkinsfile`.
5. Triggers: *GitHub hook trigger for GITScm polling* (add webhook `http://<jenkins-host>:8081/github-webhook/` in GitHub) or *Poll SCM* `H/2 * * * *`.

Sample app is in [`app/`](app). The `Jenkinsfile` builds, tests, pushes to Docker Hub and deploys (stage uses SSH/kubectl placeholders for AWS/GCP).
