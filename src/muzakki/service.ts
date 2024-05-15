import { getPengurusByName } from "../data-pengurus/service";
import { TCreateMuzakki } from "../types";
import {
  deleteMuzakki,
  findAllMuzakki,
  findAllMuzakkiByYear,
  findMuzakkiById,
  insertMuzakki,
  updateMuzakki,
} from "./repository";

export const getAllMuzakki = async () => {
  const muzakki = await findAllMuzakki();

  if (!muzakki) {
    throw new Error("Tidak ada data muzakki");
  }

  return muzakki;
};

export const getAllMuzakkiByYear = async (year: number) => {
  const muzakki = await findAllMuzakkiByYear(year);

  return muzakki;
};

export const getMuzakkiById = async (id: number) => {
  const muzakki = await findMuzakkiById(id);

  if (!muzakki) {
    throw new Error("Tidak ada data id muzakki");
  }

  return muzakki;
};

export const createNewMuzakki = async (newMuzakki: TCreateMuzakki) => {
  const muzakki = await insertMuzakki(newMuzakki);

  return muzakki;
};

export const deleteMuzakkiById = async (id: number) => {
  await getMuzakkiById(id);

  const deletedMustahik = await deleteMuzakki(id);

  return deletedMustahik;
};

export const updateMuzakkiById = async (
  id: number,
  newMuzakki: TCreateMuzakki
) => {
  await getMuzakkiById(id);

  const isPengurusExist = await getPengurusByName(newMuzakki.pengurusName);
  if (!isPengurusExist) {
    throw new Error("Pengurus tidak ditemukan");
  }

  const updatedMustahik = await updateMuzakki(id, newMuzakki);

  return updatedMustahik;
};
