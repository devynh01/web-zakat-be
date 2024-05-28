import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
interface UserData {
  username: string;
  role: string;
}
interface ValidationRequest extends Request {
  userData: UserData;
}

export const accessValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationReq = req as ValidationRequest;
  const { authorization } = validationReq.headers;

  if (!authorization) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const token = authorization.split(" ")[1];
  const secret = process.env.JWT_SECRET!;

  try {
    const jwtDecode = jwt.verify(token, secret);

    if (typeof jwtDecode !== "string") {
      validationReq.userData = jwtDecode as UserData;
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  next();
};
