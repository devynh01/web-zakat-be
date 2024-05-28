import { prisma } from "../db";
import { TCreateUser } from "../types";

export const findUserByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  return user;
};

export const insertNewUser = async (newUser: TCreateUser) => {
  const register = await prisma.user.create({
    data: {
      username: newUser.username,
      password: newUser.password,
      role: newUser.role,
    },
  });

  return register;
};
