import { Elysia } from "elysia";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
} from "../controller/authController";

export const authRoutes = new Elysia()
  .post("/register", registerUser)
  .post("/login", loginUser)
  .post("/refresh-token", refreshAccessToken);
