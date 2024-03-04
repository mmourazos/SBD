# Ejercicios de Cassandra CQL

Instrucciones para realizar los ejercicios de Cassandra CQL.

## Preparar el entorno

Instrucciones para crear el cluster: archivo `docker-compose.yaml`.

## Crear un keyspace

Instrucción para crear un keyspace en el cluster.

## Crear una tabla

Definir el esquema (tipos de datos de los campos de la tabla) y crear la tabla.

## Importar datos

Buscar origen de datos para importar. CSV, JSON, XML, etc.

### Instrucción `COPY`

Sentencia copy para crear una tabla e importar datos.

### Ejemplo inserción de CSV

Hemos de crear una tabla con tantos campos como datos vayamos a tomar del CSV. Es posible que
tengamos más campo en la tabla que en el CSV, en dicho caso los campos que no existan en el CSV se
rellenarán con `null`. Es imprescindible que dispongamos de los campos que conforman la clave
primaria. Si la clave primaria está formada por los campos `marca`, `modelo` y `año`, el CSV ha de
tener al menos dichas columnas.

Para crear la tabla usaremos un comando  como el siguiente:

```cql
CREATE TABLE coches (marca tedxt, modelo text, anno int, color texdt, precio decimal, motor text,
PRIMARY KEY (marca, modelo, anno));
```

Una vez creada la tabla podremos importar los datos con `COPY`:

```cql
COPY coches (marca, modelo, anno, color, precio, motor) FROM 'coches.csv' WITH HEADER = TRUE, AND DELIMITER = ',';
```

De esta forma indicamos que deseamos importar las columnas marca, modelo, anno, color, precio y
motor del CSV `coches.csv`. El CSV tiene cabecera y el delimitador es la coma.

Si los nombres de las columnas del CSV coinciden con los de la tabla, no es necesario indicar los
nombres de las columnas. En caso contrario, es necesario indicar los nombres de las columnas de la
tabla a las que corresponden las columnas del CSV.

## Consultas CQL

### Insertar datos

### Modificar datos

### Realizar algunas consultas
