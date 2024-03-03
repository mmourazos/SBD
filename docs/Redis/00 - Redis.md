# Redis

Las características fundamentales de la base de datos Redis son las siguientes:

* Es una base de datos en memoria &rarr; Esto implica que será muy rápida.
* Almacena los datos en la forma clave &rarr; valor.
* Se utiliza tradicionalmente como una capa de caché.

Al tratarse de un sistema en memoria es lógico que se usase como caché de una base de datos en disco y no como una base de datos primaria. Actualmente Redis se puede usar como una base de datos única y no sólo como una caché. Para lograr esto se utilizarán una serie de módulos constituyendo lo que se conoce como Redis stack. Redis sin módulos se denomina Redis core. Los módulos confieren a Redis la capacidad de persistir sus datos, soporte para gestionar documentos JSON, etc.

## Tipos de datos en Redis

* Strings:
* Sets: no admiten cadenas repetidas.
* Lists: admiten cadenas repetidas. Listas enlazadas. Los valores no tienen que encontrarse en posiciones contiguas de memoria. Acceso secuencial. Accesos más rápidos al principio y al final de la lista y más lentos en el medio.
* Hashes: Pueden contener múltiples campos y valores en su interior.
  
## Entorno de pruebas (Redis Cloud)

1. Ir a [Redis.com](www.redis.com).
2. Darse de alta.
3. Entrar y solicitar una subscripción (la gratuita es más que necesaria para cubrir las necesidades de nuestro curso).

Usaremos Redis insight para conectarnos a la base de datos.

## Comandos básicos

Una vez conectados con Redis insight a nuestra base de datos de pruebas podremos usar la consola de para ejecutar comandos sobre la base de datos.

La página de documentación de los comandos de Redis es [redis.io/commands](http://redis.io/commands).

Los comandos de redis se agrupan en función del tipo de datos con el que trabajan. Así, si vamos a la documentación y
filtramos por *string* veremos que los comandos que nos muestra son: `APPEND`, `DECR`, `DECRBY`, `GET`, `GETDEL`, etc.

### Salvar datos

Si miramos la documentación de un comando, como por ejemplo `SET` veremos que lo primero que nos muestra esa la sintaxis
de la siguiente forma:

```text
SET key value [NX | XX] [GET] [EX seconds | PX milliseconds |
EXAT unix-time-seconds | PXAT unix-time-milliseconds | KEEPTTL]
```

Esto nos indica lo siguiente:

* El nombre del comando es `SET`.
* Es nombre irá seguido de la clave (*key*) y el valor a guardar (*value*).
* A continuación seguirá **una** de las siguientes posibles instrucciones:
  * Cuando guardar:
    * `NX`: Guardar el valor sólo si la clave no existe ya.
    * `XX`: Guardar el valor sólo si la clave ya existe.
  * Cuanto ha de durar el valor guardado:
    * `EX` segundos: Establece un tiempo de expiración en segundos.
    * `PX` milisegundos: Establece un tiempo de expiración en milisegundos.
    * `EXAT` unix-time-seconds: Establece un tiempo de expiración en segundos.
    * `PXAT` unix-time-milliseconds: Establece un tiempo de expiración en milisegundos.
    * `KEEPTTL`: Mantener el tiempo de expiración de la clave.
  * `GET`: Devuelve el valor anterior de la clave.

Para salvar datos en Redis utilizamos el comando `SET`:

```bash
SET <key> <value> <opciones>
```

#### Ejemplo

Si queremos guardar el valor `rojo` en la clave `color` con con un tiempo de expiración de 10 segundos usaremos la
siguietne expresión:

```bash
SET color rojo EX 10
```

Otro comando que podríamos haber usado para realizar la misma oeración es `SETEX`. La diferencia entre ambos es que `SETEX` es un comando atómico, es decir, que se ejecuta de una sola vez. El comando `SET` con `EX` es una operación atómica pero no es un comando atómico. Esto significa que si se produce un fallo en la ejecución de `SET` con `EX` no se garantiza que la clave no se haya creado.

```bash
SETEX color 10 rojo
```

#### Sobre los tiempos de expiración

Redis fue diseñada originalmente como una base de datos en memoria que funcionase como un servicio de caché. La idea es que guardase ciertos datos durante un tiempo y luego se deshiciese de ellos. Si, por ejemplo, vamos a usar Redis como
una cache para reducir el acceso a una base de datos tradicional (mucho más lenta que Redis), nos va a interesar ir
borrando los datos a los que no se ha accedido durante un cierto tiempo para evitar que la caché crezca sin control. Como veremos más adelante, el comando `GETEX` ofrece la opción de establecer el tiempo de expiración de la clave consultada.

### Salvar múltiples valores

Para salvar múltiples valores en Redis utilizamos el comando `MSET`:

```bash
MSET <key1> <value1> <key2> <value2> ...
```

#### Modificadores para el comando `SET` y `MSET`

* `EX <seconds>`: Establece un tiempo de expiración en segundos.
* `PX <milliseconds>`: Establece un tiempo de expiración en milisegundos.
* `XX`: Establece que el comando sólo se ejecutará si la clave existe.
* `GET`: Devuelve el valor anterior de la clave.

### Recuperar datos

Para recuperar datos en Redis utilizamos el comando `GET`:

```bash
GET <key>
```

Veamos un ejemplo:

```bash
GET nombre0
```

### Recuperar múltiples valores

Para recuperar múltiples valores en Redis utilizamos el comando `MGET`:

```bash
MGET <key1> <key2> ...
```

### Borrar datos

Para borrar datos en Redis utilizamos el comando `DEL`:

```bash
DEL <key>
```

Veamos un ejemplo:

```bash
DEL nombre0
```

### Guardar múltiples valores

Para guardar múltiples valores en Redis utilizamos el comando `MSET`:

```bash
MSET <key1> <value1> <key2> <value2> ...
```

## Comandos para añadir y consultar datos

Los comandos son específicos para cada tipo de dato. Por ejemplo, los comandos `SET` y `GET` sólo sirven para recuperar y guardar datos de tipo string mientras que `JSON.SET` y `JSON.GET` sólo sirven para recuperar y guardar datos de tipo JSON.

A lo largo de estos apuntes iremos recorriendo los distintos tipos de datos que soporta Redis y sus comandos asociados.

### Comandos para trabajar con strings

La lista de comandos para trabajar con cadenas se puede dividir en dos grupos: los que sirven para guardar datos
*sertters* y los que sirven para recuperar datos *getters*.

#### Setters de cadenas

Los *setters* para strings se pueden organizar a su vez en un par de categorías:

* Los *normales*: `GETSET`, `DEL` y `STRLEN`.
* Los que vienen haciendo lo mismo que los anteriores: `SET`, `SETNX` y `SETEX+`.
* Al igual que: `MSET` y `MSETNX`.
* Los que son algo raros: `APPEND` y `SETRANGE`

* `SET`: Establece el valor de una clave. `GET`: Devuelve el valor de una clave.
* `APPEND`: Si la llave existe, añade un una cadena al final del valor asociado a la clave. Si no existe, crea la clave y le asigna el valor (en este caso funciona como `set`).
* `MGET`: Devuelve el valor de una o más claves.
* `MSET`: Establece o modifica el valor de una o más claves.

La lista de comandos para trabajar con strings es la siguiente:

Los *setters* para cadenas son:

#### Borra registros

`DEL`

### Rangos de cadenas

Tenomos dos comandos que nos permiten trabajar con porciones de cadenas: `GETRANGE` y `SETRANGE`.

`GETRANGE` nos permite recuperar un rango de caracteres de una cadena.

```bash
SET model toyota
"OK"
GETRANGE nombre 0 3 # Devuelve los caracteres entre la posición 0 y la 5.
"toyo"
```

`SETRANGE` nos permite modificar un rango de caracteres de una cadena.

```bash
SETRAGE mopel 1 terminator
(integer) 11
GET modelo
"tterminator"
```

### ¿Cómo usar Redis?

Supongamos que tenemos una base de datos tradicional. En ella tendremos múltiples registros con varios campos. No es algo fuera de lo común que algunos campos tengan un número limitado de valores posibles. Los modelos de un coche, los colores, etc. son ejemplos de campos con valores limitados. Podremos guardar este tipo de valores en Redis codificándolos mediante una clave más corta. Por ejemplo, en lugar de guardar el modelo completo del coche guardaremos un número que represente el modelo. En lugar de guardar el color completo guardaremos un número que represente el color.

Una vez tenemos los campos codificados podremos guardar el registro como una concatenación del las claves de los valores de sus registros suando, ahora sí, la clave única del registro como clave en Redis.

Para recuperar los campos de un un registro en Redis usaremos `GETRANGE` para recuperar la clave del valor de dicho campo.

Para modificar el valor de uno o más campos haremos usar `SETRANGE`.

### Comandos para trabajar con números

Tendremos los mismos comandos básicos (`GET`, `SET`, `MGET`, `MSET`, `DEL`).

También disponemos de los comandos de incremento y decremento `INCR`, `DECR`, `INCRBY`, `DECRBY` y `INCRBYFLOAT`.

¿Cuál sería la utilidad des estos últimos comandos?

#### Comando `INCR`

Este comando busca un valor (númerico) en la base de datos e incrementa su valor en una unidad. Este
comando está realizando dos operaciones de manera simultánea: la recuperación del valor y la modificación del mismo.

De hecho, en principio, podríamos implementar el comando `INCR` con los comandos `GET` y `SET`.
Primero obtenemos el valor con `GET` con convertimos a un número (lo recibimos como una cadena), le sumamos uno *a mano* Ay lo volvemos a guardar con `SET`.

Es obvio que esta no es ideal ya que, en primer lugar realizamos dos accesos a la base de datos, por lo que podría llevar el doble de tiempo que un único acceso con `INCR`. El segundo problema es que, al no ser una operación atómica, podríamos tener problemas si dos procesos intentan incrementar el valor al mismo tiempo.

Redis es una base de datos síncrona y mono-hilo. Eso significa que, aunque lleguen múltiples
peticiones en un mismo instante Redis los procesará uno a uno de manera secuencial en el orden que
hayan sido recibidos.

## Conexión mediante un cliente

Nos conectaremos a Redis usando TypeScript o Python. Para ello necesitaremos instalar un cliente
para Redis. En el caso de TypeScript usaremos `ioredis` y en el caso de Python usaremos `redis-py`.

Las funciones de la librería que usemos para conectarnos a Redis incluyen funciones que se
corresponde directamente con los comandos del cliente de Redis.

## Metodología de diseño de Redis

Primero hemos de determinar que consultas vamos a realizar en nuestra aplicación.

Una vez hemos determinados las consultas hemos de organizas los datos de manera que las consultas sean eficientes.

Preguntas que tendremos que responder:

* ¿Qué datos vamos a guardar?
* ¿Vamos a tener que preocuparnos por el tamaño de los datos?: Recordemos que Redis guarda todo en
memoria, por lo que tendremos un límite en el tamaño de los datos que podemos guardar.
* ¿Tienen que *caducar* los datos?
* ¿Cuál será nuestra política de generación de claves?
* ¿Habrá que tener en cuenta algún aspecto de la lógica interna de la aplicación?

### Nombrado de claves

La política de nombrado de claves establece los siguientes puntos:

* Las claves han de ser únicas.
* Las claves han de ser descriptivas. Si las ven otras personas han de ser capaces de entender a qué
se refieren.
* Es una buena práctica usar funciones para generar los nombres de las claves y así evitar posible
erratas.
* Es una práctica común separar las palabras que forman el nombre de la clave con `:` y `#` para
separar las palabras del identificador.

Esta última práctica se usarás para, por ejemplo, crear claves como `users#14` o `email#101` donde
el primer elemento de la clave es el tipo de dato y el segundo elemento es el identificador del
dato. No tiene que limitarse a una única palabra (`users:reviews#96`) y el identificador no tiene
porque ser un número (`posts#x14jff`).
