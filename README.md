# node-deploy-monitor

### About

This tool is capable of:

- Build a Docker Image from a given Dockerfile and an application (a simple ‘Hello world’ web app would be fine)
- Start a few instances of the Docker Image in different containers
- Validate that the container instances are running
- Monitor the resource usage of each container (CPU, I/O, etc)
- Consolidate the log output of all the container instances into one centralized log file.
