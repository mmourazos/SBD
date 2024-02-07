# Tarea UD2: Comandos básicos de MongoDB

[TOC]

## Apartado 1

Encontrar todos los dispositivos

```javascript
db.collection.find()
```

Resultado:

```json
[
  {
    etiqueta: "HD7",
    tipo: "HD",
    compra: ISODate("2020-03-11T00:00:00.000Z"),
    ficheros: 13493,
    departamentos: [
      "Compras",
      "Ventas"
    ],
    espacio: {
      total: 1000,
      libre: 100
    }
  },
  {
    etiqueta: "SSD9",
    tipo: "SSD",
    compra: ISODate("2022-01-19T00:00:00.000Z"),
    ficheros: 20059,
    departamentos: [
      "Comercial"
    ],
    espacio: {
      total: 240,
      libre: 200
    }
  },
  {
    etiqueta: "DVD3",
    tipo: "DVD",
    compra: ISODate("2010-09-03T00:00:00.000Z"),
    ficheros: 937,
    departamentos: [
      "Ventas",
      "Comercial"
    ],
    espacio: {
      total: 4.7,
      libre: 0
    }
  },
  {
    etiqueta: "PEN09",
    tipo: "Pendrive",
    compra: ISODate("2018-02-22T00:00:00.000Z"),
    ficheros: 91277,
    departamentos: [
      "Compras"
    ],
    espacio: {
      total: 128,
      libre: 14
    }
  }
]
```

## Apartado 2

Encontrar los dispositivos con etiqueta "SSD9"

```javascript
db.collection.find({ etiqueta: "SSD9" })
```

o bien:

```javascript
db.collection.find({ etiqueta: { $eq: "SSD9" } })
```

Resultado:

```json
[
  {
    "_id": ObjectId("5a934e000102030405000001"),
    "compra": ISODate("2022-01-19T00:00:00Z"),
    "departamentos": [
      "Comercial"
    ],
    "espacio": {
      "libre": 200,
      "total": 240
    },
    "etiqueta": "SSD9",
    "ficheros": 20059,
    "tipo": "SSD"
  }
]
```

## Apartado 3

Encontrar los dispositivos que tengan 937 ficheros.

Consulta:

```javascript
db.collection.find({ ficheros: 937 })
```

Resultado:

```json
[
  {
    "_id": ObjectId("5a934e000102030405000002"),
    "compra": ISODate("2010-09-03T00:00:00Z"),
    "departamentos": [
      "Ventas",
      "Comercial"
    ],
    "espacio": {
      "libre": 0,
      "total": 4.7
    },
    "etiqueta": "DVD3",
    "ficheros": 937,
    "tipo": "DVD"
  }
]
```

## Apartado 4

Encontrar los dispositivos que tengan más de 1000 ficheros.

Consulta:

```javascript
db.collection.find({ ficheros: { $gt: 1000 }})
```

Resultado:

```json
[
  {
    "_id": ObjectId("5a934e000102030405000000"),
    "compra": ISODate("2020-03-11T00:00:00Z"),
    "departamentos": [
      "Compras",
      "Ventas"
    ],
    "espacio": {
      "libre": 100,
      "total": 1000
    },
    "etiqueta": "HD7",
    "ficheros": 13493,
    "tipo": "HD"
  },
  {
    "_id": ObjectId("5a934e000102030405000001"),
    "compra": ISODate("2022-01-19T00:00:00Z"),
    "departamentos": [
      "Comercial"
    ],
    "espacio": {
      "libre": 200,
      "total": 240
    },
    "etiqueta": "SSD9",
    "ficheros": 20059,
    "tipo": "SSD"
  },
  {
    "_id": ObjectId("5a934e000102030405000003"),
    "compra": ISODate("2018-02-22T00:00:00Z"),
    "departamentos": [
      "Compras"
    ],
    "espacio": {
      "libre": 14,
      "total": 128
    },
    "etiqueta": "PEN09",
    "ficheros": 91277,
    "tipo": "Pendrive"
  }
]
```

## Apartado 5

Encontrar los dispositivos comprados con posterioridad a 2020-01-01.

Consulta:

```javascript
db.collection.find({
    compra: { 
      $gt: new Date("2020-01-01") 
    } 
})
```

o también:

```javascript
db.collection.find({
  compra: {
    $gt: ISODate("2020-01-01")
  }
})
```

Resutados:

```json
[
  {
    "_id": ObjectId("5a934e000102030405000000"),
    "compra": ISODate("2020-03-11T00:00:00Z"),
    "departamentos": [
      "Compras",
      "Ventas"
    ],
    "espacio": {
      "libre": 100,
      "total": 1000
    },
    "etiqueta": "HD7",
    "ficheros": 13493,
    "tipo": "HD"
  },
  {
    "_id": ObjectId("5a934e000102030405000001"),
    "compra": ISODate("2022-01-19T00:00:00Z"),
    "departamentos": [
      "Comercial"
    ],
    "espacio": {
      "libre": 200,
      "total": 240
    },
    "etiqueta": "SSD9",
    "ficheros": 20059,
    "tipo": "SSD"
  }
]
```

## Apartado 6

Encontrar los dispositivos con menos de 100 GB libres.

Consulta:

```javascript
db.collection.find({
  "espacio.libre": { $lt: 100 }
})
```

Resultado:

```json
[
  {
    "_id": ObjectId("5a934e000102030405000002"),
    "compra": ISODate("2010-09-03T00:00:00Z"),
    "departamentos": [
      "Ventas",
      "Comercial"
    ],
    "espacio": {
      "libre": 0,
      "total": 4.7
    },
    "etiqueta": "DVD3",
    "ficheros": 937,
    "tipo": "DVD"
  },
  {
    "_id": ObjectId("5a934e000102030405000003"),
    "compra": ISODate("2018-02-22T00:00:00Z"),
    "departamentos": [
      "Compras"
    ],
    "espacio": {
      "libre": 14,
      "total": 128
    },
    "etiqueta": "PEN09",
    "ficheros": 91277,
    "tipo": "Pendrive"
  }
]
```

## Apartado 7

Encontrar los dispositivos que sean usados por los departamentos de compas o de ventas.

Consulta:

```javascript
db.collection.find({
    $or: [
        { departamentos: "Compras"},
        { departamentos: "Ventas"},
    ]
})
```

o bien:

```javascript
db.collection.find({
    departamentos: { $in: ["Compras", "Ventas"] }
})
```

Resultado:

```json
[
  {
    "_id": ObjectId("5a934e000102030405000000"),
    "compra": ISODate("2020-03-11T00:00:00Z"),
    "departamentos": [
      "Compras",
      "Ventas"
    ],
    "espacio": {
      "libre": 100,
      "total": 1000
    },
    "etiqueta": "HD7",
    "ficheros": 13493,
    "tipo": "HD"
  },
  {
    "_id": ObjectId("5a934e000102030405000002"),
    "compra": ISODate("2010-09-03T00:00:00Z"),
    "departamentos": [
      "Ventas",
      "Comercial"
    ],
    "espacio": {
      "libre": 0,
      "total": 4.7
    },
    "etiqueta": "DVD3",
    "ficheros": 937,
    "tipo": "DVD"
  },
  {
    "_id": ObjectId("5a934e000102030405000003"),
    "compra": ISODate("2018-02-22T00:00:00Z"),
    "departamentos": [
      "Compras"
    ],
    "espacio": {
      "libre": 14,
      "total": 128
    },
    "etiqueta": "PEN09",
    "ficheros": 91277,
    "tipo": "Pendrive"
  }
]
```

## Apartado 8

Encontrar los dispositivos que sean usados por los departamentos de compas o de ventas, pero en este caso sólo mostrar sus campos "etiqueta" y "ficheros".

Consulta

```javascript
db.collection.find({
  $or: [
    {
      departamentos: "Compras"
    },
    {
      departamentos: "Ventas"
    }
  ]
},
{
  etiqueta: 1,
  ficheros: 1
})
```

También se podría añadir en la proyección `_id: 0`.

Resultado:

```json
[
  {
    "_id": ObjectId("5a934e000102030405000000"),
    "etiqueta": "HD7",
    "ficheros": 13493
  },
  {
    "_id": ObjectId("5a934e000102030405000002"),
    "etiqueta": "DVD3",
    "ficheros": 937
  },
  {
    "_id": ObjectId("5a934e000102030405000003"),
    "etiqueta": "PEN09",
    "ficheros": 91277
  }
]
```
