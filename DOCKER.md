# Build docker

## Requirements
You need to have the standard environment for this package to be run (meaning node+npm) obviously, and you need docker.

## Build command
You need to give the executable jar of vis-backend for it to work as excepted.

```bash
JAR_FILE=/path/to/waves/vis-backend/with-dependencies.jar npm run build-docker
```

This will build a runnable docker image with the backend running on 9090 (for details about the environnement check out
 `.docker/start-java-prod.sh`.

## Customize docker build
You can provide a DOCKER_OPT environment variable that will be injected to docker build command. Example:

```bash
DOCKER_OPT="--label waves-vis-backend" JAR_FILE=/path/to/waves/vis-backend/with-dependencies.jar npm run build-docker
```

# Docker run
This image will have an entrypoint bound to a `java -jar` call. You can customize this using the env variable JAVA_OPT.

For instance, to give the configuration file to the backend you can do something like.

```bash
docker run [...] -v /path/to/config.trig:/config.trig -e 'JAVA_OPT=-Dwaves.configuration=/config.trig' my-docker-image
```
