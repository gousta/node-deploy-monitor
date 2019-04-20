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
build test1 ./sample/Dockerfile ./sample
```

##### Run
```
run test1 --instances 2 # My Mac freezes for minutes if I put more than 2, guess it just takes that long. Also, instances is optional, default is 1.
```

##### Validate
```
validate test1
```

##### Monitor
```
monitor test1
```

##### Logs
```
logs test1
```

##### (EXTRA) Kill
```
kill test1 # This will kill all instances
```
