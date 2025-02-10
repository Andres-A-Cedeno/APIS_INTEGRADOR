import mongoose, { Schema, Document } from "mongoose";
import { compare, hash } from "bcrypt";

// 📌 Definir interfaz para tipado fuerte
export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER";
  comparePassword(enteredPassword: string): Promise<boolean>;
}

// 📌 Esquema de usuario
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: { type: String, required: true },
    role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
  },
  { timestamps: true }
);

// 📌 Middleware para hashear la contraseña antes de guardar
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hash(this.password, 10);
  next();
});

// 📌 Método para comparar contraseñas
userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await compare(enteredPassword, this.password);
};

export default mongoose.model<IUser>("User", userSchema, "users");
