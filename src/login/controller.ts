import { Request, Response, Router } from "express";
import { TLogin } from "../types";
import bcrypt from "bcrypt";
import { getUserByUsername } from "./service";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body as TLogin;

  try {
    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({
        success: false,
        message: "Password tidak sesuai",
      });
    }

    const payload = {
      username: user.username,
      role: user.role,
    };

    const secret = process.env.JWT_SECRET;

    const ONEDAY = "24h";

    const expiresIn = ONEDAY;

    const token = jwt.sign(payload, secret!, {
      expiresIn,
    });
    res.cookie("token", token, { httpOnly: true });

    return res.status(201).json({
      success: true,
      message: "Berhasil login",
      data: {
        id: user.uuid,
        username: user.username,
        role: user.role,
        token,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
