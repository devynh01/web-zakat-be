import { Request, Response, Router } from "express";
import {
  createNewMuzakki,
  deleteMuzakkiById,
  getAllMuzakki,
  getMuzakkiById,
  updateMuzakkiById,
} from "./service";
import { TCreateMuzakki } from "../types";
import { getPengurusByName } from "../data-pengurus/service";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await getAllMuzakki();

    if (!result.length) {
      return res.status(404).json({
        success: false,
        message: "Data muzakki tidak ditemukan",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Berhasil menampilkan semua muzakki",
      data: result,
    });
  } catch (error: any) {
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
    const result = await getMuzakkiById(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Data Muzakki tidak ditemukan",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Berhasil menemukan muzakki",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const newMuzakki = req.body as TCreateMuzakki;

  try {
    const isPengurusExist = await getPengurusByName(newMuzakki.pengurusName);
    if (!isPengurusExist) {
      return res.status(404).json({
        success: false,
        message: "Pengurus tidak ditemukan",
      });
    }

    const result = await createNewMuzakki(newMuzakki);

    return res.status(201).json({
      success: true,
      message: "Berhasil menambahkan muzakki baru",
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

router.delete("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await deleteMuzakkiById(id);
    return res.status(200).json({
      success: true,
      message: "Berhasil menghapus muzakki",
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
  const newMuzakki = req.body;

  try {
    const result = await updateMuzakkiById(id, newMuzakki);

    return res.status(200).json({
      success: true,
      message: "Berhasil mengupdate muzakki",
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
