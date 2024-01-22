# Operaciones CRUD en CQL

Antes de empezar a ver las operaciones CRUD en CQL hemos de crear un *keyspace* y una tabla de ejemplo.

Para crear el *keyspace* ejecutaremos el siguiente comando:

```cql
CREATE KEYSPACE sbd
  WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 2 };
```

a continuación creamos la tabla `miembros`:

```cql
CREATE TABLE miembros (
    id int PRIMARY KEY,
    nombre text,
    apellidos text,
    edad int,
    rol text,
    fecha_alta timestamp,
    fecha_de_nacimiento date
);
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

## Create