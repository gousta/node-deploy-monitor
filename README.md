# node-deploy-monitor

## Objectives & Capabilities
- Build a Docker Image from a given Dockerfile and an application (a simple ‘Hello world’ web app would be fine)
- Start a few instances of the Docker Image in different containers
- Validate that the container instances are running
- Monitor the resource usage of each container (CPU, I/O, etc)
- Consolidate the log output of all the container instances into one centralized log file.
- (extra) Kill all running/stopped processes of a Docker Image

### Full demo:

##### Build
```
build --dockerfile ./sample/Dockerfile --app ./sample --name dm
```

##### Run
```
run --name dm --instances 5
```

##### Validate
```
validate --name dm
```

##### Monitor
```
monitor --name dm
```

##### Logs
```
logs --name dm
```

##### (EXTRA) Kill
```
kill --name dm
```
