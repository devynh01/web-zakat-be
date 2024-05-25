import { Request, Response, Router } from "express";
import { TCreateUser } from "../types";
import { createNewUser, getUserByUsername } from "./service";
import bcrypt from "bcrypt";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { username, password, role } = req.body as TCreateUser;

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await getUserByUsername(username);
    if (user?.username === username) {
      return res.status(400).json({
        success: false,
        message: "Username sudah ada",
      });
    }

    const result = await createNewUser({
      username,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "Berhasil menambahkan user baru",
      data: {
        username,
        role,
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
