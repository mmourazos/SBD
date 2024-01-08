# Agregaciones

Las agregaciones sirven para realizar operaciones respecto a valores de múltiples documentos.

Para realizar agregaciones se utilizarán *pipelines* de agregaciones.

## *Pipeline* de agregaciones

Los *pipeline* de agregaciones indican uno o más *stages* o fases. En una agregación común podemos dos fases, una para filtrar documentos y otra en la que agrupamos en función a un campo.

En el siguiente ejemplo estaremos realizando una agregación de *listings* de Airbnb de Barcelona. Primero filtraremos que el número mínimo de noches sea 3 o menos,  

```javascript
db.listings.aggregate( [
  {
      $match: { minimum_nights: { $lte: 3 } }
  },
  {
      $group: { _id: '$neighbourhood', listings: { $count: {} }, precio_medio: { $avg: '$price' } } 
  }
] )
```

