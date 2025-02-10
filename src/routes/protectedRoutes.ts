import { Elysia } from "elysia";
import {
  getAllRecyclingTips,
  getRecyclingTipById,
} from "../controller/recyclingController";
import { authMiddleware } from "../middleware/authMiddleware";
import { createComment, getAllComments } from "../controller/commnetController";

export const protectedRoutes = new Elysia()
  .use(authMiddleware)
  .get("/tips", getAllRecyclingTips)
  .get("/tips/:id", getRecyclingTipById)
  .post("/newComment", createComment)
  .get("/comments", getAllComments);
