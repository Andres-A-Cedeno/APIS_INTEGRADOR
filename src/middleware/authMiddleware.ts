import { Elysia } from "elysia";

export const authMiddleware = (app: Elysia) =>
  app.derive(async (ctx) => {
    // Obtener el token desde el encabezado Authorization
    const authorizationHeader = ctx.headers["authorization"];
    const token = authorizationHeader?.split(" ")[0]; // Extraer el token después de "Bearer"

    // Si no hay token, devolver un error 401 en formato JSON
    if (!token) {
      return ctx.error(401, "No se proporcionó un token de autenticación"); // ctx.error acepta directamente el código de estado y mensaje
    }

    try {
      // Verificar el token usando el plugin JWT de Elysia
      const payload = await ctx.jwt.verify(token);

      // Si el token es inválido, devolver un error 401 en formato JSON
      if (!payload) {
        return ctx.error(401, "Token inválido o expirado"); // ctx.error acepta directamente el código de estado y mensaje
      }

      // Adjuntar el payload del token al contexto para su uso en las rutas
      ctx.user = payload;
    } catch (err) {
      console.error("Error al verificar el token:", err);

      // Devolver un error 401 en formato JSON en caso de fallo
      return JSON.stringify(ctx.error(401, "Token inválido")); // ctx.error acepta directamente el código de estado y mensaje
    }
  });
