import { Elysia } from "elysia";
import connectDB from "./config/database";
import { authRoutes } from "./routes/authRoutes";
import { protectedRoutes } from "./routes/protectedRoutes";
import bearer from "@elysiajs/bearer";
import jwt from "@elysiajs/jwt";

const PORT = process.env.PORT!;
const JWT_SECRET = process.env.JWT_TOKEN_SECRET!;
//Inicializamos la base de datos
connectDB();

const app = new Elysia()
  .use(
    jwt({
      name: "jwt",
      secret: JWT_SECRET, // Usamos la clave secreta
      expire: "3h", // El token expirará en 3 horas
    })
  )
  .onParse(({ request }, contentType) => {
    if (contentType === "application/custom-type") return request.json();
  })
  .use(bearer())
  .use(authRoutes)
  .use(protectedRoutes)
  .onAfterHandle(({ response }) => {
    if (typeof response === "object") {
      return new Response(JSON.stringify(response), {
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ message: response }), {
      headers: { "Content-Type": "application/json" },
    });
  })
  .listen(PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
