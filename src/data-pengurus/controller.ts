import { Request, Response, Router } from "express";
import {
  createNewPengurus,
  deletePengurusById,
  getAllPengurus,
  getPengurusById,
  getPengurusByName,
  updatePengurusById,
} from "./service";
import { TCreatePengurus } from "../types";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await getAllPengurus();
    if (!result.length) {
      return res.status(404).json({
        success: false,
        message: "Data pengurus tidak ditemukan",
        data: null,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Berhasil menampilkan semua pengurus",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const result = await getPengurusById(id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Data pengurus tidak ditemukan",
        data: null,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Berhasil menemukan pengurus",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const newPengurus = req.body as TCreatePengurus;
  try {
    const isNameAlreadyExist = await getPengurusByName(newPengurus.name);
    if (isNameAlreadyExist) {
      return res.status(400).json({
        success: false,
        message: "Nama pengurus sudah ada",
      });
    }

    const result = await createNewPengurus(newPengurus);
    return res.status(201).json({
      success: true,
      message: "Berhasil menambahkan pengurus baru",
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
    await deletePengurusById(id);
    return res.status(200).json({
      success: true,
      message: "Berhasil menghapus pengurus",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const newPengurus = req.body;
  try {
    const isPengurusExist = await getPengurusById(id);
    if (!isPengurusExist) {
      return res.status(404).json({
        success: false,
        message: "Pengurus tidak ditemukan",
      });
    }

    const result = await updatePengurusById(id, newPengurus);
    return res.status(200).json({
      success: true,
      message: "Berhasil mengupdate pengurus",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
