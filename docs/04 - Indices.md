# Índices

El objetivo del uso de índices es el de mejorar el rendimiento **de las consultas** sobre los datos de una colección

Los índices son estructuras de datos que se definen sobre uno o más campos de una colección (almacenando internamente sus valores) y serán manejadas internamente por MongoDB. Los índices están ordenados en función de alguno de los valores de sus campos.

El funcionamiento de un índice es el siguiente. Cuando realicemos una consulta sobre una colección, MongoDB, como paso previo, hará la consulta sobre el índice. Puesto que el índice es una estructura mucho más ligera que la colección real la consulta será más rápida. Esto le permitirá a MongoDB determinar qué documentos de la colección real han de ser devueltos como respuesta a la consulta. De este modo se evitará realizar la consulta sobre el conjunto total de documentos de la colección, que sería mucho más lento.

En resumen: los índices son un intermediario rápido para evitar tener que realizar una consulta sobre el conjunto total de los datos de una colección.

Por defecto MongoDB, si no lo hacemos nosotros, crea un índice sobre el campo `_id` de cada colección.

## Consultar los índices de una colección

Para comprobar qué índices hay definidos en una colección podremos usar el siguiente comando:

```javascript
db.alum.getIndexes()
```

## Tipos de índices

* Índices simples (un solo campo).

* Índices compuestos (varios campos)

* Índices únicos.

* Otros: sparse, geoespaciales, TTL, hash, texto.

## Índices simples

## El objeto `db.collection.createIndex()`

Bien, todo está aquí. Tengo que empezar a hacer apuntes sobre los índices, lo de JavaScript y lo de otra cosa. Cassandra. Empezar a ver cosas de Casandra.

## Información sobre una consulta

`explain('executionStats')`

## Agregaciones





