import { Elysia } from "elysia";

// Interfaz para el payload del token
interface TokenPayload {
  id: string;
  email: string;
}

// Generar el token JWT
export const generateToken = async (
  payload: TokenPayload,
  jwt: Elysia["jwt"]
) => {
  return jwt.sign(payload);
};

// Verificar el token JWT
export const verifyToken = async (token: string, jwt: Elysia["jwt"]) => {
  try {
    return await jwt.verify(token);
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};
