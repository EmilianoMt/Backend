<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Turing-IA API: Catálogo de Exhibición Automotriz

<!-- ![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) -->

## Descripción del Proyecto

Este repositorio contiene el código fuente del **Backend** desarrollado para el periodo de evaluación técnica de la vacante de Desarrollo de Software.

El proyecto consiste en una **API RESTful** robusta y escalable construida con **NestJS**, diseñada para alimentar un Catálogo de Exhibición Automotriz. Se encarga de gestionar la persistencia de datos, la seguridad y la lógica de negocio necesaria para servir la información al frontend.

La base de datos relacional está estructurada en **PostgreSQL** y normalizada hasta la Tercera Forma Normal (3NF), utilizando **Prisma** como ORM para garantizar la integridad de los datos y un tipado estricto de extremo a extremo.

## Funcionalidades Principales

* **Arquitectura Modular:** Desarrollo basado en módulos, controladores y servicios siguiendo las mejores prácticas de NestJS y la separación de responsabilidades.
* **Autenticación y Seguridad:** Implementación de inicio de sesión seguro con generación de tokens **JWT** (JSON Web Tokens).
* **Control de Acceso Basado en Roles (RBAC):** * `ADMIN`: Acceso total para gestionar el inventario (operaciones POST, PUT, DELETE).
    * `USER`: Acceso de solo lectura (operaciones GET) para consumir el catálogo.
* **Gestión de Catálogo (CRUD):** Endpoints completamente funcionales para la creación, lectura, actualización y eliminación de *Marcas* y *Vehículos*.
* **Validación de Datos:** Uso de *Pipes* y DTOs (Data Transfer Objects) para asegurar que la información entrante cumpla con las reglas de negocio antes de tocar la base de datos.

---

## Configuración del proyecto

```bash
$ npm install
```

## Compilación y ejecución

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```




