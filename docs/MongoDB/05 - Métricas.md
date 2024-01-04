# Métricas

En este apartado veremos cómo obtener información sobre el rendimiento de las consultas que realizamos sobre MongoDB.

Para obtener información sobre cómo se ha realizado una consulta podemos usar el método `explain()`.

```javascript
db.alum.explain().find({nombre: 'Juan'})
```

## El método `explain()`

El método `explain()` nos permite obtener información sobre cómo se ha realizado una consulta. Este método se puede aplicar a cualquier consulta que se realice sobre una colección.

```javascript
db.alum.explain().find({nombre: 'Juan'})
```

A veces nos interesará única y exclusivamente la información sobre el rendimiento de la consulta.

```javascript
db.alum.explain('executionStats').find({nombre: 'Juan'})
```