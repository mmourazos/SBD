# Tarea UD1: Prediseño de un sistema Big Data

## Apartado 1

Indicar qué habrá que hacer para ir aumentando la capacidad del cluster según se reciben nuevos datos.

### Respuesta 1

Se realizará un escalado horizontal, añadiendo nuevos nodos al cluster.

## Apartado 2

Indicar qué capas de la arquitectura Big Data necesitarán estar presentes como mínimo en el sistema a crear.

### Respuesta 2

* Capa de ingestión.
* Capa de colección.
* Capa de almacenamiento.
* Capa de procesamiento.
* Capa de consulta y analítica.
* Capa de visualización.

Dado que no se indica ninguna restricción respecto a las necesidades de seguridad o monitorización, se considera correcta la respuesta anterior pero no considera errónea la inclusión de las siguientes capas:

* Capa de seguridad.
* Capa de monitorización.

## Apartado 3

Indicar si alguna parte del sistema necesitará cumplir con las características ACID.

### Respuesta 3

En tanto que la interacción con los clientes se realizará mediante transacciones será necesario que en ese contexto se implementen características ACID.

## Apartado 4

Indicar si será necesario un subsistema OLTP.

### Respuesta 4

Sí, será necesario un subsistema OLTP para la interacción con los clientes.

## Apartado 5

Indicar si será necesario un subsistema OLAP.

### Respuesta 5

Sí, será necesario un subsistema OLAP para la realización de análisis de los datos.

## Apartado 6

Indicar si habrá un almacén de datos.

### Respuesta 6

Obviamente, habrá un almacén de datos sobre el que se realizarán las operaciones de análisis.

## Apartado 7

Indicar qué estrategia de procesamiento habrá que emplear para poder crear el cuadro de mandos que quiere la junta directiva.

### Respuesta 7

Se empleará un procesamiento en tiempo real para poder crear el cuadro de mandos que quiere la junta directiva. Esta pide que se puedan realizar analíticas interactivas: filtrados para la generación de gráficas.

## Apartado 8

Indicar si será necesario crear modelos predictivos a partir de los datos.

### Respuesta 8

Sí, será necesario crear modelos predictivos para poder decidir a qué clientes ofrecerles ciertas ofertas en función de lo que se sabe de su comportamiento pasado.
