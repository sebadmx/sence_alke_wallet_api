# Alke Wallet API

## Descripción del proyecto

Este proyecto corresponde al desarrollo de una API REST para la plataforma **Alke Wallet**, una billetera digital que permite gestionar usuarios, monedas y transacciones entre usuarios.

La aplicación fue desarrollada utilizando **Node.js**, **Express** y **PostgreSQL**, permitiendo consultar información almacenada en la base de datos y exponerla mediante endpoints HTTP.

---

## Tecnologías utilizadas

* Node.js
* Express
* PostgreSQL
* pg (node-postgres)
* CORS

---

## Instalación del proyecto

1. Clonar el repositorio o descargar el proyecto.

2. Instalar las dependencias:

npm install

3. Configurar la conexión a la base de datos en el archivo:

src/db.js

Ejemplo de configuración:

const pool = new Pool({
user: "postgres",
host: "localhost",
database: "alke_wallet",
password: "123456",
port: 5432
})

4. Iniciar el servidor:

node src/server.js

El servidor se ejecutará en:

http://localhost:3000

---

## Endpoints disponibles

### Obtener usuarios

GET /usuarios

Retorna la lista de usuarios registrados en el sistema.

---

### Obtener monedas

GET /monedas

Retorna la lista de monedas disponibles en la plataforma.

---

### Obtener transacciones

GET /transacciones

Retorna el historial de transacciones entre usuarios incluyendo emisor, receptor, moneda y monto.

---

## Estructura del proyecto

alke-wallet-api
│
├── src
│   ├── db.js
│   ├── server.js
│   └── routes
│        ├── usuarios.js
│        ├── monedas.js
│        └── transacciones.js

---

## Autor

Proyecto desarrollado como parte del módulo de Backend con Node.js y Express.

Alumno: Sebastián
