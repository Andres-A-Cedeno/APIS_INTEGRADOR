import { Elysia } from "elysia";
import { registerUser, loginUser } from "../controller/authController";

export const authRoutes = new Elysia()
  .post("/register", registerUser)
  .post("/login", loginUser);
