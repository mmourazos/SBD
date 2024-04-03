# Introducción a Julia

Introducción sobre Julia.

## Entorno de trabajo

Instalación de Julia y entorno de trabajo.

Posibilidades: Pluto.jl / IDE y Julia REPL.

### Pluto.jl

[Plutojl](https://plutojl.org/#install) es un paquete de Julia que nos permite trabajar con *notebooks* al estilo de Jupyter. La principal diferencia con Jupyter es que en Plutojl las celdas se ejecutan de forma secuencial y no de forma independiente.

Para utilizar Plutojl primer hemos de instalar el paquete:

```julia
import Pkg

Pkg.add("Pluto")
```

Una vez instalado el paquete podemos abrir un *notebook* con el siguiente comando:

```julia
import Pluto
Pluto.run()
```

Esto abrirá una página web en la que podremos crear un nuevo *notebook* o abrir uno ya existente.

#### Markdown en Pluto.jl

Para crear una celda de texto en formato Markdown en Pluto.jl hemos de hacerlo de escribir `md` seguido de una cadena de texto entre comillas. Por ejemplo:

```julia
md"# Título 1

La razón de la sinrazón que a mi razón se hace, de tal manera mi razón enflaquece, que con razón me quejo de la vuestra fermosura.

## Título 2

La palabra *razón* es muy **importante** en el texto anterior porque es la única palabra que se repite."
```

### VS Code + Julia REPL

Visual Studio Code incluye un plugin para Julia que permite ejecutar código en Julia REPL. REPL son las siglas de *read-eval-print loop* y hacen referencia a una *shell* interactiva que permite escribir y ejecutar código Julia. A diferencia de los REPL de Python y Nodejs el código que vamos a escribir en el REPL de Julia **no es interpretados** si no que se compila y a continuación se ejecuta y muestra el resultado.

Visual Studio Code dispone de un plugin para Julia que nos permite trabajar con el lenguaje de programación de una forma más cómoda. Para instalar el plugin hemos de ir a la pestaña de extensiones y buscar `Julia`.

## Tipos de datos

Julia es un lenguaje con *tipado dinámico*. Esto quiere decir que no es necesario declarar el tipo de una variable al crearla y que éste se determinará en tiempo de ejecución. Aunque no es necesario declarar el tipo de una variable, sí es posible hacerlo y es recomendable. Declarar el tipo de las variables y parámetros de las funciones (y del valor de retorno), aunque opcional, tiene una serie de ventajas:

* **Eficiencia**: Al declarar el tipo de una variable, el compilador puede optimizar el código.
* **Claridad**: Ayuda a entender el código.
* **Robustez**: Al declarar el tipo de una variable, el compilador puede detectar errores en tiempo de compilación.
* ***Dispatching***: Permite definir distintas implementaciones de una función para parámetros de distintos tipos.

Aunque siempre es interesante declarar los tipos podemos entender que será mas necesario en proyectos de mayor envergadura.

### Tipos simples

Los tipos de variables más comunes en análisis de datos son:

* Enteros: `Int64` (y las variantes con distintas precisions con y sin signo).
* Número reales: `Float64` (y variantes con distintas precisiones).
* Booleanos: `Bool`.
* Cadenas de texto: `String`.

Con respecto a los números, según necesitemos mayor o menor precisión también disponemos de `Int8` e `Int128` (así como sus versiones sin signo `UInt8`, 16, 32, etc.) y `Float32` y `Float128`.

Para crear una nueva variable podemos hacerlo de la misma forma que en Python, es decir, con el operador `=`:

```julia
nombre = `Manuel`

edad = 25
```

Si queremos especificar el tipo de una variable podemos hacerlo con el operador `::`:

```julia
edad::Int8 = 25
```

Podremos comprobar el tipo de una variable con la función `typeof`:

```julia
typeof(edad)
Int8
```

### Tipos de definidos por el usuario

*(En principio esto no lo usaremos en este curso aunque es importante saber que existe).*

En Julia el usuario puede definir tipos compuestos de datos. Estes tipos se definen usando la palabra reservada `struct`:

```julia
struct Lenguaje
    nombre::String
    creador::String
    año::Int64
end

julia::Lenguaje = Lenguaje("Julia", "Jeff Bezanson", 2012) # Dice el Copiloto.
Lenguaje("Julia", "Jeff Bezanson", 2012)
```

Podemos consultar qué campos tiene un tipo struct con la función `fieldnames`:

```julia
fieldnames(Lenguaje)
(:nombre, :creador, :año)
```

Para hacer referencia a un campo de un tipo `struct` usamos el operador `.`:

```julia
julia.creador
"Jeff Bezanson"
```

Los datos `struct` son **inmutables**, es decir, no se pueden modificar una vez creados. Si queremos crear un tipo de datos que sea mutable podemos hacerlo con la palabra reservada `mutable struct` al definir el `sturct`.

Es recomendable usar datos inmutables siempre que sea posible, ya que son más eficientes y menos propensos a errores.

### Jerarquía de tipos

En Julia existe una jerarquía de tipos. Podemos ver esta jerarquía como algo análogo a una jerarquía de clases de Java. En la cima de la jerarquía (o como raíz del árbol) está el tipo `Any`, que es el super-tipo de todos los tipos en Julia.

En esta jerarquía hemos de distinguir entre dos tipos de, valga la redundancia, tipos:

* **Abstractos**: Son tipos que no tienen instancias concretas. Por ejemplo, `Number` es un tipo abstracto, ya que no tiene instancias concretas, pero sí tiene subtipos concretos como `Int64` o `Float64`. Son los nodos de la jerarquía que **no son hojas**.
* **Concretos**: Son tipos que tienen instancias concretas. Por ejemplo, `Int64` o `Float64`. **No pueden tener subtipos** y son los nodos de la jerarquía que **son hojas**.

#### Subtipos y supertipos

Además de la función `typeof(<tipo>)` y el operador `isa` que nos permiten ver cuál es el tipo de un *objeto* y comprobar si un *objeto* es de un determinado tipo, respectivamente, también disponemos de funciones que nos devuelven:

* El *supertipo* de un tipo `supertype`.
* Una lista con los *supertipos* de un tipo `supertypes`.
* Una lista con los *subtipos* de un tipo `subtypes`.

```julia
julia> a = 10
10

supertypes(typeof(a)) # El resultado será: (Int64, Signed, Integer, Real, Number, Any)
(Int64, Signed, Integer, Real, Number, Any)

# Si comprobamos sus subtipos veremos que no tiene ninguno (ya que es una hoja).
subtipes(typeof(a)) # El resultado será: Type[] (array vacío) ya que no tiene subtipos (es hoja).

# Pero los subtipos de, por ejemplo, Signed serán:
subtypes(Signed) # El resultado será: 
julia> subtypes(Signed)
6-element Vector{Any}:
 BigInt
 Int128
 Int16
 Int32
 Int64
 Int8
```

## Operadores lógicos y comparaciones

Los valores booleanos en Julia son `true` y `false`. Los operadores lógicos son:

* `&&`: and.
* `||`: or.
* `!`: not.

```julia
!true
false

(10 isa Int64) && (10 > 5)
true
```

Las comparaciones de valores en Julia son:

* `==`: igual.
* `!=` o &ne;: distinto.
* `>`: mayor que.
* `<`: menor que.
* `>=` o &geq;: mayor o igual que.
* `<=` o &leq;: menor o igual que.

## Funciones

Para definir una función en Julia usamos la palabra reservada `function`:

```julia
function suma(a::Int64, b::Int64)::Int64
    return a + b
end
```

También existe una forma compacta de definir funciones en Julia que se usará principalmente para funciones de una sola línea:

```julia
suma(arg1::Int64, arg2::Int64)::Int64 = arg1 + arg2
```

### Argumentos por referencia

Los argumentos de una función en Julia **siempre se pasan por referencia**, es decir, si modificamos el valor de un argumento dentro de una función, este cambio se verá reflejado fuera de la función.

```julia
function swap!(x, y)
    x, y = y, x
end

x = 1
y = 2

swap!(x, y)

print("x = $x, y = $y.") # x = 2, y = 1.
```

Cuando una función modifica alguno de sus argumentos se suele añadir un signo de exclamación al final del nombre de la función. Esto es una convención en Julia el `!` no modifica el comportamiento de la función.

### Argumentos posicionales y opcionales

Las funciones de Julia pueden tener argumentos posicionales y opcionales. Los argumentos posicionales son aquellos se se pasan a la función en el orden en el que se han definido. Los argumentos opcionales irán siempre después de los posicionales y se les puede asignar un valor por defecto y un *nombre*.

```julia
function join(a::String, b::String; sep::String=", ", prefix::STring = "", suffix::String = "")::String
    return prefix * a * sep * b * suffix
end
```

Los argumentos posicionales se separan de los opcionales con un `;`. Se suele hacer lo mimos al invocar la función aunque no es necesario.

```julia
word = join("Hola", "Mundo"; suffix=".")
```

Se pueden declarar distintas funciones con el mismo nombre pero con distintos tipos de argumentos:

```julia
function suma(a::Int64, b::Int64)::Int64
    return a + b
end

function suma(a::String, b::String)::String
    return a * b
end
```

### Funciones anónimas (lambda)

Cuando sólo necesitamos usar una función de una manera puntual (por ejemplo indicar una función de comparación para un *sort* o en funciones de filtrado) por lo que no hace falta asignarle un nombre. Para definir una función anónima se utiliza el operador `->`:

```julia
x -> x^2
```

Si necesitamos pasarle más de un argumento usaremos una tupla como argumento:

```julia
(x, y) -> x + y
```

Lo mismo haremos si necesitamos que una función devuelva dos o más valores:

```julia
(x, y) -> (y, x)
```

```julia
function swap (x, y)
   return y, x
end
```

### Funciones con despacho múltiple

En Julia podemos definir distintas implementaciones, o métodos, para cada función. En el momento de ejecutar el código se seleccionará una función de los argumentos que se definan para la función.

```julia
function suma(a::Int, b::Int)::Int = a + b

function suma(a::String, b::String)::String = a * b
```

## Broadcasting

En Julia podemos aplicar una función u operador a un array de una forma muy sencilla. Para ello usamos el operado `.`:

```julia
a = [1, 2, 3]

b = a .+ 1
```

## Macros

Las macros es la forma que tiene Julia de implementar metaprogramación. El concepto de metaprogramación es el de un lenguaje disponga de mecanismos para escribir código que, a su vez, sea capaz de transformar otro código. De esta forma, las macros son un tipo de funciones que tienen como entrada una representación del ***código fuente*** del lenguaje y que proporcionen como resultado código fuente nuevo antes de que se  iniciar el proceso de compilación.

Las macros de Julia se nombran con `@` seguido del nombre de la macro. Por ejemplo, la macro `@time` mide el tiempo de ejecución de una expresión.

```julia
@time suma(1, 2)
0.000004 seconds
3
```

Otras dos macros que utilizaremos en estes apuntes son `@show`, `@assert`, `@benchmark` y `@view` (esta última relacionada con las vistas de arrays).

## Colecciones en Julia

### Arrays

En Julia los arrays forman parte de la especificación del lenguaje. Se incluye una sintaxis especial para trabajar con arrays y son muy rápidos.

#### Creación de arrays

Una de las formas más sencillas de crear un array es "escribir" la matriz entre corchetes:

```julia
julia> arr = [1 2 3
              4 5 6
              7 8 9]
3×3 Matrix{Int64}:
 1  2  3
 4  5  6
 7  8  9
```

Si queremos comprobar el tamaño y dimensiones de una matriz usaremos la función `size`. `size(arr)` nos mostrará el tamaño de la matriz `(3, 3)` y si indicamos una dimensión `size(arr, 1)` nos mostrará el tamaño del eje *x* del array (las filas), `size(arr, 2)` el número de columnas, etc.

En caso de que queramos especificar el tipo de los elementos de la matriz usaremos la siguiente sintaxis:

```julia
julia> arr = Int8[1 2 3; 4 5 6; 7 8 9]
3×3 Matrix{Int8}:
 1  2  3
 4  5  6
 7  8  9
```

Finalmente, también podemos usar el constructor `Array` para crear arrays:

```julia
julia> arr = Array{Int8, 2}(undef, 3, 3)
3×3 Matrix{Int8}:
 -80  -119   0
 -58   -34   0
   3     1  32
```

#### Tuplas vs Arrays

Otra estructura de Julia muy similar a los arrays son las tuplas. La diferencia entre las tuplas y arrays es que la primera tiene una **dimensión fija** y es **inmutable**. Esto quiere decir que no se le pueden añadir datos ni cambiar sus valores. Por este motivo las tuplas son más rápidas que las arrays.

Un ejemplo de uso de las tupas es cuando necesitamos que una función devuelva más de un resultado. En este caso lo que hacemos es devolver una tupa `return (x, y)` con los valores.

Las tuplas se crean de la misma forma que los array pero usado `()` en lugar de `[]`.

#### Indexado

En primer lugar hemos de indicar que las posiciones de los arrays y tuplas de Julia empiezan en 1.

En general, para hacer referencia a una posición de una matriz *n-dimensial* hemos de indicar la posición de cada eje separado por comas: $X = A[I_1, I_2, ..., I_n]$ donde cada $I_k$ puede ser un entero, un array de enteros (para seleccionar determinadas posiciones) o un `:` si queremos seleccionar todos los elementos de dicha dimensión.

Por ejemplo, si queremos acceder al elemento de la fila 2 y columna 3 de una matriz `arr` haremos `arr[2, 3]`. Si queremos **copiar** la segunda columna de una matriz lo que haremos es: `col2 = arr[:, 2]`. Nótese que hemos dicho **copiar** pues si modificamos el valor de `col2` no se modificará el valor de `arr`.

También hemos de tener en cuenta que al hacer copias habrá que reservar espacio nuevo e inicializarlo con los valores de la matriz con el coste computacional que ello conlleva.

Si no deseamos realizar una copia de la matriz sino trabajar con una vista de la matriz original podemos usar la macro `@view`.

#### Vistas

Para crear una vista hemos de usar la macro `@view` y a continuación indicar la matriz y las posiciones que queremos ver. Por ejemplo, si queremos ver la primera fila de una matriz `arr` haremos `view(arr, :, 1)` o bien `@view arr[1, :]`.h

#### *Comprehensions*

Las *comprehensions* en Julia son, al igual que las *list comprehensions* de Python, una forma de crear arrays de forma compacta a partir de una sentencia.

La sitaxis es la siguiente:

```julia
arr = [f(x) for x in iterable]
```

Donde `f(x)` es la función que queremos aplicar a cada elemento de `iterable`.

Si queremos crear una matriz con los valores de la media de cada columna de otra matriz podríamos hacerlo de la siguiente forma:

```julia
arr_mean = [mean(arr[:, i]) for i in 1:size(arr, 2)]
```
