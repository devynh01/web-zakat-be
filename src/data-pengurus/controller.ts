import { Request, Response, Router } from "express";
import {
  createNewPengurus,
  deletePengurusById,
  getAllPengurus,
  getPengurusById,
  getPengurusByName,
  updatePengurusById,
} from "./service";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await getAllPengurus();
    if (!result.length) {
      res.status(404).json({
        success: false,
        message: "Data pengurus tidak ditemukan",
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "Berhasil menampilkan semua pengurus",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan",
      data: error.message,
    });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const newPengurus = req.body;
  try {
    const isNameAlreadyExist = await getPengurusByName(newPengurus.name);
    if (isNameAlreadyExist) {
      res.status(400).json({
        success: false,
        message: "Nama pengurus sudah ada",
      });
    }

    const result = await createNewPengurus(newPengurus);
    res.status(201).json({
      success: true,
      message: "Berhasil menambahkan pengurus baru",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan",
      data: error.message,
    });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await deletePengurusById(id);
    res.status(200).json({
      success: true,
      message: "Berhasil menghapus pengurus",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan",
      data: error.message,
    });
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const newPengurus = req.body;
  try {
    const isPengurusExist = await getPengurusById(id);
    if (!isPengurusExist) {
      res.status(404).json({
        success: false,
        message: "Pengurus tidak ditemukan",
      });
    }

    const result = await updatePengurusById(id, newPengurus);
    res.status(200).json({
      success: true,
      message: "Berhasil mengupdate pengurus",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan",
      data: error.message,
    });
  }
});

export default router;
