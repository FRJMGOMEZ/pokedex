<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar repositorio.
2. Ejecutar

````
yarn install
````
3. Tener Nest CLI instalado.

````
npm i -g @nestjs/cli
````
4. Levantar base de datos.


````
docker-compose up -d
````

5. Clonar archivo ````.env.template ```` y renombrar la copia a ```` .env ````

6. LLenar las variables de entorno definidas en el ```` .env ````

7. Ejecutar la aplicación en dev:

`````
yarn start:dev 
`````

8. Reconstruir base de datos con la seed.
`````
http://localhost:3000/api/v2/seed
`````

## Stack usado.
* MongoDb.
* Nest.js.

# Production  build
1. Crear archivo ``` .env.prod ```
2. Llenar las variables de entorno de prod.
3. Crear la nueva imagen 
````
yarn dockerize-and-up
````
o

````
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
````
