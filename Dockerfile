# Usar una imagen base de Bun
FROM oven/bun:latest

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo package.json y bun.lockb
COPY package.json bun.lockb ./

# Instalar dependencias
RUN bun install

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto en el que corre la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["bun", "run", "start"]