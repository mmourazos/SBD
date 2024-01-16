# Arquitectura de Cassandra

A diferencia de un *cluster* maestro-esclavo, en el que el nodo maestro es el responsable de encargarles a los nodos esclavos la ejecución de las consultas, en Cassandra todos los nodos son iguales y no hay un nodo maestro. En un cluster maestro-esclavo el nodo maestro es un punto único de fallo, mientras que en Cassandra no hay un punto único de fallo.

Un *cluster* de Cassandra se denomina *ring* o anillo. Este anillo está formado por varios nodos interconectados y configurados para propósitos de replicación. Los nodos serán *conscientes* de los otros nodos del anillo y de su estado y se comunicarán entre ellos para replicar los datos cumpliendo las condiciones de consistencia que se hayan establecido.

Cada nodo del anillo tiene la misma importancia que los demás, **no hay un nodo maestro** y se trata de un sistema P2P. Del mismo modo, en cada nodo habrá una instancia de Cassandra. Los nodos deberán de encontrarse, idealmente, en ubicaciones diferentes para evitar que un desastre natural pueda afectar a todos los nodos simultáneamente.

![Anillo de Cassandra](./Imágenes/Anillo.svg)

Todas estas característica hacen que no exista un **SPOF** (*Single Point Of Failure*), es decir, que no haya un punto único de fallo.

Un anillo de Cassandra también se denomina *datacenter*.

## Nodos virtuales

Cada nodo del anillo se puede dividir a su vez en *nodos virtuales* (vnodes). Cada nodo virtual se encarga de una parte del anillo del nodo *real*. De esta forma, si añadimos un nuevo nodo al anillo, este se dividirá en nodos virtuales y cada nodo virtual se encargará de una parte del anillo. Esto permite que el anillo se reequilibre de forma automática. Un nodo *real* puede distribuir sus datos entre varios nodos virtuales. Esto permite mejorar la disponibilidad de los datos al aumentar la replicación.

## Jerarquía de Cassandra

En primer lugar tendremos el cluster, que estará formado por uno o varios *anillos* o datacenters*. Cada *datacenter* estará formado a su vez por uno o más *racks*, que serán la agrupación lógica de varios servidores o nodos. Finalmente, los nodos estarán formado por uno o varios nodos virtuales.