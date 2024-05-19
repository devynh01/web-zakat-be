import { Request, Response, Router } from "express";
import { getLaporanByYear } from "./service";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const { year } = req.query;

  try {
    if (!year) {
      return res.status(400).json({
        success: false,
        message: "Tahun tidak boleh kosong",
        data: null,
      });
    }

    const result = await getLaporanByYear(Number(year));

    if (!result) {
      return res.status(404).json({
        success: false,
        message: `Laporan pada tahun ${year} tidak ditemukan`,
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Berhasil menemukan laporan pada tahun ${year}`,
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

export default router;
