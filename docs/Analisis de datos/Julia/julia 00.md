# Introducción a Julia

Introducción sobre Julia.

## Entorno de trabajo

Instalación de Julia y entorno de trabajo.

Posibilidades: Pluto.js / IDE y Julia REPL.

### Pluto.js

### VS Code + REPL

## Tipos de datos

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

Los datos `struct` son **inmutables**, es decir, no se pueden modificar una vez creados. Si queremos
crear un tipo de datos que sea mutable podemos hacerlo con la palabra reservada `mutable struct` al
definir el `sturct`.

Es recomendable usar datos inmutables siempre que sea posible, ya que son más eficientes y menos
propensos a errores.

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

### Funciones anónimas


