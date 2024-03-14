# Redis con Python

## Crear el entorno

Para crear el entorno de trabajo usaremos un entorno virtual con el módulo `venv`. Para ello, abrimos una terminal y nos situamos en el directorio donde queremos crear el entorno. Una vez allí, ejecutamos el siguiente comando:

```pwsh
python -m venv .\venv
```

A continuación hemos de activar el entorno virtual. Para ello, ejecutamos el siguiente comando:

En Windows:

```pwsh
./venv/Scripts/activate
```

En Linux:

```bash
source ./venv/bin/activate
```

(Cuando hayamos terminado de trabajar con el entorno virtual, podemos desactivarlo con el comando
`deactivate`.)

Ahora, con el entorno activado podemos instalar el módulo `redis` con el siguiente comando:

```pwsh
python -m pip install redis
```

## Gestión de datos privados

Para evitar compartir información privada es recomendable guardarla, en lugar de en el código fuente
del programa, en un archivo `.env` en la forma de pares `clave=valor`.


