# Creación de un cluster

Para realizar las pruebas con Cassandra crearemos un cluster de 3 nodos en local. Para ello utilizaremos Docker y Docker Compose. Los nodos del cluster serán los siguientes: cass1, cass2 y cass3. Los nodos cass1 y cass2 serán los nodos semilla del cluster. El nodo cass3 se unirá al cluster posteriormente.

## Obteniendo la imagen de Cassandra

Usaremos la imagen oficial de Cassandra que se encuentra en Docker Hub: [https://hub.docker.com/_/cassandra](https://hub.docker.com/_/cassandra).

Para obtener la imagen ejecutaremos el siguiente comando:

```bash
docker pull cassandra:latest
```

## Otener los archivos de configuración de Cassandra

Para obtener los archivos de configuración de Cassandra ejecutaremos el siguiente comando:

```bash
docker run --rm -d --name temp cassandra:latest
docker cp temp:/etc/cassandra .
docker stop temp
```

Con esto obtendremos los archivos de configuración de Cassandra en el directorio `cassandra` de nuestro directorio actual.

## Creando el `docker-compose.yml`

```yaml
version: "3.8"
networks:
  cassandra:
services:
  cass1:
    image: cassandra:latest
    container_name: cass1
    hostname: cass1
    mem_limit: 2g
    healthcheck:
      test: ["CMD", "cqlsh", "-e", "describe keyspaces"]
      interval: 5s
      timeout: 5s
      retries: 60
    networks:
      - cassandra
    ports:
      - "9042:9042"
    volumes:
      - ./data/cass1:/var/lib/cassandra
      - ./etc/cass1:/etc/cassandra

    environment: &environment
      CASSANDRA_SEEDS: "cass1,cass2"
      CASSANDRA_CLUSTER_NAME: SolarSystem
      CASSANDRA_DC: Mars
      CASSANDRA_RACK: West
      CASSANDRA_ENDPOINT_SNITCH: GossipingPropertyFileSnitch
      CASSANDRA_NUM_TOKENS: 128

  cass2:
    image: cassandra:latest
    container_name: cass2
    hostname: cass2
    mem_limit: 2g
    healthcheck:
      test: ["CMD", "cqlsh", "-e", "describe keyspaces"]
      interval: 5s
      timeout: 5s
      retries: 60
    networks:
      - cassandra
    ports:
      - "9043:9042"
    volumes:
      - ./data/cass2:/var/lib/cassandra
      - ./etc/cass2:/etc/cassandra
    environment:
      <<: *environment
    depends_on:
      cass1:
        condition: service_healthy
  cass3:
    image: cassandra:latest
    container_name: cass3
    hostname: cass3
    mem_limit: 2g
    healthcheck:
      test: ["CMD", "cqlsh", "-e", "describe keyspaces"]
      interval: 5s
      timeout: 5s
      retries: 60
    networks:
      - cassandra
    ports:
      - "9045:9042"
    volumes:
      - ./data/cass3:/var/lib/cassandra
      - ./etc/cass3:/etc/cassandra
    environment:
      <<: *environment
    depends_on:
      cass2:
        condition: service_healthy
```

Este archivo de configuración crea un cluster de 3 nodos de Cassandra en local.

Cada nodo tiene dos volúmenes asociados:

* `/var/lib/cassandra`: Contiene los datos del nodo.
* `/etc/cassandra`: Contiene los archivos de configuración del nodo.

Los nodos `cass1` y `cass2` serán los nodos designados como semilla del cluster.

## Copiar los archivos de configuración de Cassandra

Copiaremos los archivos de configuración de Cassandra en los directorios `etc/cass1`, `etc/cass2` y `etc/cass3`:

```bash
cp -a cassandra/cassandra.yaml cassandra/cass1/
cp -a cassandra/cassandra.yaml cassandra/cass2/
cp -a cassandra/cassandra.yaml cassandra/cass3/
```

La opción `-a` de `cp` indica que se copien los archivos de forma recursiva y que se conserven los permisos, propietarios y fechas de los archivos.

## Iniciar el cluster

Para iniciar el cluster ejecutaremos el siguiente comando:

```bash
docker-compose up -d
```

Para comprobar que los contenedores se han iniciado correctamente ejecutaremos el siguiente comando:

**Revisar esto.**

```bash
docker-compose ps
```

## Abrir una consola de CQLSH

Para abrir una consola de CQLSH ejecutaremos el siguiente comando:

```bash
docker exec -it cass1 cqlsh
```
