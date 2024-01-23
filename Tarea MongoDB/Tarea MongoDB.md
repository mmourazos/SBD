# Tarea opcional MongoDB

## Instrucciones generales

Como se indica en el título **esta tarea es opcional**.

El valor de la tarea es de **hasta dos puntos** en la nota del examen de la primera evaluación.

Para realizar esta tarea se puede usar **cualquier servidor de MongoDB** (local, remoto, docker, etc.).

Las respuestas se pueden entregar en cualquier formato (md, pdf, txt, odc.) pero deben ser legibles y estar (mínimamente) bien estructuradas (con referencia a la sección y al apartado).

Se han de **incluir los resultados** y el código de **los comandos utilizados**.

## Recomendaciones

Únicamente por cuestiones de vuestra comodidad.

Se recomienda conectarse desde un terminal de Windows o Linux o utilizar algún GUI **que permita copiar y pegar código**.

Se recomienda también que, si veis la complejidad de las consultas o agregaciones es grande, utilicéis un script en lugar de escribir directamente en la *shell* de mongo.

## 1. Importar datos

Ve a la web de [Inside Airbnb](insideairbnb.com) y descarga los datos de Madrid. Descomprime los ficheros e incorpora los datos a colecciones dentro de la base de datos "airbnb_madrid". Los ficheros que debes importar son:

* Listings: "listings.csv" y su versión detallada "listings.csv.gz".
* Reviews:  "reviews.csv" y su versión detallada "reviews.csv.gz".
* Calendar: "calendar.csv".
* Neighbourhoods: "neighbourhoods.csv".

1. Muestra el número de documentos que hay en cada colección e indica los comandos que has utilizado para obtener esta información.

**Incluye el código de los comandos utilizados.**

## 2. Consultas

Realiza las siguientes consultas sobre la base de datos "airbnb_madrid":

1. Muestra los 5 alojamientos más caros de Madrid ignorando los que no tienen precio.
2. Muestra los 5 alojamientos más baratos de Madrid que acepten estancias de 5 noches o menos.
3. Muestra las 5 reviews más recientes.

Incluye el código de las consultas.

## 3. Actualizaciones

Realiza las siguientes actualizaciones sobre la base de datos "airbnb_madrid":

Haz una consulta que muestre (al menos) uno de los documentos que van a ser modificado **antes y después de cada actualización**.

1. Añade un nuevo campo con el todos los *listings* (de los simples, no de los detallados) en euros (el incluido viene en dólares).
2. Incrementa en diez euros el precio de todos los alojamientos que cuesten menos de 50 euros.
3. Aplica un descuento del 10% a todos los alojamientos que cuesten más de 100 euros.

**Nota:** ten en cuenta que **no todos los documentos incluyen el precio**.

**Incluye el código de las actualizaciones.**

## Índices y métricas

1. Obtén los diez *listings* más recientemente valorados (`last_review`) con 10 o menos noches de estancia (`minimum_nights`) ordenados por fecha de la última valoración de la más reciente a la más antigua.
2. Indica el tiempo que tarda en ejecutarse la consulta y el plan de ejecución.
3. Crea un índice que permita realizar esta consulta de forma eficiente.
4. Vuelve a indicar el nuevo tiempo que tarda en ejecutarse la consulta y el plan de ejecución.

**Incluye el código de los comandos utilizados.**

## Agregaciones

1. Obtén los 5 barrios con más alojamientos.
2. Obtén los 5 barrios cuya puntuación media sea mayor o igual a 4 ordenados de mayor a menor puntuación.
3. Obtén el precio medio de los alojamientos con valoración mayor o igual a 4 por barrio.
4. Obtén el precio medio de los alojamientos con valoración menor o igual a 3 por barrio.
5. Obtén los **nombres** de los 5 *reviewers* que más reviews han hecho.

Incluye el código de las agregaciones.
