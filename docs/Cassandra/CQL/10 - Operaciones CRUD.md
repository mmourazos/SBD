# Operaciones CRUD en CQL

Antes de empezar a ver las operaciones CRUD en CQL hemos de crear un *keyspace* y una tabla de ejemplo.

## Creación de un *keyspace* y una tabla de ejemplo

Para crear el *keyspace* ejecutaremos el siguiente comando:

```cql
CREATE KEYSPACE sbd
  WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 2 };
```

a continuación creamos la tabla `miembros`:

```cql
CREATE TABLE IF NOT EXISTS sbd.miembros (
    id int PRIMARY KEY,
    nombre text,
    apellidos text,
    email text,
    rol text static,
    fecha_alta timestamp,
    fecha_de_nacimiento date
)
WITH comment = 'Tabla con datos de prueba.';
```

Si la *partition key* es compuesta la definiremos de la siguiente forma:

```cql
CREATE TABLE IF NOT EXISTS sbd.miembros (
    id int,
    nombre text,
    apellidos text,
    email text,
    rol text static,
    fecha_alta timestamp,
    fecha_de_nacimiento date,
    PRIMARY KEY (id, fecha_alta)
) WITH comment = 'Tabla con datos de prueba.',
  AND CLUSTERING ORDER BY (fecha_alta DESC);
```

Como se puede comprobar este código es cada vez más incómodo de escribir en la consola de CQLSH. Por ello, a partir de ahora utilizaremos un fichero de texto para almacenar las sentencias CQL que queremos ejecutar.

Un *script* de CQL es un fichero de texto con extensión `.cql` que contiene sentencias CQL. Para ejecutar un *script* de CQL desde dentro de CQLSH utilizaremos la sentencia `SOURCE`:

```cql
SOURCE 'path/to/script.cql';
```

Si lo que necesitamos es ejecutar un *script* de CQL desde la línea de comandos utilizaremos el siguiente comando:

```bash
cqlsh -f path/to/script.cql
```

Finamente veamos cómo crear un *keyspace* y una tabla de ejemplo utilizando un *script* de CQL.

```cql
-- Creamos un keyspace
CREATE KEYSPACE sbd
  WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 2 };

CREATE TABLE IF NOT EXISTS sbd.miembros (
    id uuid,
    nombre text,
    apellidos text,
    email text,
    rol text static,
    fecha_alta timestamp,
    fecha_de_nacimiento date,
    PRIMARY KEY (id, fecha_alta));

-- Creamos una segunda tabla de asignaturas

CREATE TABLE IF NOT EXISTS sbd.asignaturas (
    id uuid PRIMARY KEY,
    nombre text,
    curso int,
    profesor map <text, text>,
    alumnos frozen<list <map<text, text>>>,
    fecha_inicio timestamp,
    fecha_fin timestamp
);

CREATE TABLE IF NOT EXISTS sbd.ciclos (
    id uuid  PRIMARY KEY,
    nombre text,
    horas int,
    modulos frozen<list<text>>
);

-- Comprobamos que se han creado el keyspace y las tablas

DESCRIBE KEYSPACES;

USE sbd;

DESCRIBE TABLES;
```

Guardamos el código anterior en un fichero llamado `script01.cql` y lo ejecutamos:

```bash
docker exec -it cass1 cqlsh -f /scripts/script01.cql
```

**Notas:**

* Hay que prestar especial atención a las **comas y los puntos y comas**. Si nos olvidamos de poner una coma o un punto y coma en el lugar adecuado obtendremos un error de sintaxis.
* Los códigos de error indican la línea y la columna donde se ha producido el error **con respecto al inicio de la sentencia CQL**. No del script.

## Operaciones de escritura

Para escribir datos en una tabla se usará la sentencia `INSERT`:

```cql
INSERT INTO sbd.miembros (id, nombre, apellidos, email, rol, fecha_alta, fecha_de_nacimiento)
VALUES (UUID(), 'Juan', 'Pérez', 'juan@gmail.com', 'alumno', NOW(), '1990-01-01');
```

Esta sentencia es idéntica a la sentencia `INSERT` de SQL.

## Operaciones de lectura

La sentencia `SELECT` de CQL es muy similar a la sentencia `SELECT` de SQL. La diferencia más importante es que en CQL no se pueden realizar *joins*.

```cql
SELECT * FROM sbd.miembros WHERE fecha_alta = '2020-01-01';
```

## Operaciones de actualización

## Operaciones de borrado
