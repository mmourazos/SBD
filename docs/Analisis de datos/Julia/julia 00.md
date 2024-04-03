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

### VS Code + Julia REPL

Visual Studio Code incluye un plugin para Julia que permite ejecutar código en Julia REPL. REPL son las siglas de *read-eval-print loop* y hacen referencia a una *shell* interactiva que permite escribir y ejecutar código Julia. A diferencia de los REPL de Python y Nodejs el código que vamos a escribir en el REPL de Julia **no es interpretados** si no que se compila y a continuación se ejecuta y muestra el resultado.

Visual Studio Code dispone de un plugin para Julia que nos permite trabajar con el lenguaje de programación de una forma más cómoda. Para instalar el plugin hemos de ir a la pestaña de extensiones y buscar `Julia`.


## Tipos de datos

Declarar el tipo de las variables y parámetros de las funciones (y del valor de retorno), aunque opcional, tiene una serie de ventajas:

* **Eficiencia**: Al declarar el tipo de una variable, el compilador puede optimizar el código.
* **Claridad**: Ayuda a entender el código.
* **Robustez**: Al declarar el tipo de una variable, el compilador puede detectar errores en tiempo de compilación.
* ***Dispatching***: Permite definir distintas implementaciones de una función para parámetros de distintos tipos.

Aunque siempre es interesante declarar los tipos podemos entender que será mas necesario en proyectos de mayor envergadura.

### Sintaxis

Para declarar el tipo de una variable usamos el operador `::`:

```julia
a::Int64 = 10
```

Cuando lo hacemos con una función indicamos el tipo de los parámetros y el tipo del valor de retorno:

```julia
function suma(a::Int, b::Int)::Int
    return a + b
end
```

### Jerarquía de tipos

En Julia existe una jerarquía de tipos. Podemos ver esta jerarquía como algo análogo a una jerarquía de clases de Java. En la cima de la jerarquía (o como raíz del árbol) está el tipo `Any`, que es el super-tipo de todos los tipos en Julia.

En esta jerarquía hemos de distinguir entre dos tipos de, valga la redundancia, tipos:

* **Abstractos**: Son tipos que no tienen instancias concretas. Por ejemplo, `Number` es un tipo abstracto, ya que no tiene instancias concretas, pero sí tiene subtipos concretos como `Int64` o `Float64`. Son los nodos de la jerarquía que **no son hojas**.
* **Concretos**: Son tipos que tienen instancias concretas. Por ejemplo, `Int64` o `Float64`. **No pueden tener subtipos** y son los nodos de la jerarquía que **son hojas**.

#### Subtipos y supertipos

Además de la función `typeof(<tipo>)` y el operador `isa` que nos permiten ver cuál es el tipo de un *objeto* y comprobar si un *objeto* es de un determinado tipo, respectivamente, también disponemos de dos funciones que nos devuelven una lista con los subtipos y supertipos de un tipo concreto.

```julia
a = 10
supertypes(typeof(a)) # El resultado será: (Int64, Signed, Integer, Real, Number, Any)
# Si comprobamos sus subtipos veremos que no tiene ninguno (ya que es una hoja).
subtipes(typeof(a)) # El resultado será: Type[] (array vacío) ya que no tiene subtipos (es hoja).
```

### Tipos simples

Julia es un lenguaje de tipado dinámico. Esto quiere decir No tipado pero con opción de declarar el tipo de una variable usando el operador `::`.

Los tipos de variables más comunes en análisis de datos son:

* Enteros: `Int64`.
* Número reales: `Float64`.
* Booleanos: `Bool`.
* Cadenas de texto: `String`.

Respecto a los enteros, si necesitamos menos o más precisión también disponemos de `int8` e `int128`.

Para crear una nueva variable podemos hacerlo de la misma forma que en Pyhton, es decir, con el operador `=`:

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

Existe una forma compacta de definir funciones en Julia, que es la siguiente:

```julia
suma(arg1::Int64, arg2::Int64)::Int64 = arg1 + arg2
```

### Argumentos por referencia

Los argumentos de una función en Julia siempre se pasan por referencia, es decir, si modificamos el valor de un argumento dentro de una función, este cambio se verá reflejado fuera de la función.

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

### Tuplas

Las tuplas 

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

#### Tuplas vs Arrays

Otra estructura de Julia muy similar a los arrays son las tuplas. Cuando una función devuelve más de un resultado lo hace en forma de tupla. La diferencia entre una tupla y un array es que las tuplas tienen un tamaño fijo y además son inmutables. Los arrays, por otro lado, pueden cambiar de tamaño y son mutables.

Las tuplas se crean de la misma forma que los array pero usado `()` en lugar de `[]`.

#### Vistas

Arrays y matrices en Julia.

#### Indexado

In primer lugar hemos de indicar que las posiciones de los arrays y tuplas de Julia empiezan en 1.

#### *Comprehensions*
