# Notas de MongoDB



## Operaciones con datos (CRUD)

Dejaremos las consultas para el final.




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

