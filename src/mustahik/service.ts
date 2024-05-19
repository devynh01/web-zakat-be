import { getPengurusByName } from "../data-pengurus/service";
import { TCreateMustahik } from "../types";
import {
  deleteMustahik,
  findAllMustahik,
  findAllMustahikByYear,
  findMustahikById,
  insertMustahik,
  updateMustahik,
} from "./repository";

export const getAllMustahik = async () => {
  const mustahik = await findAllMustahik();

  if (!mustahik) {
    throw new Error("Tidak ada data mustahik");
  }

  return mustahik;
};

export const getAllMustahikByYear = async (year: number) => {
  const mustahik = await findAllMustahikByYear(year);

  return mustahik;
};

export const getMustahikById = async (id: number) => {
  const mustahik = await findMustahikById(id);

  if (!mustahik) {
    throw new Error("Tidak ada data id mustahik");
  }

  return mustahik;
};

export const createNewMustahik = async (newMustahik: TCreateMustahik) => {
  const mustahik = await insertMustahik(newMustahik);

  return mustahik;
};

export const deleteMustahikById = async (id: number) => {
  await getMustahikById(id);

  const deletedMustahik = await deleteMustahik(id);

  return deletedMustahik;
};

export const updateMustahikById = async (
  id: number,
  newMustahik: TCreateMustahik
) => {
  await getMustahikById(id);

  const isPengurusExist = await getPengurusByName(newMustahik.pengurusName);
  if (!isPengurusExist) {
    throw new Error("Pengurus tidak ditemukan");
  }

  const updatedMustahik = await updateMustahik(id, newMustahik);

  return updatedMustahik;
};
