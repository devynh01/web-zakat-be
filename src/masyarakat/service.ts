import { TCreateMasyarakat, typeMasyarakat } from "../types";
import {
  findAllMasyarakat,
  deleteMasyarakat,
  findMasyarakatById,
  insertMasyarakat,
  updateMasyarakat,
} from "./repository";

export const getAllMasyarakat = async () => {
  const masyarakat = await findAllMasyarakat();

  return masyarakat;
};

export const getMasyarakatById = async (id: number) => {
  const masyarakat = await findMasyarakatById(id);

  return masyarakat;
};

export const createMasyarakat = async (newMasyarakat: TCreateMasyarakat) => {
  const masyarakat = await insertMasyarakat(newMasyarakat);

  if (!masyarakat) {
    throw new Error("Gagal menambahkan data masyarakat");
  }

  return masyarakat;
};

export const updateMasyarakatById = async (
  id: number,
  newMasyarakat: TCreateMasyarakat
) => {
  await getMasyarakatById(id);

  const masyarakat = await updateMasyarakat(id, newMasyarakat);

  if (!masyarakat) {
    throw new Error("Gagal mengupdate data masyarakat");
  }

  return masyarakat;
};

export const deleteMasyarakatById = async (id: number) => {
  await getMasyarakatById(id);

  const masyarakat = await deleteMasyarakat(id);

  if (!masyarakat) {
    throw new Error("Gagal menghapus data masyarakat");
  }

  return masyarakat;
};
