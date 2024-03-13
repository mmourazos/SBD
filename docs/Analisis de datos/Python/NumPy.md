
# Elementos básicos de NumPy

NumPy es una librería de Python que para computación numérica, su nombre vene de *Numerical Python*.

Algunas de las cosas que obtenemos con NumPy son:

* `ndarray`: un array multidimensional que permite realizar operaciones matemáticas de manera eficiente.
* Funciones matemáticas para realizar operaciones rápidas sobre arrays enteros sin tener que escribir bucles.
* Herramientas para leer/escribir datos en disco y trabajar con archivos de memoria mapeada.
* Álgebra lineal, generación de números aleatorios y transformadas de Fourier.
* También se puede integrar con otros lenguajes de programación como C, C++ y Fortran.

Las estructuras de datos nativas de Python no son adecuadas para realizar operaciones matemáticas complejas. NumPy es una librería que permite trabajar con arrays multidimensionales y realizar operaciones matemáticas complejas de manera eficiente.

Los arrays de NumPy son similares a las listas de Python, pero con la diferencia de que todos los elementos de un array deben ser del mismo tipo. Además, los arrays de NumPy tienen *dimensión* es decir, pueden ser unidimensionales (como las listas), bidimensionales, tridimensionales, etc.

## Importar NumPy

Para utilizar NumPy en nuestro proyecto necesitamos importar la librería. La forma más común de hacerlo es la siguiente:

```python
import numpy as np
```

De esta forma podremos hacer referencia a los elementos de NumPy utilizando el alias `np`.

Antes de usar NumPy es necesario instalarlo. Si estamos utilizando Conda podremos crear un entorno
virtual con Python 3.12, NumPy y Pandas de la siguiente forma:

```powershell
conda create -n data-analisys python=3.12 numpy pandas
```

Y luego activar el entorno virtual:

```powershell
conda activate data-analisys
```

Ahora es cuando podremos importar NumPy en nuestro proyecto.

## ndarrays en NumPy

Los arrays de NumPy podrán ser n dimensionales, y se podrán crear de diferentes formas. Por ejemplo, para crear un array de una dimensión con 10 elementos, podríamos hacerlo de la siguiente forma:

```python
mi_array = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
```

Para crear un array bidiemensional de 3x3 podríamos hacerlo de la siguiente forma:

```python
mi_array = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
```

De esta forma hemos creado un array bidimensional de 3x3. Si queremos acceder a un elemento de un array, podemos hacerlo de la misma forma que con una lista:

```python
mi_array[0, 0] # 1
```

Para conocer las dimensiones de un array usaremos el método `ndim`:

```python
mi_array.ndim # 2
```

Ya que nuestro array es bidimensional. Para conocer el tamaño de un array usaremos el método `shape`:

```python
mi_array.shape() # (3, 3)
```

### Arrays especiales

NumPy tiene funciones para crear arrays especiales, como por ejemplo el array de ceros, el array de
unos, el array identidad, etc. Estas funciones son muy útiles para inicializar arrays de manera
rápida:

* `np.zeros()`: crea un array de ceros. Si es unidiensional, se le pasa un número, si es bidimensional se le pasa una tupla con dos números (tri-dimensional, una tupla con tres números, etc).
* `np.ones()`: crea un array de unos. Se le pasa un número si es unidimensional, una tupla con dos números si es bidimensional, etc.
* `np.eye()`: crea un array identidad. Como en los casas anteriores, se le pasa un número indicando
  el número de filas.
* `np.arange()`: es una función análoga `range` pero para `ndarray`. Se la pasará un número
  para indicar el número de columnas del array. Por defecto empieza en `0`.

### Tipos de datos de NumPy

Los tipos de datos numéricos que incluye NumPy son los siguientes:

* `int8`, `uint8`: enteros de 8 bits con y sin signo.
* `int16`, `uint16`: enteros de 16 bits con y sin signo.
* `int32`, `uint32`: enteros de 32 bits con y sin signo.
* `int64`, `uint64`: enteros de 64 bits con y sin signo.
* `float16`: punto flotante en media precisión.
* `float32`: punto flotante estándar de simple precisión.
* `float64`: punto flotante de doble precisión.
* `float128`: punto flotante de precisión extendida.
* `complex64/128/256`: números complejos representados por dos números en punto flotante de 32, 64,
  o 128 bits.
* `bool`: booleano con valores `True` y `False`.

En el momento de crear un array podemos indicar el tipo de dato que vamos a utilizar utilizando el
parámetro `dtype`:

```python
mi_array = np.array([1, 2, 3], dtype='uint8')
```

Para comprobar el tipo de dato de un array podremos usar su propiedad `dtype`:

```python
mi_array.dtype
dtype('uint8')
```

### Operaciones aritméticas con arrays

Podremos realizar operaciones matemáticas con arrays de NumPy de manera sencilla:

```python
arr1 = n.array([1, 2, 3], [4, 5, 6], [7, 8, 9])
arr2 = n.array([1, 2], [3, 4], [5, 6])

# Para multiplicarlas usaremos el método dot
arr1.dot(arr2)

array([[ 22,  28],
       [ 49,  64],
       [ 76, 100]])
```

Es importante asegurarse de que las dimensiones de los arrays son compatibles con la operación que
vamos a realizar. Por ejemplo, la operación de `+` sólo podrá realizarse con dos arrays que tengan
la mismas dimensiones.

```python
arr3 = arr1 + arr2

Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: operands could not be broadcast together with shapes (3,3) (3,2)
```

Los operadores `+`, `-` y `*` realizarán dichas operaciones a nivel de elemento cuando se realicen
con arrays con las mismas dimensiones.

```python
arr1 = np.array([[1, 2], [3, 4]])

arr1 + arr1

array([[2, 4],
        6, 8]])
```

Las operaciones escalares con arrays se realizarán también a nivel de bit:

```python
# Elevar al cuadrado:

arr1 ** 2

array([[1,  4],
        9, 16])

# Dividir 1 por la matriz:

1 / arr1

array([[1.        , 0.5       ],
       [0.33333333, 0.25      ]])
```

### *slices* en nparray
