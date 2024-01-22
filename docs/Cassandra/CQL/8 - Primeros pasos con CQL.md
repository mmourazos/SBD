# Primeros pasos con CQL

En este tema veremos como realizar las operaciones básicas de CQL.

La ide es poner miniejericios para que podáis practicar con CQL. A continuación se incluirá la solución pero recomiendo intentarlo antes de mirar la solución.

## Creación de un keyspace

Se ha de crear un *keyspace* de nombre "SBD" con una estrategia de replicación simple con factor de replicación 1.

Una vez creado el *keyspace* podremos comprobar que se ha creado correctamente con la sentencia `DESCRIBE KEYSPACES`:

```cql
DESCRIBE KEYSPACES;
```

### Solución

```cql
CREATE KEYSPACE SBD
  WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };
```

## Creación de una tabla

Hemos de crear dos tablas.

La primera la llamaremos "miembros" con columnas: dni, nombre, apellidos, fecha de nacimiento y tipo ("alumno" o "profesor"), esta última a de ser además *static*. y "asignaturas" con columnas: id, nombre, curso, horas. Las columnas serán de tipo static y la PK ha de ser la combinación de DNI y fecha de nacimiento.
