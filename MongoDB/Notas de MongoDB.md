# Notas de MongoDB



## Operaciones con datos (CRUD)

Dejaremos las consultas para el final.



### *Update* / Actualizar

`updateOne` o `updateMany`

`db.<nombre de la colección>.updateOne(<json selector>, <json de actualización>)`

#### Atomicidad

En MongoDB una operación de escritura es atómica a nivel de un único documento. Aún cuando la operación modifique múltiples documentos embebidos en dicho documento.

Cuando una única operación de escritura modifique múltiples documentos la modificación de **cada documento** es atómica pero la operación **en su conjunto** no lo es.

#### Operador `$set`

El operador `$set` reemplaza el valor de un campo por el valor especificado.

##### Sintaxis de `$set`

```json
{ $set: { <campo1>: <valor1>, ... } }
```

Si queremos especificar un campo dentro de un documento embebido hemos de usar la notación con punto.

#### Operador `$inc`

El operador `$inc` *incrementa* el valor de un campo un determinado valor.
Este operador admite valores tanto positivos como negativos.

Este operador es **atómico** a nivel de un **único documento**.

##### Sintaxis de `$inc`

```json
{ $inc: { <campo1>: <cantidad1>, <campo2>: <cantidad2>, ... } }
```

#### Operador `$push`

El operador `$push` añade un valor a un array.

##### Sintaxis de `$push`

```json
{ $push: { <campo1>: <valor1>, ... } }
```

Para indicar un campo en un **documento embebido** se puede usar la **notación de punto**.

##### Modificadores

* `$each`: Añadirá múltiples valores al array.
* `$slice`: Limita el número de elementos a añadir. Debe usarse con el modificador `$each`.
* `$sort`: Ordena los elementos del array. Se usará junto al modificador `$each`. Opciones:
  * Si insertamos elementos simples el valor `1` indicará orden ascendente y `-1` descendente.
  * Si insertamos documentos habrá que indicar el campo y luego especificar `1` o `-1` para indicar orden ascendente o descendente.
* `$position`: Especifica la posición del array en la que insertar los nuevos elementos. Requiere el uso de `$each`. Si no se usa `$position` `$push` insertará el elemento al final del array.

**Ejemplo de sort**:

  ```json
  { $push: {
    <campo1>: { $each: [ { <c1>: 1, <c2>: 'a'}, { <c1>: 2, <c2>: 'b'}], 
    sort: { <c1>: -1}}
  }}
  ```

###### Sintaxis de los modificadores

```json
{ $push: { <campo1>: { <modificador1>: <valor1>, ...}, ... } }
```

La forma de procesarse los modificadores será la siguiente:

1. Actualizar el array para añadir los elementos en la posición correcta.
2. Aplicar la ordenación si se especificó.
3. *Recortar* el array si se especificó.
4. Guardar el array.

##### Ejemplos de uso

Creamos la colección `estudiantes`:

```json
db.estudiantes.insertOne( { _id: 1, notas: [ 44, 78, 38, 80] } )
```

###### Añadir un valor al array

El siguiente código añadirá el valor 89 al array `notas`:

```json
db.estudiantes.updateOne( { _id: 1 }, { $push: { notas: 89 } } )
```

###### Añadir un valor a un array en múltiples documentos

Añadiremos el valor 89 al array `notas` de todos los estudiantes.

```json
db.estudiantes.updateMany( {}, { $push: { notas: 89 } } )
```

###### Añadir múltiples valores a un array

```json
db.estudiantes.updateOne( { _id: 1 }, { $push: {notas: {$each: [ 90, 92, 95 ] } } } )
```

###### Utilizar `$push` con múltiples modificadores

Crearemos un nuevo estudiante para el ejemplo:

```json
db.estudiantes.insertOne(
    {
    "_id" : 5,
        "quizzes" : [
            { "wk": 1, "score" : 10 },
            { "wk": 2, "score" : 8 },
            { "wk": 3, "score" : 5 },
            { "wk": 4, "score" : 6 }
        ]
    }
)
```

Haremos lo siguiente:

* Usaremos el operador `$each` para añadir cada `quiz` del array al array `quizzes` del documento.
* Usaremos `$sort` para ordenar dicho array `quizzes` de manera **descendiente** (argumento -1).
* Usamos `$slice` para quedarnos únicamente con los tres primeros elementos de `quizzes`.

```json
db.estudiantes.updateOne(
    { _id: 5},
    {
        $push: {
            quizzes: {
                $each: [ { wk: 5, score: 8 }, { wk: 6, score: 7 }, { wk: 7, score: 6 } ],
                $sort: { score: -1 },
                $slice: 3
            }
        }
    }
)
```

Ejemplo: Si tenemos un documento de la colección "usuarios" con el siguiente formato:

```json
{
    id: 1,
    nombre: "Manuel",
    apellidos: "Piñeiro",
    fecha_nacimiento: "1977-05-07"
}
```

Para actualizar `apellidos` y `fecha_nacimiento` a "Piñeiro Mourazos" y "1977-05-15" respectivamente, usaríamos el siguiente comando:

```text
db.usuarios.updateOne({id: 1 }, {apellidos: "Piñeiro Mourazos", fecha_nacimiento: "1977-05-07})
```

**Nota**: se puede añadir atributos.

### *Destroy* / Eliminar

`deleteOne` o `deleteMany` y usar los filtros / selectores de MongoDB. Estos selectores los veremos en el apartado de *read* / consultas pues son los mismos.

Estos selectores lo veremos en detalle en el apartado *Read* / consultas pues son los mismos.

Estos comandos tienen como **valor de retorno** un documento (JSON) con dos campos:

* ***acknowledged***: un valor booleano que será cierto si la operación se ejecutó con *write concern* o falso si no lo hizo.
* ***deleteCount***: Indica el número total de documentos borrados.

#### ¿De qué va eso de *write concern*?

*Write concern* es una forma de ejercer control sobre los *nodos* de un *cluster* mongo a los que ha de llegar la operación. Permite indicar ciertos valores para solicitar que la modificación llegue a la mayoría de nodos o a un número concreto



## Diseño del modelo de datos

### Concepto de *schemaless*

En las bases de datos SQL las tablas se diseñan especificando una serie de restricciones. Estas restricciones indican qué campos que tendrá cada tabla y los *tipos* de valores que podrá contener cada campo. Esta es una forma de indicar que los datos que contienen estas bases de datos deben ser estructurados.

Este sistema tiene una serie de ventajas: mayor control sobre el contenido y desventajas: menor flexibilidad.

A veces los datos que deseamos guardar no siguen un una estructura (esquema) fijo.

El hecho de que no exista una estructura predefinida facilita una mejor gestión de la memoria necesaria para el almacenamiento de la información (los campos vacíos de las BBDD SQL directamente no existen en los *registros* de las NoSQL).

En una colección se pueden guardar documentos (JSON) con **estructuras diferentes**. En las tablas todos los *documentos* / registros ha de tener **la misma estructura**.

### Concepto de documentos *embebidos*

Un campo de un documento puede consistir en otro documento. Es decir, los campos de un documento pueden incluir a su vez un documento JSON (y así sucesivamente).

Veámoslo en el ejemplo siguiente:

Imaginemos un ciclo de FP, pongamos por ejemplo que se trata de ASIR:

```json
{
    id: 1,
    acrónimo: "ASIR",
    nombre: "Administración de sistemas operativos en red",
    código: "SIFC01",
    grado: "superior"
}
```

Este ciclo tendrá a su vez varios ciclos:

```json
{
    id: 1,
    acrónimo: "ASO",
    nombre: "Administración de sistemas operativos",
    código: "MP0374",
    horas: 140
    periodos_semana: 8
}

{
    id: 2,
    acrónimo: "FH",
    nombre: "Fundamentos de hardware",
    código: "MP0371",
    horas: 107,
    periodos_semana: 4
}
```

Diremos que los documentos estarán embebidos si los añadimos como *array* al primero:

```json
{
    id: 1,
    acrónimo: "ASIR",
    nombre: "Administración de sistemas operativos en red",
    código: "SIFC01",
    grado: "superior",
    módulos: [
        {
            id: 1,
            acrónimo: "ASO",
            nombre: "Administración de sistemas operativos",
            código: "MP0374",
            horas: 140
            periodos_semana: 8
        },
        {
            id: 2,
            acrónimo: "FH",
            nombre: "Fundamentos de hardware",
            código: "MP0371",
            horas: 107,
            periodos_semana: 4
        }

    ]
}
```

#### Ventajas de los doc. embebidos

Las ventajas los documentos embebidos son:

* No se requiere realizar una consulta adicional para obtener los datos embebidos. Obtenemos todos los datos en una única consulta.
* Los datos embebidos se almacenan en la misma ubicación que el documento contenedor. Esto permite que las operaciones de lectura sean más rápidas.

#### Inconvenientes de los doc. embebidos

Los inconvenientes de los documentos embebidos son:

* Las búsquedas con selectores sobre los atributos de los documentos embebidos son considerablemente más lentas.
* Si se desea actualizar un documento embebido se ha de actualizar el documento contenedor.
* Si los datos embebidos se usan en múltiples documentos y se desea actualizarlos se ha de actualizar cada documento contenedor. Con su consiguiente pérdida de rendimiento.

### Concepto de documentos referenciados

En lugar de guardar **todo el documento** dentro de una propiedad del documento contenedor, en este caso se guardarán sólo algunos atributos que permitirán *referenciar* / identificar el documento completo. Normalmente se guarda el valor de una propiedad que permita referenciar unívocamente el documento.

Es similar al concepto de **clave externa** de las BBDD relacionales.

#### Ventajas de los doc. referenciados

Las ventajas de los documentos referenciados son:

* Las búsquedas con selectores sobre los atributos de los documentos referenciados son más rápidas.
* Si se desea actualizar un documento referenciado no es necesario actualizar el documento contenedor.
* Si se desea realizar una consulta sobre un documento referenciado no es necesario realizar una consulta sobre el documento contenedor.

#### Inconvenientes de los doc. referenciados

Los inconvenientes de los documentos referenciados son:

* Si se desea obtener los datos de un documento referenciado se ha de realizar una consulta adicional.

## Índices

El objetivo del uso de índices es el de mejorar el rendimiento **de las consultas** sobre los datos de una colección

Los índices son estructuras de datos que se definen sobre uno o más campos de una colección (almacenando internamente sus valores) y serán manejadas internamente por MongoDB. Los índices están ordenados en función de alguno de los valores de sus campos.

El funcionamiento de un índice es el siguiente. Cuando realicemos una consulta sobre una colección, MongoDB, como paso previo, hará la consulta sobre el índice. Puesto que el índice es una estructura mucho más ligera que la colección real la consulta será más rápida. Esto le permitirá a MongoDB determinar qué documentos de la colección real han de ser devueltos como respuesta a la consulta. De este modo se evitará realizar la consulta sobre el conjunto total de documentos de la colección, que sería mucho más lento.

En resumen: los índices son un intermediario rápido para evitar tener que realizar una consulta sobre el conjunto total de los datos de una colección.

Por defecto MongoDB, si no lo hacemos nosotros, crea un índice sobre el campo `_id` de cada colección.

### Consultar los índices de una colección

Para comprobar qué índices hay definidos en una colección podremos usar el siguiente comando:

```javascript
db.alum.getIndexes()
```

### Tipos de índices

* Índices simples (un solo campo).

* Índices compuestos (varios campos)

* Índices únicos.

* Otros: sparse, geoespaciales, TTL, hash, texto.

### Índices simples

### El objeto `db.collection.createIndex()`

Bien, todo está aquí. Tengo que empezar a hacer apuntes sobre los índices, lo de JavaScript y lo de otra cosa. Cassandra. Empezar a ver cosas de Casandra.

## Información sobre una consulta

`explain('executionStats')`

## Agregaciones





