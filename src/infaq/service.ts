import { getPengurusByName } from "../data-pengurus/service";
import { TCreateInfaq } from "../types";
import {
  findAllMunfiq,
  deleteMunfiq,
  findMunfiqById,
  insertMunfiq,
  updateMunfiq,
} from "./repository";

export const getAllMunfiq = async () => {
  const munfiq = await findAllMunfiq();

  return munfiq;
};

export const getMunfiqById = async (id: number) => {
  const munfiq = await findMunfiqById(id);

  return munfiq;
};

export const createNewMunfiq = async (newMunfiq: TCreateInfaq) => {
  const munfiq = await insertMunfiq(newMunfiq);

  if (!munfiq) {
    throw new Error("Gagal menambahkan data munfiq");
  }

  return munfiq;
};

export const updateMunfiqById = async (id: number, newMunfiq: TCreateInfaq) => {
  await getMunfiqById(id);

  const isPengurusExist = await getPengurusByName(newMunfiq.pengurusName);
  if (!isPengurusExist) {
    throw new Error("Pengurus tidak ditemukan");
  }

  const munfiq = await updateMunfiq(id, newMunfiq);

  if (!munfiq) {
    throw new Error("Gagal mengupdate data munfiq");
  }

  return munfiq;
};

export const deleteMunfiqById = async (id: number) => {
  await getMunfiqById(id);

  const munfiq = await deleteMunfiq(id);

  if (!munfiq) {
    throw new Error("Gagal menghapus data munfiq");
  }

  return munfiq;
};
