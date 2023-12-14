# Notas de MongoDB

## Bases de datos tradicionales / SQL / relacionales

Se organizan en entidades llamadas tablas.

Cada tabla está formada por filas (rows) o registros.

Pueden existir relaciones entre tablas (relacionales). Estas relaciones se *articulan* con respecto a uno o más atributos de las tablas relacionadas.

Usan SQL como lenguaje de consulta.

Permiten el uso de transacciones lo que garantiza que se cumplan los principios ACID:

* Atomicidad
* Consistencia
* Aislamiento
* Durabilidad

Para dividir la información entre tablas se emplean procesos de normalización (cuyo objetivo es evitar redundancia de datos y facilitar la realización de consultas).

Siguen un **esquema** (todos los registros / rows de cada tabla tienen el mismo número de campos con el mismo tipo de datos). Cada tabla (y en consecuencia la BD) sigue una estructura predefinida.

## Bases de datos NoSQL

Surgen como respuesta a problemas que las BD tradicionales no podían resolver:

* La información que se quiere guardar no está estructurada.
* Muy poco flexibles (debido a que se ha de cumplir el **esquema**).

Son las ideales para almacenar datos que no tienen una estructura fija.

**No garantizan** los principios **ACID**.
**MongoDB sí soporta transacciones.**

NoSQL = No sólo SQL.

Existen varios tipos:

* Documentales (MongoDB).
* Clave-valor: funcionan como índices (Amazon DynamoDB).
* Columnares: (Cassandra)
* Orientadas a grafos: ¿estadística y Big Data? (Amazon Neptune).

## Características de MongoDB

* Orientada a documentos.
* Sin esquema *schemaless*.
* Usa JSON.

### Formato JSON

Javascript Simple Object Notation

```json
{
    "numero": 10,
    valores: [1, 2, 3],
    masValores: {
        uno: [{uno: 1}, {dos: true}, {tres: 3}],
        dos: false
    }
}
```

### Instalación de MongoDB

Pondré unas notas sobre el proceso de instalación en Linux (Ubuntu).

### Uso desde la consola

En Linux la consola se invoca escribiendo `mongosh` (en Windows y macOS con `mongo`).

Comandos básicos:

* Salir de la consola: `.exit` (también se puede usar `quit`)
* *Limpiar* la consola: `Ctrl + L`.
* Mostrar información de ayuda sobre los comandos: `db.help()`.
* Mostrar las bases de datos del servidor: `show dbs`.
* Seleccionar una base de datos: `use <nombre de la DB>`.
* Colecciones o *tablas* que puedes tener una una DB: `show collections` o `show tables`.
* Consultar el nombre de la base de datos activa: `db.getName()`.
* Consultar los metadatos de la base de datos activa: `db.stats()`.
* Obtener información sobre el sistema dónde se está ejecutando Mongodb: `db.hostInfo()`.
* *Mostrar el contenido de una colección*: `db.<colección>.find().pretty()`.

### Creación y gestión de bases de datos

```mermaid
flowchart TB
mdbs[MongoDB Server] 
mdbcmm[mongodb-community 4.2] --> dbusers[users]
mdbs --> db[Base de datos]


```

Para crear una base de datos simplemente hay que indicar que se quiere *usar* una base de datos con ese nombre.

Si queremos crear una base de datos con el nombre `clientes` escribiremos el comando: `use clientes` (en realidad no la mostrará hasta que se inserte algún elemento).

Para insertar un elemento (**documento**) podemos usar el comando:

```text
db.clientes.insertOne({'id': '1', 'nombre': 'Manuel', 'Apellidos': 'Piñeiro Mourazos'})
```

También crearíamos la base de datos `cliente` si utilizamos únicamente la instrucción previa.

**Para eliminar una base de datos** primero la tenemos que hacer activa con `use <nombre DB>` y después invocaremos el comando `db.dropDatabase()`.

## Colecciones y documentos

```mermaid
flowchart TB
mdbs[MongoDB Server] --> DB[Base de datos]
DB --> C[Colección]
C --> D[Documento]
mdbapp[mongodb-community 4.2] --> users
users --> alumnos
alumnos --> infoal[json atributos alumno]
```

### Colección

El equivalente en MongoDB a las tablas de las bases de datos tradicional.

### Documento

El equivalente a las *filas* o *registros* de una base de datos tradicional.

### Propiedades

Lo que un *registro* de las bases de datos tradicionales se denominaría *columnas* o campos.

## Tipos de datos

Los tipos de datos descritos en MongoDB se dividen en dos tipos básicos: **simples** y **complejos**.

### Tipos de datos simples

* números
* cadenas de texto
* fecha y hora: se muestra con formato ISO 8601.
* booleanos

#### Ampliación sobre fechas

Para insertar la fecha y hora de hoy en un documento podremos usar el comando `Date()`.

```json
{
    actualizado: Date()
}
```

Para indicar una fecha concreta hemos de usar el comando `new Date(<fecha>)`.

```json
{
    fecha_nacimiento: new Date('1900-01-01')
}
```

Establecerá `fecha_nacimiento` al objeto Date de valor equivalente a `1900-01-01T00:00:00:000z`.

### Tipos de datos complejos

* *arrays*
* objeto
* *binary data*
* *objectId*
* Expresiones regulares

## Operaciones con datos (CRUD)

Dejaremos las consultas para el final.

### *Create* / Insertar

`insertOne` o `insertMany` y usar los filtros de MongoDB.

`db.<nombre de la colección>.insertOne(<json del documento>)`

`db.<nombre de la colección>.insertMany(<json con un array con los documentos>)`

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

`deleteOne` o `deleteMany` y usar los filtros de MongoDB

### *Read* / Consultar

#### Consultas con tipos de datos simples

Para consultar los documentos de una colección que cumplan una determinada condición se usa el método `find()`.

```text
db.<nombre de la colección>.find(<filtro>)
```

El filtro (o selector) será un documento JSON que indica la condición o condiciones que deben cumplir los documentos que se devuelvan.

`find()` / `find({})` sin filtro devuelve todos los documentos de la colección.

Un selector simple sería aquél que indica que se devuelvan los documentos que tengan un determinado valor en un campo.

```text
db.<nombre de la colección>.find({<campo>: <valor>})
```

##### Contar resultados

Para contar los resultados de una consulta se usa el método `count()`.

```text
db.<nombre de la colección>.find(<filtro>).count()
```

Si deseamos conocer el número de elementos de una colleción podemos usar `count()` directamente sobre la colección.

```text
db.<nombre de la colección>.count()
```

#### Consultas sobre arrays

##### Operador `$all`

El operador `$all` permite consultar los documentos que contengan todos los valores de un array.

De esta forma con el siguiente filtro se devolverán los documentos que contengan los valores `matemáticas` y `física` en el array `especialidad`.

```text
db.profesores.find({especialidad: $all: ['matemáticas', 'física']})
```

#### Consultas sobre documentos embebidos

#### Consultas sobre documentos referenciados


##### Limitar el número de resultados

Para limitar el número de resultados de una consulta se usa el método `limit()`.

```text
db.<nombre de la colección>.find(<filtro>).limit(<número de resultados>)
```



### Filtros / selectores de MongoDB

Para filtrar en una de las operaciones previas se utilizará un *documento* JSON.

#### Filtro con una condición

Para hacer un filtro con una única condición simplemente se incluye un JSON con el **atributos** y el **valor** del mismo que queremos seleccionar. Si queremos seleccionar los documentos de la colección **usuarios** que están activos podríamos de filtro:

```json
{
    'activo': true
}
```

#### Filtro con múltiples condiciones

Igual que el anterior pero incluyendo en el JSON todos los pares **atributo valor** que nos interese.

```json
{
    'rol': 'admin',
    'activo': true
}
```

#### Filtro con múltiples condiciones posibles (`$or`)

Incluiremos un *atributo* `$or` cuyo valor será un **array** con las condiciones que serían válidas.

``` json
{
    $or: [ { 'rol': 'admin' }, { 'activo': true } ]
}
```

#### Filtro por exclusión (`$not`)

Normalmente lo usaremos junto con el atributo `$eq` para significar *not equal*, es decir, distinto.

```json
{
    'nombre': { $not: { $eq: "Manuel" } }
}
```

#### Operadores lógicos de consulta

* `$and`:  Une las cláusulas de búsqueda con un **and** lógico y devolverá los resultado que cumplan ambas cláusulas.
* `$or`: ...
* `$not`: ...
* `$nor`: ...

#### Operadores de comparación

* `$eq`: Igual a.
* `$ne`: Distinto de.
* `$gt`: Mayor que.
* `$gte`: Mayor o igual que.
* `$lt`: Menor que.
* `$lte`: Menor o igual que.
* `$in`: Igual a cualquiera de los valores de un array.
* `$nin`: Distinto a todos los valores de un array.

De este modo podríamos hacer una consulta para obtener los usuarios con una edad entre 18 y 65 años:

```json
{
    'edad': { $gte: 18, $lte: 65 }
}
```

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
