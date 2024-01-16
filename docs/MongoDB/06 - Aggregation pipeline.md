# *Aggregatio pipeline*

Como vimos en el apartado anterior el *aggregation pipeline* es el array de documentos que define las etapas o *stages* de agregación. Cada etapa de agregación es un documento que define una operación de agregación. Hay un total de 42 operaciones de agregación (a fecha del 16 de enero de 2024) que se pueden utilizar en las etapas de agregación. Por este motivo sólo vamos a ver una pequeña selección de las operaciones de agregación que considero más interesantes.

## Operadores de fase

La forma de definir una operación de agregación es mediante un documento que contiene un único campo cuyo nombre es el de la operación de agregación a realizar en la etapa. El valor de dicho campo será otro documento que contiene los parámetros de la operación de agregación.

```json
{ $match: {
   $and: [ {price: { $lte: 100 } }, { minimum_nights: { $lte: 3 } } ]
} }
```

Las operaciones que veremos en estos apuntes serán las siguientes:

* `$match`: Filtra los documentos de entrada.
* `$group`: Agrupa los documentos de entrada.
* `$addFields`: Añade campos a los documentos de entrada.
* `$project`: Proyecta los campos de los documentos de entrada.
* `$function`: Permite definir funciones JavaScript que se ejecutarán en la etapa de agregación.
* `$lookup`: Permite realizar una operación de *join* entre dos colecciones.
* `$unwind`: Descompone un array en varios documentos.
* `$facet`: Permite realizar varias operaciones de agregación en una sola etapa.

### `$match`

La operación `$match` filtra los documentos de entrada y devuelve solo los documentos que coinciden con la condición especificada.

```javascript
db.listings.aggregate([
   { $match: {
         $and: [ {price: { $lte: 100 } }, { minimum_nights: { $lte: 3 } } ]
      } 
   } 
])
```

Como podemos ver el valor que admite es un *query document* como los que usamos en `find()`.

### `$group`

La operación `$group` agrupa los documentos de entrada por un campo especificado y calcula las agregaciones sobre los documentos agrupados.

La sintaxis para indicar el campo por el que se agrupan los documentos es la siguiente:

```javascript
{ $group: { _id: <campo> } }
```

Dentro de una etapa de agregación `$group` podremos utilizar [expresiones de acumulación](https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/#std-label-accumulators-group) para calcular valores sobre los documentos agrupados.

Algunas de estas expresiones son:

* `$sum`: Calcula la suma de los valores de un campo.
* `$avg`: Calcula la media de los valores de un campo.
* `$median`: Calcula la mediana de los valores de un campo.
* `$min`: Calcula el valor mínimo de un campo.
* `$max`: Calcula el valor máximo de un campo.

pero hay muchas más.

En el siguiente ejemplo agrupamos los documentos por el campo `neighbourhood` y calculamos el número de documentos (listings) de cada grupo y el precio medio de los mismos.

```javascript
db.listings.aggregate([
   { $group: { _id: '$neighbourhood', listings: { $count: {} }, average_price: { $avg: '$price' } } }
])
```

### `$addFields`

La operación `$addFields` agrega nuevos campos a los documentos. Similar a `$project`, `$addFields` reforma cada documento de la secuencia; específicamente, agregando nuevos campos a los documentos de salida que contienen tanto los campos existentes de los documentos de entrada como los campos recién agregados. `$set` es un alias para `$addFields`.

En el momento de crear nuevos campos podremos hacer referencia a los campos existentes en el documento de entrada. Para ello utilizaremos la sintaxis `$<nombre_campo>`. También podremos usar [operadores de expresiones](https://www.mongodb.com/docs/manual/reference/operator/aggregation/#std-label-aggregation-expressions), como `$toDate` o `$function`, para crear nuevos campos.

En el siguiente ejemplo añadimos un campo
