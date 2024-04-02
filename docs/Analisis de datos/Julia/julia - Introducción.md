# Introducción a Julia

Introducción sobre Julia.

Julia es un lenguaje de programación que es a la vez de alto nivel y tiene una gran velocida de ejecución. Además, a diferencia de otros lenguajes como R o Phthon, las librerías de Julia están escritas completamente en Julia. En Python y R hay librerías que, para maximizar su velocidad, están implementadas en otros lenguajes en los que se puede lograr una mayor velocidad de ejecución, como es el caso de C o C++.

Julia y su ecosistema de paquetes tienen cinco características que son relevantes para aquellos que deseen realizar análisis de datos:

* Velocidad de ejecución del código (puesto que es compilado).
* Ha sido diseñando con la capacidad de uso interactivo en mente.
* Presenta facilidade para escribir código reutilizable.
* Sistema de gestión de paquetes integrado.
* Fácil integración con otros lenguajes.

## Julia es un lenguaje compilado

TODO-incluir información sobre el sistema de compilación. LLVM.

Julia también permite realizar ejecución de código en paralelo (utilizando varios núcleos de la CPU) y en de manera distribuida (utilizando varios ordenadores). Además, por medio de paquetes como `CUDA.jl` puede ejecutar código en GPUs.

## Julia soporta flujos de trabajo interactivos

Aunque Julia es un lenguaje compilado, también permite ejecutar código de manera interactiva. Esto se logra mediante alguno de los siguientes métodos:

* REPL (read-eval-print loop) de Julia, es decir, la shell de Julia.
* Jupiter notebooks.
* Los cuadernos del paquete `Pluto.jl`. Se diferencian de los cuadernos de Jupyter en que, por ejemplo, cuando cambiamos algo en el código `Pluto.jl` actualizará todos los valores que dependan de él en todo el cuaderno.
En todos estos casos el código se compila siempre que el usuario lo ejecute aunque esto sea de manera transparente para él.

## Entorno de trabajo

Instalación de Julia y entorno de trabajo.

Posibilidades: Pluto.js / IDE y Julia REPL.

### Pluto.js

### VS Code + REPL

## Comentarios en Julia

Para comentar una línea en Julia ha de usarse el símbolo `#` al comienzo de la línea.

Si queremos comentar varias líneas podemos usar la notación `#=` y `=#`.

## Tipos de datos

### Tipos simples

No tipado pero con opción de declarar el tipo de una variable usando el operador `::`.

Los tipos de variables más comunes en análisis de datos son:

* Enteros: `Int64`.
* Número reales: `Float64`.
* Booleanos: `Bool`.
* Cadenas de texto: `String`.

Respecto a los enteros, si necesitamos menos o más precisión también disponemos de `int8` e
`int128`.

Para crear una nueva variable podemos hacerlo de la misma forma que en Pyhton, es decir, con el
operador `=`:

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

### Múltiples argumentos de retorno

Las funciones de Julia pueden devolver más de un valor. Para hacerlo usamos la palabra reservada `return` seguida de una tupla con los valores a devolver:

```julia
function swap (x, y)
   return (y, x) 
end
```

Los paréntesis para indicar la tupla son opcionales:

```julia
function swap (x, y)
   return y, x
end
```

A la ora de recibir esos resultados múltiples se indicará también una tupa:

```julia
(x, y) = swap(1, 2) # x = 2, y = 1

# También se pueden omitir los paréntesis:

x, y = swap(x, y)  # x = 1, y = 2
```

Si queremos ignorar alunos de los valores devueltos en lugar de indicar una variable para que reciba el valor usaremos el guión bajo `_`.

### Funciones anónimas

Cuando sólo necesitamos usar una función de una manera puntual (por ejemplo indicar una función de comparación para un *sort* o en funciones de filtrado) por lo que no hace falta asignarle un nombre. Para definir una función anónima se utiliza el operador `->`:

```julia
x -> x^2
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
