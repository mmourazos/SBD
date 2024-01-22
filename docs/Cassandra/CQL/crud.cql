CREATE KEYSPACE sbd
WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 2 };

CREATE TABLE miembros (
    id int PRIMARY KEY,
    nombre text,
    apellidos text,
    edad int,
    rol text,
    fecha_alta timestamp,
    fecha_de_nacimiento date
);