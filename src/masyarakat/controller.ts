import { Request, Response, Router } from "express";

import {
  createMasyarakat,
  deleteMasyarakatById,
  getAllMasyarakat,
  getMasyarakatById,
  updateMasyarakatById,
} from "./service";
import { TCreateMasyarakat } from "../types";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await getAllMasyarakat();

    if (!result.length) {
      return res.status(404).json({
        success: false,
        message: "Data masyarakat tidak ditemukan",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Berhasil menemukan semua masyarakat",
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
    const result = await getMasyarakatById(id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Data id masyarakat tidak ditemukan",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Berhasil menemukan id masyarakat",
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
  const newMasyarakat = req.body as TCreateMasyarakat;

  try {
    const result = await createMasyarakat(newMasyarakat);

    return res.status(201).json({
      success: true,
      message: "Berhasil menambahkan masyarakat baru",
      data: result,
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
  const newMasyarakat = req.body;

  try {
    const result = await updateMasyarakatById(id, newMasyarakat);

    return res.status(200).json({
      success: true,
      message: "Berhasil mengupdate data masyarakat",
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
    await deleteMasyarakatById(id);
    return res.status(200).json({
      success: true,
      message: "Berhasil menghapus data masyarakat",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
