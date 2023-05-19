#!/bin/bash

DOCKER_CONTAINER = corporationapp
DOCKER_DB = mongodbcenter

SPORT = --service-ports
DCOMPOSER = docker-compose

OS := $(shell uname)

help: ## Show this help message
	@echo 'usage: make [target]'
	@echo
	@echo 'targets:'
	@egrep '^(.+)\:\ ##\ (.+)' ${MAKEFILE_LIST} | column -t -c 2 -s ':#'

run:
	docker-compose up -d
down:
	docker-compose down

stop:
	docker-compose stop

restart:
	$(MAKE) stop && $(MAKE) run

bash:
	docker-compose exec ${DOCKER_CONTAINER} /bin/sh

inspectdb:
	docker inspect ${DOCKER_DB}

dev:
	docker-compose run --rm --service-ports ${DOCKER_CONTAINER} npm run dev

db:  ## Solo si mongodb se encuentra en el mismo directorio que smartclaims
	cd ../mongodb
	docker-compose up -d

up-full:  ## Solo si mongodb se encuentra en el mismo directorio que smartclaims
	$(MAKE) db && $(MAKE) run

