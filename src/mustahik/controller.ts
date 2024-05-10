import { Request, Response, Router } from "express";
import {
  getAllMustahik,
  getMustahikById,
  createNewMustahik,
  deleteMustahikById,
  updateMustahikById,
} from "./service";
import { TCreateMustahik } from "../types";
import { getPengurusByName } from "../data-pengurus/service";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await getAllMustahik();

    if (!result.length) {
      return res.status(404).json({
        success: false,
        message: "Data mustahik tidak ditemukan",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Berhasil menampilkan semua mustahik",
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
    const result = await getMustahikById(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Data Mustahik tidak ditemukan",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Berhasil menemukan mustahik",
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
  const newMustahik = req.body as TCreateMustahik;

  try {
    const isPengurusExist = await getPengurusByName(newMustahik.pengurusName);
    if (!isPengurusExist) {
      return res.status(404).json({
        success: false,
        message: "Pengurus tidak ditemukan",
      });
    }

    const result = await createNewMustahik(newMustahik);

    return res.status(201).json({
      success: true,
      message: "Berhasil menambahkan mustahik baru",
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
    await deleteMustahikById(id);
    return res.status(200).json({
      success: true,
      message: "Berhasil menghapus mustahik",
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
  const newMustahik = req.body;

  try {
    const result = await updateMustahikById(id, newMustahik);

    return res.status(200).json({
      success: true,
      message: "Berhasil mengupdate mustahik",
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
