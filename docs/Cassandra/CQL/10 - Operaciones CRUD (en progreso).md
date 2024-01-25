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

Para escribir datos en una tabla se usará la sentencia `INSERT`. La sintaxis de la sentencia `INSERT` es la siguiente:

```cql
INSERT INTO <keyspace>.<table_name> (<column_name>, <column_name>, ...)
VALUES (<value>, <value>, ...) | JSON <json_value>
IF NOT EXISTS
USING <option> <value>;
```

No es necesario indicar todos los campos de la tabla. Pero sí se han de indicar todos los campos de la *primary key*.

Si el registro ya existe el registro se sobreescribirá.

Las cláusulas `IF NOT EXISTS` y `USING` son opcionales.

### JSON

La cláusula `JSON` sirve para indicar que los valores se van a insertar utilizando JSON. Por ejemplo:

```cql
INSERT INTO sbd.miembros JSON '{"id": 123, "nombre": "Juan", "apellidos": "Pérez", "email": "juan@gmail.com", "rol": "alumno", "fecha_alta": "2020-01-01", "fecha_de_nacimiento": "1990-01-01"}';
```

### `IF NOT EXISTS`

La cláusula `IF NOT EXISTS` sirve para indicar que no se ha de insertar el registro si ya existe un registro con la misma *primary key*.

El uso de `IF NOT EXISTS` tiene un coste de rendimiento.

### `USING`

La cláusula `USING` es opcional. Se utiliza para indicar opciones de escritura. Las opciones de escritura son dos:

* `TTL`: Tiempo de vida del registro. Una vez transcurrido este tiempo el registro se borrará automáticamente (se marcará para borrado).
* `TIMESTAMP`: *Timestamp* del registro. Si no se especifica se utilizará el *timestamp* actual. Esta opción no es compatible con `IF NOT EXISTS`.

```cql
INSERT INTO sbd.miembros (id, nombre, apellidos, email, rol, fecha_alta, fecha_de_nacimiento)
VALUES (UUID(), 'Juan', 'Pérez', 'juan@gmail.com', 'alumno', NOW(), '1990-01-01');
```

Esta sentencia es idéntica a la sentencia `INSERT` de SQL.

### `UUID()` y `NOW()`

La función `UUID()` es muy importante ya que genera un identificador único. Es importante ya que como nos encontramos en un entorno distribuido si no utilizamos un identificador único podríamos tener problemas de colisiones. Por ejemplo podríamos realizar dos operaciones de inserción desde dos nodos diferentes con el mismo identificador (colisión) y esto podría provocar que se perdiesen datos. El uso de `UUID()` previene este problema.

Por su parte la función `NOW()` sirve para generar *timestamps*. El valor que devuelve `NOW()` del tipo timeuuid. Un timeuuid es un identificador **único** que contiene un *timestamp*. El *timestamp* se puede obtener a partir del timeuuid utilizando la función `dateOf()`. Los valores generados por `NOW()`, al giual que los generados por `UUID()`, **son únicos**.

## Operaciones de lectura

La sentencia `SELECT` de CQL es muy similar a la sentencia `SELECT` de SQL. La diferencia más importante es que en CQL no se pueden realizar *joins*.

La sintaxis de la sentencia `SELECT` es la siguiente:

```cql
SELECT <nombre_columna>, <nombre_columna>, ...
FROM <keyspace>.<nombre_tabla>
WHERE <nombre_columna>
  <operador> <valor>
  AND <column_name>
  OPERATOR <value>
  ...
GROUP BY <column_name>
ORDER BY <column_name> ASC | DESC
LIMIT <n>
ALLOW FILTERING;
```

Cuando agrupamos por una columna hay que tener en cuenta que ésta **ha de formar parte de la partition key**

### `WHERE`

La cláusula `WHERE` es muy importante ya que nos permite filtrar los datos que queremos obtener.

#### Columnas válidas para `WHERE`

En la cláusula `WHERE` sólo se pueden utilizar campos que:

* Formen parte de la *partition key*
* Formen parte de de la *clustering key* **SIEMPRE que vayan precedidos por TODOS los campos de la *partition key***. Además hay que tener en cuenta dos salvedades:
  * Las comparaciones respecto a los campos de la *partition key* han de ser siempre de igualdad.
  * Las comparaciones respecto a los campos de la *clustering key* pueden ser de igualdad o de desigualdad.
* Formen parte de un índice creado con la sentencia `CREATE INDEX`.

```cql
CREATE TABLE cycling.cyclist_points (
   id UUID, 
   firstname text, 
   lastname text, 
   race_title text, 
   race_points int, 
   PRIMARY KEY (id, race_points ));

SELECT sum(race_points) 
FROM cycling.cyclist_points 
WHERE id=e3b19ec4-774a-4d1c-9e5a-decec1e30aac 
      AND race_points > 7;
```

### Operadores

Los operadores pueden ser:

* `=`
* `!=`
* `>`
* `<`
* `>=`
* `<=`
* `IN`: Sirve para comparar un valor con una lista de valores separados por comas: `WHERE id IN (1, 2, 3)`. Y se puede usar con la *partition key*.
* `CONTAINS`
* `CONTAINS KEY`

```cql
SELECT * FROM sbd.miembros WHERE id = 123 AND fecha_alta < '2020-01-01';
```

Aunque al hacer la comparación estemos expresando la fecha como una cadena de texto, internamente, Cassandra la convertirá a un tipo `timestamp` y realizará la comparación.

En Cassandra **nunca se debe de hacer `SELECT *`**. Siempre se ha de seleccionar utilizando, como mínimo, algún campo de la *partition key*. En el caso de realizar un `SELECT *` se producirá un *full table scan*. Esto es, se leerán todos los datos de la tabla en todos los nodos del *cluster*.

### `ALLOW FILTERING`

Si no se especifica la *partition key* en la cláusula `WHERE` se producirá un error. Si queremos realizar una consulta que no incluya la *partition key* hemos de indicar que permitimos filtrar los datos utilizando la cláusula `ALLOW FILTERING`. Esta cláusula es muy peligrosa ya que puede provocar que se produzca un *full table scan*.

### *Full table scan*

Un *full table scan* es una operación que lee todos los datos de una tabla. En Cassandra, al ser un sistema distribuido, esto es muy costoso. Por ello, **nunca se debe de hacer un *full table scan***.

## Operaciones de actualización

Para actualizar los valores de los datos usaremos el comando `UPDATE`. La sintaxis de este comando es la siguiente:

```cql
UPDATE <keyspace>.<table_name>
USING TTL <valor> | USING TIMESTAMP <valor> 
SET <column_name> = <value>, <column_name> = <value>, ...
WHERE <column_name> OPERATOR <value>
  AND <column_name> OPERATOR <value>
  ...
IF EXISTS | IF <condición>
  AND <condición>
  ...
```

Como en el caso de la sentencia `INSERT`, las cláusulas `USING`, `IF EXISTS` y `IF` son opcionales. Las cláusulas `IF EXISTS` e `IF` tienen un coste de rendimiento.

```cql
UPDATE sbd.miembros
SET nombre = 'Juanito'
WHERE id = 12345678-1234-1234-1234-123456789012 AND fecha_alta = '2020-01-01';
```

## Operaciones de borrado

Para borrar datos de una tabla usaremos el comando `DELETE`:

```cql
DELETE FROM sbd.miembros
WHERE id = 12345678-1234-1234-1234-123456789012 AND fecha_alta = '2020-01-01';
```

Si en lugar de indicar `id` y `fecha_alta` indicamos únicamente `id` se borrarán todos los registros con ese `id`, es decir, esa partición.

En Cassandra, cuando realizamos una operación de borrado, en realidad lo estamos haciendo es insertar un registro con la marca de borrado. Se recomienda hacer el menor número de operaciones de borrado posible y, cuando hayamos de borrar, hacerlo en bloques de datos grandes.
