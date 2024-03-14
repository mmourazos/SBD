### A Pluto.jl notebook ###
# v0.19.40

using Markdown
using InteractiveUtils

# ╔═╡ 95a3e830-e159-11ee-2aaa-bffac3f024eb
md"# Primeros pasos en Pluto.jl

Estoy intentado crear un *notebook* en `Pluto.jl` para ver qué tan interesante es a la hora de dar un curso de Julia.

En Pluto, por lo que veo, lo que hacemos es crear celdas. Una celda por defecto es código de Julia. Si queremos escribir markdown hemos de esbribir `md\"<texto markdown>\"`."

# ╔═╡ 2f843b1a-23ef-4602-8be9-dc2f9ff9c537
md"Cuando escribimos una celda de markdown, para que se *renderice* el código hemos de ejecutarla como si fuese una celda de código."

# ╔═╡ f213c5a9-2080-4083-9ec1-00d8049dad17
md"Lo normal, para facilitar la legibilidad, es ocultar a continuación (pulsando en el icono de 👁️ a la izquierda de la celda) el código de la celda."

# ╔═╡ f9de0bac-d686-4c15-a542-8782b6c3f938
begin
suma(arg1::Int64, arg2::Int64)::Int128 = arg1 + arg2
suma(10, 20)
end

# ╔═╡ Cell order:
# ╟─95a3e830-e159-11ee-2aaa-bffac3f024eb
# ╟─2f843b1a-23ef-4602-8be9-dc2f9ff9c537
# ╟─f213c5a9-2080-4083-9ec1-00d8049dad17
# ╠═f9de0bac-d686-4c15-a542-8782b6c3f938
