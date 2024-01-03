# Operaciones CRUD en MongoDB

Las operaciones CRUD son las operaciones básicas que se pueden realizar sobre una base de datos. CRUD es el acrónimo de *Create, Read, Update, Delete* (Crear, Leer, Actualizar, Borrar).

En este veremos como se realizan estas operaciones en MongoDB desde la consola. Empezaremos por la creación de documentos. A continuación veremos lecturas / consultas para ver cómo se definen y usan los selectores, ya que se usarán los selectores en el resto de operaciones. Y finalmente iremos viendo el resto de operaciones: modificar (*update*) y borrar (*delete*).

## Creación de documentos *Create* / Insertar

Para crear documentos en una colección usaremos los comandos `insertOne` o `insertMany`.

`db.<nombre de la colección>.insertOne(<json del documento>)`

`db.<nombre de la colección>.insertMany(<array con los documentos json>)`

### Búsqueda de documentos *Read* / Consultar

Este función sirve para realizar consultas sobre las colecciones de la base de datos. Para *filtrar* o *seleccionar* los datos que queremos obtener habrá que pasar como argumento cierta información. En MongoDB esta información se pasa en forma de documento JSON.

Vayamos viendo estos selectores poco a poco, ya que también se usan en las operaciones de modificación y borrado.

#### Consultas con tipos de datos simples

Para consultar los documentos de una colección que cumplan una determinada condición se usa el método `find()`. En caso de que sólo nos interese el primer documento que cumpla la condición podemos usar `findOne()`.

```text
db.<nombre de la colección>.find(<filtro>)
```

El filtro (o selector) será un documento JSON que indica la condición o condiciones que deben cumplir los documentos que se devuelvan.

`find()` / `find({})` sin filtro o con un filtro *vacío* devolverá todos los documentos de la colección.

Un selector simple sería aquél que indica que se devuelvan los documentos que tengan un determinado valor en un campo.

```text
db.<nombre de la colección>.find({<campo>: <valor>})
```

El valor de retorno de la función `find()` es un **cursor**.

##### ¿Qué es un cursor?

Normalmente decimos que una *consulta* devuelve unos documentos, pero lo que en realidad devuelve el método `find` es un **cursor a los documentos**. Un cursor es un objeto que permite recorrer los documentos resultados o lo que es lo mismo, *iterar sobre el cursor* para obtener los documentos resultado de la consulta.

Si hacemos una consulta en la *shell* de mongo y no asignamos el resultado a una variable, la consola de mongo itera por su cuenta sobre el cursor y muestra los resultados.

Existen varias formas para iterar sobre un cursor en la shell de mongo:

###### Método `next()`

```javascript
var cursor = db.airbnb_bar.find()

while (cursor.hasNext()) {
    printjson(cursor.next());
}
```

###### Método `forEach()`

```javascript
db.arirbnb_bar.find().forEach(function(doc) {
    printjson(doc);
});
```

o lo que es lo mismo:

```javascript
db.airbnb_bar.find().forEach(printjson)
```

###### Método `toArray()`

Podemos convertir un cursor a un array con el método `toArray()`. Hay que tener en cuenta que este método puede consumir mucha memoria si el cursor contiene muchos documentos ya que carga en la RAM **todos los documentos del cursor**.

```javascript
var cursor = db.airbnb_bar.find()
let array = cursor.toArray()

printjson(array[6])
```

##### ¿Por qué vemos los resultados de la consulta?

Cuando se ejecuta una consulta en la consola de MongoDB se muestra el resultado porque la consola de MongoDB itera sobre el cursor. Si queremos ver el cursor en lugar de los resultados hemos de asignar el resultado de la consulta a una variable.

```javascript
var cursor = db.<nombre de la colección>.find({<campo>: <valor>});
cursor;
```

##### Contar resultados

Para contar los resultados de una consulta se usa el método `count()`.

```text
db.<nombre de la colección>.find(<filtro>).count()
```

Si deseamos conocer el número de elementos de una colección podemos usar `count()` directamente sobre la colección.

```text
db.<nombre de la colección>.count()
```

##### Limitar el número de resultados

De para limitar el número de valores que obtendremos como resultado de una consulta tenemos la función `limit()` que se usa igual que count, añadiéndola después de la consulta. Recibirá como argumento un número entero en el que le indicamos cuantas respuestas nos interesan.

```text
db.<nombre de la colección>.find(<filtro>).limit(<número de resultados>)
```

`limit()` se usa frecuentemente en combinación con `skip()` y `sort()`:

* `skip(<número>)`: Sirve para *saltarse* cierto número de documentos en un resultado (cursor).
* `sort(<documento>)`: Sirve para ordenar los resultados en función a un o más campos.

Ejemplo de sort:

En el documento que se le pasa al sort se indican los campos sobre los que se quiere realizar la ordenación (numérica o lexicográfica). El valor del campo será `1` o `-1`, para indicar si queremos que la ordenación sea creciente o decreciente.

```javascript
db.alumnos.find({aprobado: true}).sort({nota: -1, nombre: 1, apellidos: 1}).limit(3)
```

Con este comando obtendremos los tres alumnos con mejor nota (en caso de empate se ordenarán alfabéticamente por nombre y apellidos).

#### Consultas sobre arrays

##### Seleccionar por igualdad en array

```json
db.alumnos.find( { modulos: ['BDA', 'SBD'] } )
```

En esta consulta hay que tener en cuenta que **importa el orden** de los elementos del array. **Estamos comparando mediante una igualdad**.

##### Seleccionar por contenido del array

Si lo que queremos es buscar los elementos que contienen un elemento (y posiblemente otros) lo haremos de la siguiente manera:

```json
db.alumnos.find({
    modulos: 'SBD'
})
```

Nótese que no se compara con ningún array, si no con un elemento del array.

Si queremos comprobar si contiene viarios elementos a la vez (y posiblemente otros) usaremos el operador `$all`.
El operador `$all` permite consultar los documentos que contengan todos los valores de un array que especificamos.

De esta forma con el siguiente filtro se devolverán los documentos que contengan los valores `matemáticas` y `física` en su array `especialidades`.

```javascript
db.profesores.find({especialidades: $all: ['matemáticas', 'física']})
```

O los alumnos que cursan los módulos `BDA` y `SBD` (y posiblemente otros ya que no es excluyente):

```json
db.alumnos.find({
    modulos: { 
        $all: ['BDA', 'SBD'] 
    } 
})
```

Cuando utilizamos el operador `$all` no importa el orden.

##### Filtros compuestos

Con estos filtros lo que hacemos es poner condiciones a **algún** elemento del array. Así el siguiente código:

```javascript
const cursor = db.collection('inventory').find({
  dim_cm: { $gt: 15, $lt: 20 }
});
```

Seleccionará los documentos cuyo array `dim_cm` contenga **algún elemento** cuyo valor sea estrictamente mayor que 15 y menor que 20.

##### Filtro para TODOS los elementos de un array

Supongamos que tenemos la siguiente base de datos:

```json
[
    {
        'id': 1,
        'notas': [5, 6, 8]
    },
    {
        'id': 2,
        'notas': [4, 5, 7]
    }
]
```

Si queremos seleccionar todos los documentos cuyas notas (**todas**) sean mayores o iguales a 5 hemos de escribir el siguiente código:

```json
db.alumnos.find({
    notas: {$not: {$lt: 5}}
})
```

Puesto que no hay un operador que exija que todos los elementos cumplan una condición, lo que habrá que hacer es exigir que no haya algún elemento que cumpla la condición opuesta.

Por ejemplo, si no queremos que ningún elemento del array de notas contenga la notas 5 y 6:

```json
db.alumnos.find({
    "notas": {
        $not: {
            $all: [5, 6]
        }
    }
})
```

#### Consultas sobre documentos embebidos

Para realizar consultas sobre documentos embebidos se usa la notación de punto.

Si tenemos un documento con la siguiente estructura:

```json
{
    'id': 1,
    'nombre': 'Manuel',
    'apellidos': 'Piñeiro',
    'dirección': {
        'calle': 'Calle de la Rosa',
        'número': 1,
        'piso': 2,
        'puerta': 'A'
    }
}
```

para hacer una consulta sobre el campo `calle` del documento embebido `dirección` escribiríamos:

```json
db.alumnos.find({
    'dirección.calle': 'Calle de la Rosa'
})
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

* `$not`: Es la única que se aplica a una única expresión. En el resto de operadores lógicos se aplica a un array de expresiones.
* `$and`: Une las cláusulas de búsqueda con un **and** lógico y devolverá los resultados que cumplan todas las cláusulas.
* `$or`: Une las cláusulas de búsqueda con un **or** lógico y devolverá los resultados que cumplan alguna de las cláusulas.
* `$nor`: Une las cláusulas de búsqueda con un **nor** lógico y devolverá los resultados que no cumplan ninguna de las cláusulas.

Ejemplo de `$and`:

```json
{ $and: [ { <expression1> }, { <expression2> } , ... , { <expressionN> } ] }
```

#### Operadores de comparación

Con estos operadores se pueden realizar consultas de comparación sobre los campos de los documentos. Toman como argumento un valor y devuelven los documentos que cumplan la condición.

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
