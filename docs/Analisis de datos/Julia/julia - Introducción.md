# Introducción a Julia

Julia es un lenguaje de programación que es a la vez de alto nivel, orientado al cálculo y de gran velocidad de ejecución. Además, a diferencia de otros lenguajes como R o Python, las librerías de Julia están escritas completamente en Julia por lo que no es necesario conocer otros lenguajes si necesitamos crear librerías nuevas que cumplan criterios de rendimiento. En Python y R hay librerías que, para maximizar su velocidad, están implementadas en otros lenguajes en los que se puede lograr una mayor velocidad de ejecución, como es el caso de C o C++.

Julia y su ecosistema de paquetes tienen cinco características que son relevantes para aquellos que deseen realizar análisis de datos:

* Velocidad de ejecución del código (puesto que es compilado).
* Ha sido diseñando con la capacidad de uso interactivo en mente.
* Presenta facilidade para escribir código reutilizable.
* Sistema de gestión de paquetes integrado.
* Fácil integración con otros lenguajes.

## Julia es un lenguaje compilado

Julia es un lenguaje que de *tipado opcional*, despacho múltiple (multiples métodos para una función) y alto rendimiento. Esto último lo logra utilizando compilación JIT (Just In Time) sobre LLVM. Es, como la mayoría de lenguajes modernos, multi-paradigma y combina características de programación imperativa, funcional y orientada a objetos.

LLVM (anteriormente conocido como Low Level Virtual Machine, o Máquina Virtual de Bajo Nivel) es una infraestructura para desarrollar compiladores, escrita a su vez en el lenguaje de programación C++, que está diseñada para optimizar el tiempo de compilación, el tiempo de enlazado, el tiempo de ejecución y el *tiempo ocioso* en cualquier lenguaje de programación que el usuario quiera definir.

Julia también permite realizar ejecución de código en paralelo (utilizando varios núcleos de la CPU) y en de manera distribuida (utilizando varios ordenadores). Además, por medio de paquetes como `CUDA.jl` puede ejecutar código en GPUs.

## Julia soporta flujos de trabajo interactivos

Aunque Julia es un lenguaje compilado, también permite ejecutar código de manera interactiva. Esto se logra mediante alguno de los siguientes métodos:

* REPL (read-eval-print loop) de Julia, es decir, la shell de Julia.
* Jupiter notebooks.
* Los cuadernos del paquete `Pluto.jl`. Se diferencian de los cuadernos de Jupyter en que, por ejemplo, cuando cambiamos algo en el código `Pluto.jl` actualizará todos los valores que dependan de él en todo el cuaderno.
En todos estos casos el código se compila siempre que el usuario lo ejecute aunque esto sea de manera transparente para él.

## Entorno de trabajo

Julia se puede instalar utilizando el comando winget de Windows 10, el gestor de paquetes de Linux o el gestor de paquetes de macOS. También se puede instalar desde la [página web de Julia](https://julialang.org/downloads/), donde se incluyen instrucciones y ficheros de instalación para distintas plataformas.

Una vez instalado Julia podremos empezar a trabajar con el REPL (read-eval-print loop) de Julia, que es la shell interactiva de Julia. En ella podremos escribir y ejecutar código de Julia de manera interactiva. No hemos de olvidar que aunque se ejecute instrucción a instrucción, el código se compila siempre que se ejecuta.

### Sistema de paquetes de Julia

La utilidad `Pkg` forma parte de Julia y nos permite instalar paquetes. `Pkg` incluye su propipo REPL que podemos abrir escribiendo `]` desde el REPL de Julia.

Para instalar un paquete hemos de escribir `add nombre_paquete` y para cargarlo `using nombre_paquete` o `import nombre_paquete`.

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

## Comentarios en Julia

Para comentar una línea en Julia ha de usarse el símbolo `#` al comienzo de la línea.

Si queremos comentar varias líneas podemos usar la notación `#=` y `=#`.

## Tipos de datos

Dijimos al comienzo que Julia es un lenguaje con tipado opcional. Esto quiere decir que, en principio, Julia se comporta como un lenguaje con tipado dinámico pero que además permite definir los tipos de las variables, parámetros y valores de retorno de las funciones.

### Tipos simples

Para declarar el tipo de una variable hemos de utilizar el operador `::`.

Los tipos de variables más comunes en análisis de datos son:

* Enteros: `Int64`.
* Número reales: `Float64`.
* Booleanos: `Bool`.
* Cadenas de texto: `String`.

Respecto a los enteros, si necesitamos menor o mayor precisión también disponemos de `Int8`, `Int32` e
`int128` y lo mismo sucede con los enteros sin signo (`UInt`) y los números en coma flotante (`Float16`, `Float32` y `Float64`)

Para crear una nueva variable podemos hacerlo de la misma forma que en Pyhton, es decir, con el
operador `=`:

```julia
julia> nombre = "Manuel"
"Manuel"

julia> typeof(nombre)
String
```

Si queremos especificar el tipo de una variable podemos hacerlo con el operador `::`:

```julia
edad::Int8 = 25
```

Una vez especificado el tipo para una variable esta sólo podrá contener valores de ese tipo. Si se le intenta asignar un valor de otro tipo Julia lanzará un error.

Podremos comprobar el tipo de una variable con la función `typeof` o el operador `isa`:

```julia
typeof(edad)
Int8

edad isa Int
true
```

### Tipos de definidos por el usuario

En Julia el usuario puede definir tipos compuestos de datos. Estes tipos se definen usando la
palabra reservada `struct`:

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
suma(arg1, arg2) = arg1 + arg2
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

### Argumentos por referencia

Los argumentos de una función en Julia **siempre se pasan por referencia**, es decir, no se pasan copias de los argumentos si no sus valores.

Esto puede resultar engañoso ya que si lo que pasamos es una estructura de datos se podrá modificar dentro de la función pero si lo que pasamos es un tipo simple los cambios no se aplicarán. Esto se debe a que se crearán nuevas variables locales con el mismo nombre que las variables que pasamos a la función.

Si declaramos la siguiente función:

```julia
function prueba(x::Array, y::Int64)
    y, x[1] = x[1], y # Este y es una variable local.
end
```

```julia
julia> x = [1 2 3]
1×3 Matrix{Int64}:
 1  2  3

julia> y = 10
10

julia> prueba(x, y)
(10, 1)

println("x = $x")
x = [1 2 3]

println("y = $y")
y = 10
```

Cuando una función modifica alguno de sus argumentos se suele añadir un signo de exclamación `!` a continuación del nombre de la función. Esto es una convención en Julia, el `!` no modifica el comportamiento de la función.

### Múltiples argumentos de retorno

Las funciones de Julia pueden devolver más de un valor. Para hacerlo usamos la palabra reservada `return` seguida de una tupla con los valores a devolver:

```julia
function swap (x, y)
    return (y, x)
end

x = 1
y = 2

swap(x, y) # (2, 1)
```

Los paréntesis para indicar la tupla son opcionales:

```julia
function swap (x, y)
   return y, x
end
```

A la hora de recibir esos resultados múltiples se indicará también una tupla:

```julia
(x, y) = swap(1, 2) # x = 2, y = 1.

# También se pueden omitir los paréntesis:
x = 1
y = 2

x, y = swap(x, y)  # x = 2, y = 1.
```

Si queremos ignorar algunos de los valores devueltos en lugar de indicar una variable para que reciba el valor usaremos el guión bajo `_`.

```julia
x = 1
y = 2

x, _ = swap(x, y) # x = 2, y = 2.
```

### Funciones anónimas / lambdas

Cuando sólo necesitamos usar una función de una manera puntual (por ejemplo indicar una función de comparación para un *sort* o en funciones de filtrado) por lo que no hace falta asignarle un nombre. Para definir una función anónima se utiliza el operador `->`:

```julia
x -> x^2
```

Esta función se podrá usar en cualquier lugar donde se necesite una función, por ejemplo en la función `map`:

```julia
julia> map(x -> x^2, [1, 2, 3])
3-element Vector{Int64}:
 1
 4
 9
```

### Argumentos con nombre

En las funciones también podemos especificar argumentos con nombre. Si lo hacemos estos tienen que ir después de los argumentos sin nombre y separados por un punto y coma `;`:

```julia
function union(str1::String, str2::String; prefijo::String = "", separador::String = " ",
    sufijo::String = "")
    return prefijo * str1 * separador * str2 * sufijo
end

# La llamada a la funcón sería:

resultado = union("Hola", "Mundo", separador=" ", prefijo="¡", sufijo="!")

# Nótese que no es necesario mantener el orden ni icluir todos los argumentos con nombre.
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
julia> a = [1 2 3]
1×3 Matrix{Int64}:
 1  2  3

julia> a.+5
1×3 Matrix{Int64}:
 6  7  8
```

## Estructuras de control

### Condicionales

La sintaxis de los condicionales en Julia es similar a la de otros lenguajes de programación:

```julia
x = 10
y = 5

if x > y
    println("$x es mayor que $y")
elseif x < y
    println("$x es menor que $y")
else
    println("$x es igual a $y")
end
```

### Bucle for

Los bucles for en Julia son similares a los de Python ya que no se usa una condición si no que se itera sobre una colección de elementos (como por ejemplo un rango):

```julia
for i in 1:5
    println(i)
end
```

La variable `i` tomará los valores del rango `1:5`, del 1 al 5 en cada iteración.

### Bucle while

Este bucle sí que permite usar una condición para determinar si se sigue iterando o no:

```julia
x = 5

while x > 0
    println(x)
    x -= 1
end
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

Por ejemplo, si queremos acceder al elemento de la fila 2 y columna 3 de una matriz `arr` haremos `arr[2, 3]`. Si queremos **obtener una copia** de la segunda columna de una matriz lo que haremos es: `col2 = arr[:, 2]`. Nótese que hemos dicho **copiar** pues si modificamos el valor de `col2` no se modificará el valor de `arr`.

Esto también se conoce como *slice* y es una forma de acceder a una parte de la matriz:

```julia
julia> mat = [1 2 3; 4 5 6; 7 8 9]
3×3 Matrix{Int64}:
 1  2  3
 4  5  6
 7  8  9

# Si queremos acceder a la submatriz de la fila 2 a la 3 y de la columna 2 a la 3 haremos:
julia> mat = [1 2 3; 4 5 6; 7 8 9]
3×3 Matrix{Int64}:
 1  2  3
 4  5  6
 7  8  9

julia> submat = mat[2:3, 2:3]
2×2 Matrix{Int64}:
 5  6
 8  9

julia> submat[1, 1] = 0
0

julia> submat
2×2 Matrix{Int64}:
 0  6
 8  9

julia> mat
3×3 Matrix{Int64}:
 1  2  3
 4  5  6
 7  8  9
```

También hemos de tener en cuenta que al hacer copias habrá que reservar espacio nuevo e inicializarlo con los valores de la matriz con el coste computacional que ello conlleva.

Si no deseamos realizar una copia de la matriz sino trabajar con una vista de la matriz original podemos usar la macro `@view`.

#### Vistas

Para crear una vista hemos de usar la macro `@view` y a continuación indicar la matriz y las posiciones que queremos ver. Por ejemplo, si queremos ver la primera fila de una matriz `arr` haremos `view(arr, :, 1)` o bien `@view arr[1, :]`.

```julia
julia> vmat = @view mat[2:3, 2:3]
2×2 view(::Matrix{Int64}, 2:3, 2:3) with eltype Int64:
 5  6
 8  9

# Ahora si modificamos un valor de la vista:

julia> vmat[1, 1] = 0
0

# también se modificará en la matriz original.

julia> mat
3×3 Matrix{Int64}:
 1  2  3
 4  0  6
 7  8  9
```

#### *Comprehensions*

Las *comprehensions* en Julia son, al igual que las *list comprehensions* de Python, una forma de crear arrays de forma compacta a partir de una sentencia.

La sintaxis es la siguiente:

```julia
arr = [f(x) for x in iterable]
```

Donde `f(x)` es la función que queremos aplicar a cada elemento de `iterable`.

Si queremos crear una matriz con los valores de la media de cada columna de otra matriz podríamos hacerlo de la siguiente forma:

```julia
using Statistics # Para poder usar la función mean().

# mat sería una matriz con n columnas.
mat = [1 2 3; 4 5 6; 7 8 9]
3×3 Matrix{Int64}:
 1  2  3
 4  5  6
 7  8  9

mat_avg = [mean col for col in eachcol(mat)]
3-element Vector{Float64}:
 4.0
 5.0
 6.0
```
