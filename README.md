# **Documentación de la Aplicación**

Este proyecto es una aplicación backend desarrollada con **Elysia** (un framework rápido y moderno para Node.js) y **Bun** (un runtime de JavaScript rápido y eficiente). La aplicación proporciona una API para gestionar usuarios, autenticación y comentarios.

---

## **Tabla de Contenidos**

- [**Documentación de la Aplicación**](#documentación-de-la-aplicación)
  - [**Tabla de Contenidos**](#tabla-de-contenidos)
  - [**Arbol de la Aplicación**](#arbol-de-la-aplicación)
  - [**Requisitos**](#requisitos)
  - [**Instalación**](#instalación)
  - [**Configuración**](#configuración)
  - [**Uso de la API**](#uso-de-la-api)
    - [**Autenticación**](#autenticación)
    - [**Inicio de sesión**](#inicio-de-sesión)
    - [**Recycling Tips**](#recycling-tips)
    - [**Comentarios**](#comentarios)
  - [**Dockerización**](#dockerización)
  - [**Contribución**](#contribución)

---

## **Arbol de la Aplicación**

El arbol de la aplicación se muestra a continuación:

/proyecto │ ├── src │ ├── controllers │ ├── models │ ├── routes │ ├── utils │ └── index.ts ├── Dockerfile ├── docker-compose.yml ├── package.json ├── bun.lockb ├── .env └── README.md

---

---

## **Requisitos**

- [Bun](https://bun.sh/) (v1.0.0 o superior)
- [MongoDB](https://www.mongodb.com/) (v6.0 o superior)
- [Docker](https://www.docker.com/) (opcional, para ejecutar en contenedores)

---

## **Instalación**

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Andres-A-Cedeno/APIS_INTEGRADOR.git
   cd tu-repositorio
   ```

2. Instala las dependencias:

   ```bash
   bun install
   ```

3. Ejecuta la aplicación:

   ```bash
   bun run src/index.ts
   ```

4. Abre la aplicación en tu navegador:

   ```bash
   open http://localhost:3000
   ```

---

## **Configuración**

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

```bash
PORT=3000 # Puerto de la aplicación
MONGODB_URI=mongodb://localhost:27017/tu-base-de-datos # Conexión a MongoDB
JWT_TOKEN_SECRET=mi_secret # Secreto para el token JWT
```

> Nota: Asegúrate de reemplazar `tu-base-de-datos` con el nombre de tu base de datos.
> Asegúrate de reemplazar `mi_secret` con un secreto aleatorio.
> Si esta usando un base de datos de mongo remoto, asegúrate de reemplazar `mongodb://localhost:27017/tu-base-de-datos` con la conexión a tu base de datos. y reemplazar `localhost` con el nombre de tu servidor.

## **Uso de la API**

### **Autenticación**

Para registrarte en la aplicación, debes enviar una solicitud POST a la ruta `/register` con el siguiente cuerpo:

```json
{
  "name": "Tu nombre",
  "email": "tu-correo@ejemplo.com",
  "password": "tu-contraseña"
}
```

Para autenticar a tu aplicación, debes enviar una solicitud POST a la ruta `/login` con el siguiente cuerpo:

```json
{
  "email": "tu-correo@ejemplo.com",
  "password": "tu-contraseña"
}
```

### **Inicio de sesión**

Una vez que hayas registrado y autenticado a tu aplicación, puedes iniciar sesión para acceder a las funcionalidades de la aplicación.

Para iniciar sesión, debes enviar una solicitud POST a la ruta `/login` con el siguiente cuerpo:

```json
{
  "email": "tu-correo@ejemplo.com",
  "password": "tu-contraseña"
}
```

Si el inicio de sesión es exitoso, la respuesta de la API devolverá un objeto JSON con el siguiente formato:

```json
{
  "message": "Inicio de sesión exitoso",
  "data": {
    "token": "tu-token-jwt"
  }
}
```

### **Recycling Tips**

La API de Recycling Tips proporciona una lista de consejos para reducir la cantidad de basura que se produce en el mundo. Cada consejo incluye una descripción detallada, una imagen y una lista de elementos que pueden ser reutilizados o reciclados.

Para obtener todas las consejos, envía una solicitud GET a la ruta `/tips`.

Si la solicitud es exitosa, la respuesta de la API devolverá un objeto JSON con el siguiente formato:

````json
{
  "message": "Recycling Tips obtenido correctamente",
  "recyclingTips": [
    {
      "name": "Consejo 1",
      "description": "Descripción del consejo 1",
      "image": "https://example.com/imagen.jpg",
      "details": [
        {
          "section": {
            "title": "Sección 1",
            "image": "https://example.com/imagen.jpg"
          },
          "content": {
            "description": "Descripción del contenido del consejo 1",
            "list": [
              {
                "title": "Elemento 1",
                "list_items": [
                  {
                    "title": "Elemento de la lista 1",
                    "item_description": [
                      "Descripción del elemento de la lista 1"
                    ]
                  },
                  {
                    "title": "Elemento de la lista 2",
                    "item_description": [
                      "Descripción del elemento de la lista 2"
                    ]
                  }
                ]
              },
              {
                "title": "Elemento 2",
                "list_items": [
                  {
                    "title": "Elemento de la lista 1",
                    "item_description": [
                      "Descripción del elemento de la lista 1"
                    ]
                  },
                  {
                    "title": "Elemento de la lista 2",
                    "item_description": [
                      "Descripción del elemento de la lista 2"
                    ]
                  }
                ]
              }
            ]
          }
        }
      ]
    }, 
  ]
}
````

---

### **Comentarios**

Para crear un nuevo comentario, debes enviar una solicitud POST a la ruta `/newComment` con el siguiente cuerpo:

```json
{
  "author": "Tu nombre",
  "content": "Tu comentario"
}
```

Si la solicitud es exitosa, la respuesta de la API devolverá un objeto JSON con el siguiente formato:

```json
{
  "message": "Comentario creado correctamente",
  "comment": {
    "author": "Tu nombre",
    "content": "Tu comentario",
    "createdAt": "2023-03-01T00:00:00.000Z"
  }
}
```

Para obtener todos los comentarios, envía una solicitud GET a la ruta `/comments`.

Si la solicitud es exitosa, la respuesta de la API devolverá un objeto JSON con el siguiente formato:

```json
{
  "message": "Comentarios obtenidos correctamente",
  "comments": [
    {
      "author": "Tu nombre",
      "content": "Tu comentario",
      "createdAt": "2023-03-01T00:00:00.000Z"
    }
  ]
}
```

---

## **Dockerización**

Para ejecutar la aplicación en un entorno Docker, sigue estos pasos:

1. Crear un archivo `docker-compose.yml` en la raíz del proyecto con el siguiente contenido:

```yaml
version: "3.8"

services:
  # Servicio para la aplicación
  app:
    build:
      context: . # Usar el Dockerfile en el directorio actual
      dockerfile: Dockerfile
    ports:
      - "3000:3000" # Mapear el puerto 3000 del contenedor al puerto 3000 del host
    environment:
      - PORT=3000
      - JWT_TOKEN_SECRET=mi_secret # Secreto para el token JWT
      - MONGODB_URI=string_deconexcion_a_mongodb # Conexión a MongoDB
    depends_on:
      - mongo # Depende del servicio de MongoDB

  # Servicio para MongoDB
  mongo:
    image: mongo:6.0 # Usar la imagen oficial de MongoDB
    ports:
      - "27017:27017" # Mapear el puerto 27017 del contenedor al puerto 27017 del host
    volumes:
      - mongo-data:/data/db # Persistir los datos de MongoDB en un volumen

# Volumen para persistir los datos de MongoDB
volumes:
  mongo-data:
````

---

1. Ejecutar la aplicación con Docker:

```bash
docker-compose up -d
```

1.1 Abrir la aplicación en tu navegador:

```bash
open http://localhost:3000
```

---

## **Contribución**

Si deseas contribuir al proyecto, puedes hacerlo de varias maneras:

- Reportando errores o sugiriendo mejoras en la documentación.
- Creando nuevas funcionalidades o mejorando las existentes.
- Ayudando a traducir la documentación al idioma que prefieras.
