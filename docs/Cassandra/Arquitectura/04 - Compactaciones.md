# Compactaciones y lecturas en Cassandra

## Compactaciones

Consiste en combinar varias *SSTable* en una sola para eliminar datos obsoletos y reducir el número de ficheros en disco.

Cassandra tomará todas las versiones de una fila y las combinará en una sola versión con las versiones más recientes de cada columna.

Ese dato lo almacenará en una nueva *SSTable* y borrará las antiguas.

Hay que tener en cuenta que este proceso es muy costoso en términos de CPU y E/S, por lo que se debe de realizar de forma controlada. Dará lugar a picos de uso de CPU y disco. Si el espacio en disco es limitado, se puede llegar a llenar por completo antes de que se haya completado la compactación.

## Borrado de datos en Cassandra

Un borrado se realiza como una escritura. Se realiza un borrado lógico creando *tombstones* (lapidas) que indican que una columna ha sido borrada. Los datos de estas
*tombstones* se irán borrando *de verdad* en las compactaciones.

## Lectura

Una lectura intentará en primer lugar leer de la *memtable*. Si no encuentra el dato, aún tiene la posibilidad de encontrarlo en otra caché llamada *row cache*.

Si el dato no se encontró ni en la *memtable* ni en la *row cache*, se acudirá al *Bloom filter* de la *SSTable* que nos podrá decir si el dato existe en la *SSTable* o no. Si el *Bloom filter* nos dice que el dato existe, se acudirá al índice de la *SSTable* para encontrar la posición del dato en el fichero de datos. Si el *Bloom filter* nos dice que el dato no existe, se devolverá un error.
