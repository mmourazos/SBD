# Redis con Python

## Crear el entorno

Para crear el entorno de trabajo usaremos un entorno virtual con el módulo `venv`. Para ello, abrimos una terminal y nos situamos en el directorio donde queremos crear el entorno. Una vez allí, ejecutamos el siguiente comando:

```pwsh
python -m venv .\venv
```

A contiunción hemos de activar el entorno virtual. Para ello, ejecutamos el siguiente comando:

En Windows:

```pwsh
./vent/Scripts/activate
```

En Linux:

```bash
source ./venv/bin/activate
```

Ahora, con el entorno activado podemos instalar el módulo `redis` con el siguiente comando:
```pwsh
python -m pip install redis
```
