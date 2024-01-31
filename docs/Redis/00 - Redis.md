# Redis

Las características fundamentales de la base de datos Redis son las siguientes:

* Es una base de datos en memoria => Esto implica que será muy rápida.
* Almacena los datos en la forma clave => valor.
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

### Salvar datos

Para salvar datos en Redis utilizamos el comando `SET`:

```bash
SET <key> <value>
```

veamos un ejemplo:

```bash
SET nombre0 Manuel
```

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

veamos un ejemplo:

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

veamos un ejemplo:

```bash
DEL nombre0
```

### Guardar múltiples valores

Para guardar múltiples valores en Redis utilizamos el comando `MSET`:

```bash
MSET <key1> <value1> <key2> <value2> ...
```
