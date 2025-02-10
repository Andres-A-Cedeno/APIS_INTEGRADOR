import { Context } from "elysia";
import { Comment } from "../models/commentModel"; // Importar el modelo de comentarios

// Crear un nuevo comentario
export const createComment = async (ctx: Context) => {
  try {
    const { author, content } = ctx.body as { author: string; content: string };

    // Validar que se proporcionen el autor y el contenido
    if (!author || !content) {
      ctx.set.status = 400;
      return { message: "El autor y el contenido son obligatorios" };
    }

    // Crear el comentario
    const newComment = new Comment({ author, content });
    await newComment.save();

    ctx.set.status = 201; // Código 201: Created
    return { message: "Comentario creado correctamente", comment: newComment };
  } catch (err: any) {
    console.error("Error al crear el comentario:", err);

    ctx.set.status = 500;
    return { message: "Error interno del servidor" };
  }
};

// Obtener todos los comentarios
export const getAllComments = async (ctx: Context) => {
  try {
    // Obtener todos los comentarios de la base de datos
    const comments = await Comment.find();

    ctx.set.status = 200;
    return comments;
  } catch (err: any) {
    console.error("Error al obtener los comentarios:", err);

    ctx.set.status = 500;
    return { message: "Error interno del servidor" };
  }
};
