import { findUserByUsername } from "./repository";

export const getUserByUsername = async (username: string) => {
  const user = await findUserByUsername(username);

  return user;
};
