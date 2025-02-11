# **Documentación de la Aplicación**

Este proyecto es una aplicación backend desarrollada con **Elysia** (un framework rápido y moderno para Node.js) y **Bun** (un runtime de JavaScript rápido y eficiente). La aplicación proporciona una API para gestionar usuarios, autenticación y comentarios.

---

## **Tabla de Contenidos**

- [**Documentación de la Aplicación**](#documentación-de-la-aplicación)
  - [**Tabla de Contenidos**](#tabla-de-contenidos)
  - [**Requisitos**](#requisitos)
  - [**Instalación**](#instalación)
  - [**Contribución**](#contribución)
  - [**Licencia**](#licencia)

---

## **Requisitos**

- [Bun](https://bun.sh/) (v1.0.0 o superior)
- [MongoDB](https://www.mongodb.com/) (v6.0 o superior)
- [Docker](https://www.docker.com/) (opcional, para ejecutar en contenedores)

---

## **Instalación**

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio


## **Configuración**

### **Variables de entorno**

### **Requerimientos**

## **Uso de la API**

### **Autenticación**

### **Comentarios**

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
```

---

2. Ejecutar la aplicación con Docker:

```bash
docker-compose up -d
```

1. Abrir la aplicación en tu navegador:

```bash
open http://localhost:3000
```

---

## **Contribución**

Si deseas contribuir al proyecto, puedes hacerlo de varias maneras:

- Reportando errores o sugiriendo mejoras en la documentación.
- Creando nuevas funcionalidades o mejorando las existentes.
- Ayudando a traducir la documentación al idioma que prefieras.

Si deseas contribuir de manera significativa, por favor, lea el siguiente documento: [CONTRIBUTING.md](https://github.com/tu-usuario/tu-repositorio/blob/main/CONTRIBUTING.md).

---

## **Licencia**

Este proyecto está licenciado bajo la licencia MIT. Puedes encontrar más información sobre la licencia en el archivo [LICENSE](https://github.com/tu-usuario/tu-repositorio/blob/main/LICENSE).
