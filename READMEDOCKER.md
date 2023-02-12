# Docker levantar el contenedor

- Parado en el folder que contiene el archivo docker-compose-yml
    - Levantar el contenedor y ver los logs en vivo
        docker-compose up
    - Levantar el contenedor y dejarlo en segundo plano sin ver los logs
        docker-compose up -d
    - Levantar el contenedor y forzar la reconstruccion del contenedor
        docker-compose up --build o docker compose up -d --build
    - Pausar contenedor
        docker-compose stop
    - Pausar e eliminar contenedor
        docker-compose down
    - Pausar, eliminar contenedor y eliminar volumenes creados
        docker-compose down -v

# Docker revisar los contenedores que levantamos con el docker-compose.yml
    docker-compose ps

# Empezar a desarrollar

- Luego de haber ejecutado docker-compose up -d

- Parado en el folder que contiene el archivo docker-compose-yml
    docker-compose run --rm --service-ports dimiproapp npm run dev

# Docker comandos Imagenes

- listar imagenes
    docker images

- eliminar imagenes
    docker rmi idImage

# Docker comandos Contenedores

- listar contenedores en ejecucion
    docker container ls

- listar contenedores en pausa
    docker container ls -a

- parar contenedor
    docker stop idContainer

- eliminar contenedor
    docker rm idContainer

# Docker comandos Volumenes

- listar volumenes creados
    docker volume ls

- eliminar volumenes
    docker volume rm idVolume

- vaciar todos los volumes que no se usan
    docker volume prune

# Variables de entorno para docker

Declarar en el .env

FRONT_PORT=8080

# correr migraciones

docker exec -it nameContainerRun 
    npx migrate create nameMigration
    npx migrate up
    npx migrate down nameMigration

# commands

node --loader ts-node/esm --experimental-specifier-resolution=node ./src/console/commands/permissionCommand.ts


# init project

npm install typescript -D
run tsc -- --init
npm install express -E
npm install mongoose -E
npm install body-parser -E
npm install cors -E
npm install ts-node-dev -D
npm install ts-standard -D
npm i --save-dev @types/cors
npm install jsonwebtoken
npm install bcryptjs
npm i --save-dev @types/jsonwebtoken
npm install -g migrate-mongo


good_querys_examples
https://www.mongodb.com/docs/manual/tutorial/query-documents/
https://stackoverflow.com/questions/11196101/mongodb-queries-both-with-and-and-or
good_typescript_examples
https://learn.microsoft.com/en-us/training/modules/typescript-generics/4-exercise-implement-generics-interfaces-classes
migrations
https://www.npmjs.com/package/ts-migrate-mongoose