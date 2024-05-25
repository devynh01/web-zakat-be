import { Role, TCreateUser } from "../types";
import { findUserByUsername, insertNewUser } from "./repository";

export const createNewUser = async (newUser: TCreateUser) => {
  const user = await insertNewUser(newUser);

  if (!user) {
    throw new Error("Gagal menambahkan data user");
  }

  if (user.role !== Role.ADMIN && user.role !== Role.DKM) {
    throw new Error("Gagal menambahkan data user");
  }

  return user;
};

export const getUserByUsername = async (username: string) => {
  const user = await findUserByUsername(username);

  if (user?.username === username) {
    throw new Error("Username sudah ada");
  }

  return user;
};
