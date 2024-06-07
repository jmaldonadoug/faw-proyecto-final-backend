drop database faw_proyecto_final;
create database faw_proyecto_final;
use faw_proyecto_final;

create table usuario (
	idusuario int primary key auto_increment,
    nombre varchar(200) not null,
    email varchar(100) unique not null,
    fecha_nacimiento date not null,
    clave varchar(100) not null,
    genero enum('M', 'F') not null
);

create table tarea (
	idtarea int primary key auto_increment,
    titulo varchar(200) not null,
    descripcion varchar(500),
    prioridad enum('Alta', 'Media', 'Baja') not null,
    fecha_creacion datetime not null default now(),
    activa boolean default true not null,
    idusuario int not null,
    foreign key(idusuario) references usuario(idusuario)
);

insert into usuario(nombre, email, fecha_nacimiento, clave, genero) values('Jonatan Maldonado', 'jm@gmail.com', '2000-07-19', md5('123455'), 'M');
insert into usuario(nombre, email, fecha_nacimiento, clave, genero) values('Usuario Prueba', 'prueba@gmail.com', '2003-01-22', md5('123456'), 'F');

insert into tarea(titulo, descripcion, prioridad, idusuario) values('Tarea 1', 'Descripcion de tarea 1', 'Alta', 1);
insert into tarea(titulo, descripcion, prioridad, idusuario) values('Tarea 2', 'Descripcion de tarea 2', 'Media', 1);
insert into tarea(titulo, descripcion, prioridad, idusuario) values('Tarea 3', 'Descripcion de tarea 3', 'Media', 1);
insert into tarea(titulo, descripcion, prioridad, idusuario) values('Tarea 4', 'Descripcion de tarea 4', 'Baja', 1);
insert into tarea(titulo, descripcion, prioridad, idusuario) values('Tarea 1', 'Descripcion de tarea 1', 'Baja', 2);

select * from usuario;
select * from tarea;