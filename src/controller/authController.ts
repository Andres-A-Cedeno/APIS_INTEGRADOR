import { Context } from "elysia";
import User from "../models/authModel";
import { generateToken } from "../utils/jwtToken";

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
export const registerUser = async ({ body }: { body: RegisterBody }) => {
  const { name, email, password } = body;

  try {
    // Verificar si el usuario ya existe
    const userExist = await User.findOne({ email });
    if (userExist) {
      return { status: 400, message: "Email ya registrado" };
    }

    // Crear y guardar el nuevo usuario
    const user = new User({ name, email, password });
    await user.save();

    console.log("Usuario creado:", user);
    return { status: 201, message: "Usuario creado correctamente", data: user };
  } catch (err: any) {
    console.error("Error al registrar usuario:", err);
    return { status: 500, message: "Error interno del servidor" };
  }
};

// Iniciar sesión
export const loginUser = async ({ body, jwt }: Context) => {
  const { email, password } = body as LoginBody;

  try {
    // Buscar el usuario en la base de datos
    const user = await User.findOne({ email });
    if (!user) return { status: 404, message: "Usuario no encontrado" };

    // Verificar la contraseña
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return { status: 401, message: "Contraseña incorrecta" };

    // Generar el token JWT
    const token = await generateToken({ id: user._id, email: user.email }, jwt);

    return {
      status: 200,
      message: "Inicio de sesión exitoso",
      data: { token },
    };
  } catch (err: any) {
    console.error("Error al iniciar sesión:", err);
    return { status: 500, message: "Error interno del servidor" };
  }
};
