import { Schema, model, Document } from "mongoose";

interface IComment extends Document {
  author: string; // Nombre del autor del comentario
  content: string; // Contenido del comentario
  createdAt: Date; // Fecha de creación del comentario
}

// Definir el esquema de Mongoose
const commentSchema = new Schema<IComment>(
  {
    author: {
      type: String,
      required: true, // El autor es obligatorio
    },
    content: {
      type: String,
      required: true, // El contenido es obligatorio
    },
    createdAt: {
      type: Date,
      default: Date.now, // Establece la fecha actual por defecto
    },
  },
  {
    versionKey: false, // Deshabilita el campo __v (versión del documento)
  }
);

// Exportar el modelo
export const Comment = model<IComment>("Comment", commentSchema);
