from jenkins/jenkins:lts-jdk17

user root
RUN curl  -sSL https://get.docker.com/ | sh
user jenkins
