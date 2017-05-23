FROM openjdk:8-jre

ARG JAR_FILE

ADD $JAR_FILE app.jar

ADD ./dist static

COPY ./.docker/start-java-prod.sh /run.sh

RUN sh -c 'touch /app.jar'

ENTRYPOINT [ "/bin/bash", "/run.sh"]
