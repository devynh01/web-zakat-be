import { Request, Response, Router } from "express";
import {
  createNewMunfiq,
  deleteMunfiqById,
  getAllMunfiq,
  getMunfiqById,
  updateMunfiqById,
} from "./service";
import { TCreateInfaq } from "../types";
import { getPengurusByName } from "../data-pengurus/service";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await getAllMunfiq();

    if (!result.length) {
      return res.status(404).json({
        success: false,
        message: "Data munfiq tidak ditemukan",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Berhasil menampilkan semua munfiq",
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const result = await getMunfiqById(id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Data id munfiq tidak ditemukan",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Berhasil menemukan id munfiq",
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const newInfaq = req.body as TCreateInfaq;

  try {
    const isPengurusExist = await getPengurusByName(newInfaq.pengurusName);
    if (!isPengurusExist) {
      return res.status(404).json({
        success: false,
        message: "Pengurus tidak ditemukan",
      });
    }

    const result = await createNewMunfiq(newInfaq);
    return res.status(201).json({
      success: true,
      message: "Berhasil menambahkan munfiq baru",
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const newInfaq = req.body;

  try {
    const result = await updateMunfiqById(id, newInfaq);
    return res.status(200).json({
      success: true,
      message: "Berhasil mengupdate munfiq",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await deleteMunfiqById(id);
    return res.status(200).json({
      success: true,
      message: "Berhasil menghapus munfiq",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
