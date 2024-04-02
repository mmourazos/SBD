
# Estructuras de datos

Si queremos saber de qué métodos dispone una estructura de datos podemos usar la función `methodswith`:

```julia
julia> first(methodswith(Int64), 5)
[1] AbstractFloat(x::Int64) @ Base float.jl:268
[2] Float16(x::Int64) @ Base float.jl:159
[3] Float32(x::Int64) @ Base float.jl:159
[4] Float64(x::Int64) @ Base float.jl:159
[5] Int64(x::Union{Bool, Int32, Int64, UInt16, UInt32, UInt64, UInt8, Int128, Int16, Int8, UInt128}) @ Core boot.jl:784
```

## Difusión / Vectorización de operadores y funciones

Esta función de Julia permite aplicar una función a cada elemento de un iterable. Esto se hace
mediante el operador `.`:

```julia
[1, 2, 3] .+ 1
[2, 3, 4]
```

Para usarlo con funciones pondremos primero la función y después el `.` y el iterable:

```julia
julia> round.([1.2, 2.5, 3.33])
3-element Vector{Float64}:
 1.0
 2.0
 3.0
```

Estos operadores han de ser *unarios*.

## Funciones con *bang* `!`

Existe una convención en Julia para indicar que una función modifica el argumento que recibe.
Consiste en añadir un *bang* `!` al final del nombre de la función. Por ejemplo, la función `sort`
no modifica el argumento que recibe, pero la función `sort!` sí lo hace:

```julia
v = [3, 1, 2]
sort(v) # [1, 2, 3], pero v sigue siendo [3, 1, 2]

sort!(v) # v ahora es [1, 2, 3]
```

## `String`

Las cadenas se representan en Julia con comillas dobles `"` o triples `"""` aunque las triples se
suelen emplear únicamente para cadenas multilínea:

```julia
str1 = "Hola"
str2 = """
Hola
"Mundo" -> además podemos usar comillas dobles.
Cruel
"""

typeof(str1) # String
typeof(str2) # String
```

## Operador de concatenación `*`

Si queremos concatenar dos o más cadenas podemos usar el operador `*`:

```julia
str_arr = ["Hola", "Mundo"]
str_arr.*
```

Para concatenar usando un separador:

```julia
str_arr = ["Uno", "Dos", "Tres"]
separador = ", "

join(str_arr, separador) # "Uno, Dos, Tres"
```

## Interpolación de cadenas

Si queremos incluir el valor de una variable en una cadena podemos usar el signo de dólar `$`:

```julia
julia> x = 10
10

julia> println("El valor de x es $x.")
El valor de x es 10.
```

## `Tuplas`

## `NamedTuple`

## `UnitRange`

## `Arrays`

## `Pair`

## `Dict`

## `Symbol`
