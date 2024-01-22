# Lenguaje CQL (*Cassandra Query Language*)

Este lenguaje tiene muchas similitudes con SQL, pero también algunas diferencias. En esta sección vamos a ver las principales diferencias entre ambos lenguajes.

Cassandra **no permite realizar operaciones de *join*** entre tablas. Esto es debido a que las tablas en Cassandra están diseñadas para ser consultadas de forma independiente. Por lo tanto, si necesitamos realizar una consulta que implique datos de varias tablas, tendremos que realizar varias consultas y combinar los resultados en nuestra aplicación.

Si queremos hacer una agrupación de datos sólo podremos hacerlo con respecto a las columnas de la clave primaria. Por ejemplo, si tenemos una tabla con las columnas `id`, `name`, `age` y `city` y queremos agrupar por `city` y `age` tendremos que crear una tabla con una clave primaria compuesta por `city` y `age`. No podremos agrupar por `city` y `name` porque `name` no forma parte de la clave primaria.

Los elementos de una base de datos SQL tienen una correspondencia directa con los elementos de una base de datos Cassandra:

| SQL | Cassandra |
| --- | --------- |
| Base de datos | Keyspace |
| Tabla | *Column family* - CF |
| *Primary key* | *Primary key* / *Row key* |
| *Column name* | *Column name* / *key* |
| *Column value* | *Column value* |

![Estructura de un sistema Cassandra](Imágenes/Estructura.svg)

## Tipos de datos en Cassandra

| Categoría | Tipo de dato CQL | Descripción |
| --------- | ---------------- | ----------- |
| String | `ascii` | Cadena de caracteres ASCII |
| " | `text` | Cadena de caracteres UTF-8 |
| " | `varchar` | Cadena de caracteres UTF-8 |
| " | `inet` | Dirección IP |
| Numeric | `int` | Número entero de 32 bits |
| " | `bigint` | Número entero de 64 bits |
| " | `float` | Número de coma flotante de 32 bits |
| " | `double` | Número de coma flotante de 64 bits |
| " | `decimal` | Número decimal de precisión variable |
| " | `varint` | Número entero de precisión variable |
| " | `counter` | Contador de 64 bits ( no se admite como clave) |
| UUID | `uuid` | Identificador único universal |
| " | `timeuuid` | Identificador único universal con información de tiempo |
| Collections | `list` | Lista de elementos ordenada |
| " | `set` | Conjunto de elementos no ordenado |
| " | `map` | Mapa de pares clave-valor |
| Misc | `boolean` | Valor booleano |
| " | `blob` | Secuencia de bytes |
| " | `timestamp` | Marca de tiempo |

## Comentarios en CQL

Cassandra admite tres tipos de comentarios:

* Comentarios de una línea: `--`<
* Comentarios de una línea: `//`
* Comentarios de varias líneas: `/* */`
