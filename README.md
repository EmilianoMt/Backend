<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Turing-IA API: Catálogo de Exhibición Automotriz


## Descripción del Proyecto

Este repositorio contiene el código fuente del **Backend** desarrollado para el periodo de evaluación técnica de la vacante de Desarrollo de Software.

El proyecto consiste en una **API RESTful** robusta y escalable construida con **NestJS**, diseñada para alimentar un Catálogo de Exhibición Automotriz. Se encarga de gestionar la persistencia de datos, la seguridad y la lógica de negocio necesaria para servir la información al frontend.

La base de datos relacional está estructurada en **PostgreSQL** y normalizada hasta la Tercera Forma Normal (3NF), utilizando **Prisma** como ORM para garantizar la integridad de los datos y un tipado estricto de extremo a extremo.

## Funcionalidades Principales

- Registro e inicio de sesion de usuarios.
- Autenticacion con JWT.
- Roles:
  - ADMIN: puede crear, editar y eliminar.
  - USER: consulta informacion.
- CRUD de marcas.
- CRUD de vehiculos.
- Carga de imagenes a S3 para vehiculos.
- Validaciones de datos con DTOs.

## Tecnologias

- Node.js + NestJS
- TypeScript
- PostgreSQL
- TypeORM
- JWT
- AWS S3

## Requisitos del sistema

Antes de ejecutar el proyecto en local, asegurate de tener:

- Node.js 20 o superior
- npm 10 o superior
- Una base de datos PostgreSQL disponible
- Una cuenta/bucket de AWS S3 (obligatorio por la configuracion actual del modulo AWS)

## Variables de entorno

Crea un archivo `.env` en la raiz del proyecto con este contenido:

```env
PORT=3000

# Base de datos PostgreSQL
# Ejemplo: postgresql://usuario:password@host:5432/nombre_db?sslmode=require
DATABASE_URL=

# JWT
JWT_SECRET=
JWT_EXPIRES_IN=3h

# AWS S3
ACCESSKEY_BUCKET=
SECRETKEY_BUCKET=
BUCKET_NAME=
```

Notas:

- `JWT_SECRET` es obligatorio para poder iniciar la API.
- `DATABASE_URL` es obligatorio para la conexion a PostgreSQL.
- Las 3 variables de AWS son obligatorias para iniciar correctamente el modulo de carga de imagenes.

## Instalacion y ejecucion local

1. Clonar el repositorio.
2. Entrar a la carpeta del backend.
3. Instalar dependencias.
4. Crear el archivo `.env` con las variables anteriores.
5. Levantar el servidor.

Comandos:

```bash
npm install
npm run start:dev
```

La API inicia por defecto en:

```text
http://localhost:3000
```

## Scripts disponibles

```bash
# Desarrollo
npm run start
npm run start:dev
npm run start:debug

# Build y produccion
npm run build
npm run start:prod

# Calidad y pruebas
npm run lint
npm run format
npm run test
npm run test:watch
npm run test:cov
npm run test:e2e
```

## Endpoints principales

Usuarios:

- `POST /users/register`
- `POST /users/login`

Marcas:

- `GET /brands/findAll`
- `GET /brands/findOne/:name`
- `POST /brands/register` (ADMIN)
- `PATCH /brands/:id` (ADMIN)
- `DELETE /brands/:id` (ADMIN)

Vehiculos:

- `GET /vehicles`
- `GET /vehicles/model/:model`
- `POST /vehicles` (ADMIN)
- `POST /vehicles/upload/:id` (ADMIN)
- `PATCH /vehicles/:id` (ADMIN)
- `DELETE /vehicles/:id` (ADMIN)

## Flujo rapido para probar autenticacion

1. Registrar usuario en `POST /users/register`.
2. Hacer login en `POST /users/login`.
3. Copiar el token y enviarlo como `Bearer token` en rutas protegidas.



