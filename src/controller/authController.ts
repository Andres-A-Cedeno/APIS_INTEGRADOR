import { Context } from "elysia";
import User from "../models/authModel";
import { generateToken } from "../utils/jwtToken";
import { set } from "mongoose";

// Interfaces para tipado
interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

// Registrar un nuevo usuario
export const registerUser = async ({ body, set }: { body: RegisterBody }) => {
  const { name, email, password } = body;

  try {
    // Verificar si el usuario ya existe
    const userExist = await User.findOne({ email });
    if (userExist) {
      set.status = 400;
      return { message: "Email ya registrado" };
      //return { status: 400, message: "Email ya registrado" };
    }

    // Crear y guardar el nuevo usuario
    const user = new User({ name, email, password });
    await user.save();

    console.log("Usuario creado:", user);
    set.status = 200;
    return { message: "Usuario creado correctamente", data: user };
  } catch (err: any) {
    set.status = 500;
    console.error("Error al registrar usuario:", err);
    return { message: "Error interno del servidor" };
  }
};

// Iniciar sesión
export const loginUser = async ({ body, jwt, set }: Context) => {
  const { email, password } = body as LoginBody;

  try {
    // Buscar el usuario en la base de datos
    const user = await User.findOne({ email });
    if (!user) {
      set.status = 400;
      return { status: 404, message: "Usuario no encontrado" };
    }

    // Verificar la contraseña
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      set.status = 401;
      return { message: "Contraseña incorrecta" };
    }

    // Generar el token JWT
    const token = await generateToken({ id: user._id, email: user.email }, jwt);

    set.status = 200;
    return {
      message: "Inicio de sesión exitoso",
      data: { token },
    };
  } catch (err: any) {
    console.error("Error al iniciar sesión:", err);

    set.status = 500;
    return { message: "Error interno del servidor" };
  }
};

// src/controllers/authController.ts
export const refreshAccessToken = async (ctx: Context, jwt: any) => {
  const { refreshToken } = ctx.body as { refreshToken: string };

  try {
    // Verificar el refresh token
    const payload = await jwt.verify(refreshToken);

    if (!payload) {
      ctx.set.status = 401;
      return { message: "Refresh token inválido o expirado" };
    }

    // Generar un nuevo access token
    const accessToken = await generateToken(
      { id: payload.id, email: payload.email },
      jwt
    );

    ctx.set.status = 200;
    return { accessToken };
  } catch (err) {
    console.error("Error al refrescar el access token:", err);

    ctx.set.status = 401;
    return { message: "Refresh token inválido" };
  }
};
