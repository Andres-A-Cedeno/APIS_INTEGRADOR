import { Context } from "elysia";
import RecyclingTip from "../models/recyclingModel";

export const getAllRecyclingTips = async (ctx: Context) => {
  try {
    const recyclingTips = await RecyclingTip.find({}, "name description image");
    console.log("Recycling Tips:", recyclingTips);

    ctx.set.status = 200;
    return recyclingTips;
  } catch (err: any) {
    console.error("Error al obtener los Recycling Tips:", err);

    ctx.set.status = 500;
    return { message: err.message };
  }
};

// Obtener un tutorial por ID (con todos los detalles)
export const getRecyclingTipById = async (ctx: Context) => {
  try {
    const { id } = ctx.params;

    const recyclingTip = await RecyclingTip.findById(id);

    if (!recyclingTip) {
      ctx.set.status = 404;
      return { message: "Recycling Tip no encontrado" };
    }

    ctx.set.status = 200;
    return { message: "Recycling Tip obtenido correctamente", recyclingTip };
  } catch (err: any) {
    //console.error("Error al obtener el Recycling Tip:", err);

    ctx.set.status = 404;
    return { message: "Tip no escontrado" };
  }
};
