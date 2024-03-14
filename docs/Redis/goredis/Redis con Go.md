# Conexión a redis

Cuando usamos un cliente para conectarnos a un servidor Redis lo que obtenemos es una conexión sobre
la que podremos ejecutar los mismos comandos.

## Conexión con Go

En primer lugar hemos de crear un entorno dónde poder escribir y ejecutar el código. Para ello
instalaremos el lenguaje Go siguiendo las instrucciones de la [página oficial](https://go.dev/doc/install). Una vez instalado Go hemos de crear un directorio para nuestro código `goredis` por ejemplo. A continuación hemos de crear un módulo para lo que usaremos el comando el `go mod init goredis` (o el nombre que hayamos elegido). Con esto se creará un archivo `go.mod` que contendrá el nombre del módulo y las dependencias que vayamos añadiendo.

Hemos de instalar el cliente de Redis para Go, para ello usaremos el comando `go get github.com/go-redis/redis/v9`. Con esto se instalará el cliente en el directorio `go.mod` y ses creará el archivo `go.sum` que contendrá la información de las dependencias.

### Contexto

El contexto es un mecanismo que tiene Go para gestionar el *contexto* en el que se ejecuta una
función en el contexto (valga la redundancia) de una petición. Para nuestro ejemplo no hace falta
profundizar más en este concepto.

#### Gestión de los datos privados

Para no compartir los datos privados de la conexión (URL, *password*, etc.) se considera una buena
práctica almacenarlos en `.env` en la forma de pares `clave=valor` y leerlos desde ahí. Para ello
usaremos la librería `godotenv` que hemos de instalar con el comando `go get github.com/joho/godotenv`.

Una vez cargaca la librería hemos de leer el archivo `.env` y cargar las variables de entorno con la
instrucción `godotenv.Load()`. La claves definidas en `.env` estarán disponibles como valores de
entorno de `os` a los que accederemos con `os.Getenv("CLAVE")`.

### Conexión

Para establecer una conexión con el servidor Redis hemos de crear un cliente con las instrucciones
```go
client := redis.NewClient(&redis.Options{
    Addr:     os.Getenv("REDIS_URL"),
    Password: os.Getenv("REDIS_PASSWORD"),
    DB:       0,
    DialTimeout: 10 * time.Second,
})
```

La última línea es opcional y establece un tiempo de espera de 10 segundos para la conexión.

## Conexión con JavaScript (Node.js)

## Conexión con Python
