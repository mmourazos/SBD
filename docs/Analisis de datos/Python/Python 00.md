# Análisis de datos

## Numpy y Pandas

[Anaconda](www.anaconda.com) es una distribución de Python que incluye las librerías más populares para el análisis de datos. Entre estas librerías se encuentran NumPy y Pandas.

## Entorno de trabajo

### Creación de entorno virtual

Cuando programamos en python podemos encontrarnos en la situación de que diferentes proyectos requieran versiones diferentes de las mismas librerías. Para evitar conflictos entre versiones, es recomendable crear un entorno virtual para cada proyecto.

Un entorno virtual es un directorio que contiene una instalación de Python de una versión en particular, además de unos cuantos paquetes adicionales.

```bash
python -m venv mi-entorno
```

Esto creará un directorio llamado `mi-entorno` si no existiese y, dentro de este, una estructura de directorios con una copia de la versión de Python que esté utilizando y una copia del gestor de paquetes `pip`. Es común que estos directorios se encuentren en el directorio `.venv`.

Una vez creado el entorno virtual, es necesario activarlo:

En Windows se utilizaría la siguiente instrucción:

```powershell
mi-entorno\Scripts\activate
```

En Linux o MacOS:

```bash
source mi-entorno/bin/activate
```

Para instalar las librerías necesarias, se puede utilizar el gestor de paquetes `pip`:

```bash
python -m pip install numpy pandas
```

Cuando hayamos terminado de trabajar con el entorno virtual, podemos desactivarlo con el comando:

```bash
mi-entorno\Scripts\deactivate
```

O bien:

```bash
source mi-entorno/bin/deactivate
```

Dependiendo de si estamos utilizando Windows o Linux/MacOS.

#### Entorno virtual con Conda

Otra forma de gestionar los entornos virtuales es mediante la aplicación [Conda](https://conda.io/projects/conda/en/latest/index.html). Esta aplicación nos permite crear entornos virtuales *genéricos* que podremos utilizar para varios proyectos (ya que no se instalarán en el directorio del proyecto, sino en un directorio genérico). Para ello, se instalaría la aplicación y se utilizaría el comando:

**Imporante**: Si usamos Conda en un terminal con **PowerShell** es necesario ejecutar la
instrucción `conda init powershell` después de la instalación.

```powershell
conda create --name mi-entorno python=3.12 numpy pandas
```

Con este comando se crearía un entorno virtual llamado `mi-entorno` con la versión 3.12 de Python y con las librerías `numpy` y `pandas` instaladas.

Para utilizar este entorno virtual, se utilizaría el comando:

```powershell
conda activate mi-entorno
```

Podremos comprobar si estamos en el entorno virtual con el comando:

```powershell
conda info --envs

active environment : mi_entorno
active env location : C:\Users\<mi_usuario>\miniconda3\envs\mi_entorno
...
```

Conda también permite instalar librerías que no estén en el repositorio de Python, por ejemplo, para instalar la librería `matplotlib`:

```powershell
conda install matplotlib
```

Cuando hayamos terminado de trabajar con el entorno virtual, podemos desactivarlo con el comando:

```powershell
conda deactivate
```

## Estructura de datos en Python

Las estructuras de datos incluidas den Python son:

* Tuplas
* Listas
* Diccionarios
* Conjuntos

### Tuplas

Una tupla es una colección de objetos de tamaño fijo e inmutable. Se definen utilizando paréntesis y los elementos se separan por comas.

```python
mi_tupla = (1, 2, 3)

# O de manera equivalente:

mi_tupla = 1, 2, 3
```

Las tuplas son inmutables, es decir, una vez creada no se puede substituir el elemento almacenado en
una posición por otro. No obstante, si el elemento es mutable, se pueden modificar.

Para acceder al elemento de una posición de la tupla indicaremos el índice entre corchetes:

```python
tercer_elemento = mi_tupla[2]
```

Otra forma de asignar valores de una tupla a variables es mediante la desestructuración:

```python
mi_tupla = 1, 2, 3

a, b, c = mi_tupla # a = 1, b = 2, c = 3

# Si no nos interesan todos los elementos, podemos utilizar el comodín _

_, a, b = mi_tupla # a = 2, b = 3
```

Para ver cuantos elementos tiene una tupla, podemos utilizar la función `len`: `len(mi_tupla)`. Para
contar las veces que se repite un elemento: `mi_tupla.count(1)`. Para saber la posición de un elemento: `mi_tupla.index(1)`.

### Listas

Podríamos decir que las lista es la versión mutable de la tupla. En una lista se pueden añadir o
eliminar elementos y modificar los ya existentes.

La forma de crear una lista es similar a la de una tupla, pero utilizando corchetes:

```python
mi_lista = [1, 2, 3]
```

Otra forma de crear una lista es utilizando la función `list`:

```python
mi_lista = list(range(1, 100))
```

De esta forma se crearía una lista con los números del 1 al 100 (se expande el rango).

#### Añadir y elimina elementos de una lista

Para añadir y eliminas elementos de una lista tendremos dos pares de funciones `append` y `pop`; e
`insert` y `remove`. Las dos primeras son mas eficientes ya que añaden o eliminan elementos al final de la lista cuyo acceso es *instantáneo*. Las segundas son menos eficientes ya que al trabajar con una posición concreta habrá que recorrer todos los elementos previos para acceder a la misma.

`append` añade un elemento al final de la lista:

```python
mi_lista = [1, 2, 3]
mi_lista.append(4) # mi_lista = [1, 2, 3, 4]
```

`pop` elimina el último elemento de la lista:

```python
mi_lista = [1, 2, 3]
a = mi_lista.pop() # mi_lista = [1, 2], a = 3
```

`insert` añade un elemento en la posición que le indiquemos:

```python
mi_lista = [1, 2, 3]
mi_lista.insert(1, 4) # mi_lista = [1, 4, 2, 3]

# La posición de inserción ha de ser un número entre 0 y len(mi_lista)
mi_lista.insert(4, 5) # mi_lista = [1, 4, 2, 3, 5]
```

Finalmente `remove` elimina el primer elemento cuyo valor sea el que le indiquemos:

```python
mi_lista = [3, 2, 1, 2, 3]

mi_lista.remove(2) # mi_lista = [3, 1, 2, 3]
```

También es posible eliminar elementos en función de su posición utilizando el operador `del`:

```python
mi_lista = [3, 2, 1, 2, 3]

del mi_lista[2] # mi_lista = [3, 2, 2, 3]

# También es posible eliminar un rango de elementos:
del mi_lista[1:3] # mi_lista = [3, 3]
```

### Operaciones con listas

#### Pertenencia

Para comprobar si un elemento pertenece a una lista, podemos utilizar el operador `in`:

```python
mi_lista = [1, 2, 3]

1 in mi_lista # True
```

Para comprobar la **no** pertenencia, utilizaremos el operador `not in`:

```python
mi_lista = [1, 2, 3]

0 not in mi_lista # True
```

#### Concatenación

Para concatenar dos listas, podemos utilizar el operador `+`:

```python
l1 [1, 2, 3]
l2 = [4, 5, 6]

l = l1 + l2 # l = [1, 2, 3, 4, 5, 6]
```

O la función `extend`:

```python
lista_final = []
for lista in lista_de_listas:
    lista_final.extend(lista)
```

Hay que tener en cuenta que `extend` **es más eficiente que `+` ya que `+` crea una nueva lista**, mientras que `extend` modifica la lista original.

#### Ordenación

Podemos ordenar una lista utilizando la función `sort`:

```python
mi_lista [3, 2, 1]

mi_lista.sort() # mi_lista = [1, 2, 3]
```

Si bien `sort` siempre ordenará la lista mediante el comparador `<`, podemos modificar este comportamiento utilizando el argumento `key` al que asignaremos una función (que se aplicará a cada elemento de la lista) que devuelva el valor que queremos comparar:

```python
mi_lista = ["júpiter", "venus", "tierra", "marte", "mercurio"] 

# Ordenamos por longitud de la palabra usando la función len:

mi_lista.sort(key=len) # mi_lista = ['venus', 'marte', 'tierra', 'júpiter', 'mercurio']
```

También tenemos la función `sorted` que, en lugar de modificar la lista original, devuelve una nueva
lista ordenada.

#### *Slice* de listas

Un *slice* es una porción de una lista. Se define mediante el operador `:`:

```python
mi_lista = [1, 2, 3, 4, 5]

fragmento = mi_lista[1:3] # fragmento = [2, 3]
```

Usando `:X` o `X:` seleccionamos los elementos desde el principio hasta la posición `X` o desde `X` hasta el final.

Los *slices* también se pueden utilizar para modificar una lista:

```python
mi_lista = [1, 2, 3, 4, 5]

mi_lista[1:3] = [8, 9] # mi_lista = [1, 8, 9, 4, 5]
```

### Diccionarios

En otros lenguajes de programación se denominan *mapas* o *hash maps*. Un diccionario es una colección de pares clave-valor. Las claves han de ser únicas y los valores pueden ser cualquier tipo de dato.
Los diccionarios se definen utilizando llaves:

```python
mi_dict = { 1: "uno", "dos", 2}
```

Las claves de un diccionario pueden ser cualquier objeto de Python **que sea inmutable**. Por ejemplo, una tupla puede ser una clave (si todos sus elementos son inmutables) pero una lista no.

#### Crear un diccionario a partir de dos listas

Si queremos crear un diccionario a partir de una lista de claves y otra de valores, podemos utilizar la función `zip`:

```python
mapping = {}
for key, value in zip(key_list, value_list):
    mapping[key] = value
```

La función `zip` toma dos listas y devuelve una lista de tuplas donde el primer elemento de cada tupla es el primer elemento de la primera lista, el segundo elemento de cada tupla es el segundo elemento de la primera lista, etc.

#### Comprobar pertenencia de una clave

Para comprobar si un diccionario contiene una clave, podemos utilizar el operador `in`:

```python
mi_dict = {1: "uno", 2: "dos"}

1 in mi_dict # True
```

#### Eliminar o extraer un elemento de un diccionario

Para eliminar un elemento de un diccionario utilizaremos la función `del`:

```python
mi_dict = {1: "uno", 2: "dos"}

mi_dict.del(1) # mi_dict = {2: "dos"}
```

Si queremos conservar el valor de la clave eliminada, podemos utilizar la función `pop`:

```python
mi_dict = {1: "uno", 2: "dos"}

valor = mi_dict.pop(1) # mi_dict = {2: "dos"}, valor = "uno"
```

Si queremos consultar el valor de una clave sin eliminarla, podemos utilizar la función `get`:

```python
mi_dict = {1: "uno", 2: "dos"}

mi_dict.get(1) # "uno"
```

Si la clave no existe `del` devolverá `None`. Si queremos que devuelva un valor por defecto, podemos
utilizar el método `setdefault`:

```python
mi_dict = {1: "uno", 2: "dos"}

mi_dict.get(3) # None
mi_dict.setdefault(3, "no encontrado") # "no encontrado"
```

#### `keys`, `values` e `items`

Los métodos `keys`, `values` e `items` devuelven una lista con las claves, los valores o los pares
clave-valor del diccionario respectivamente:

```python
mi_dict = {1: "uno", 2: "dos"}

mi_dict.keys() # [1, 2]

mi_dict.values() # ["uno", "dos"]

mi_dict.items() # [(1, "uno"), (2, "dos")]
```

#### Combinar diccionarios

Podemos combinar dos diccionarios utilizando el método `update`:

```python
mi_dict1 = {1: "uno", 2: "dos"}
mi_dict2 = {3: "tres", 4: "cuatro"}

mi_dict1.update(mi_dict2) # mi_dict1 = {1: "uno", 2: "dos", 3: "tres", 4: "cuatro"}
```

### Conjuntos

Un conjunto es una colección no ordenada de elementos únicos. Se definen utilizando llaves:

```python
mi_conjunto = {1, 2, 3}
```

O a partir de una lista o tupla utilizando la función `set`:

```python
mi_conjunto = set([1, 2, 3])
```

#### Operaciones con conjuntos

Los conjunto de Python soportan las operaciones de unión, intersección, diferencia y diferencia simétrica:

* Unión: `|` o el método `union`.
* Intersección: `&` o el método `intersection`.
* Diferencia: `-` o el método `difference`.
* Diferencia simétrica: `^` o el método `symmetric_difference`.

También podremos comparar conjuntos utilizando los operadores `==`, `!=`, `<`, `>`, `<=` y `>=`.

* Iguales: `==`.
* Desiguales: `!=`.
* Subconjunto: `<` o `<=` (propio o no propio).
* Superconjunto: `>` o `>=` (propio o no propio).


### Funciones de secuencia

#### `ennumerate`

#### `sorted`

#### `reversed`

#### `zip`

### *Comprehensions*

Las *comprehensions* son una forma concisa de crear listas, diccionarios y conjuntos mediante una
expresión. Por ejemplo, la siguiente *comprehension* crea una lista con los cuadrados de los números del 0 al 9:

```python
cuadrado = [x ** 2 for x in range(10)]
```

La sintaxis de una *comprehension* para listas es la siguiente:

```python
[expresion for variable in secuencia if condicion]
```

Para diccionarios:

```python
diccionario = {expresion_clave: expresion_valor for valor in valor if condicion} 
```

Por ejemplo un diccionario con las claves de un lista y sus longitudes:

```python
palabras = ["hola", "adios", "buenos días", "buenas noches"]

diccionario = {palabra: len(palabra) for palabra in palabras}
```

Finalmente para un conjunto:

```python
[expresion for variable in colección if condicion]
```

### Elementos básicos de NumPy

NumPy es una librería de Python que para computación numérica, su nombre vene de *Numerical Python*.

Algunas de las cosas que obtenemos con NumPy son:

* `ndarray`: un array multidimensional que permite realizar operaciones matemáticas de manera eficiente.
* Funciones matemáticas para realizar operaciones rápidas sobre arrays enteros sin tener que escribir bucles.
* Herramientas para leer/escribir datos en disco y trabajar con archivos de memoria mapeada.
* Álgebra lineal, generación de números aleatorios y transformadas de Fourier.
* También se puede integrar con otros lenguajes de programación como C, C++ y Fortran.

Las estructuras de datos nativas de Python no son adecuadas para realizar operaciones matemáticas complejas. NumPy es una librería que permite trabajar con arrays multidimensionales y realizar operaciones matemáticas complejas de manera eficiente.

Los arrays de NumPy son similares a las listas de Python, pero con la diferencia de que todos los elementos de un array deben ser del mismo tipo. Además, los arrays de NumPy tienen *dimensión* es decir, pueden ser unidimensionales (como las listas), bidimensionales, tridimensionales, etc.

Para utilizar los arrays de NumPy haremos lo siguiente:

```python
import numpy as np

ndarray = np.array([1, 2, 3], [4, 5, 6], [7, 8, 9])
```

De esta forma hemos creado un array bidimensional de 3x3. Si queremos acceder a un elemento de un array, podemos hacerlo de la misma forma que con una lista:

```python
nd_array[0, 0] # 1
```

Podremos realizar operaciones matemáticas con arrays de NumPy de manera sencilla:

```python
arr1 = n.array([1, 2, 3], [4, 5, 6])
arr2 = n.array([1, 2], [3, 4], [5, 6])
```

Para comprobar el tamaño de un array utilizaremos el atributo `shape`:

```python
arr1.shape # (2, 3) dos filas y tres columnas.
```

#### Operaciones con arrays


