---
id: devops_docker
title: Docker
---

## List docker containers
``` bash
docker ps -a
```

## List docker images
``` bash
docker images -a
```

## List docker volume
```bash
docker volume ls
```

## Stop all docker containers
``` bash
docker stop $(docker ps -a -q)
```

## Remove docker container and its volume
``` bash
docker rm -v container_name
```

## Clean up dangling images, containers, volumes and networks
``` bash
docker system prune
```

## List exited containers
``` bash
docker ps -a -f status=exited
```

## List running containers
``` bash
docker ps -a -f status=running
```

## List paused containers
``` bash
docker ps -a -f status=paused
```
