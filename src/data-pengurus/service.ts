import { TCreatePengurus } from "../types";
import {
  findAllPengurus,
  findPengurusById,
  findPengurusByName,
  insertPengurus,
  deletePengurus,
  updatePengurus,
} from "./repository";

export const getAllPengurus = async () => {
  const pengurus = await findAllPengurus();

  if (!pengurus) {
    throw new Error("Tidak ada data pengurus");
  }

  return pengurus;
};

export const getPengurusById = async (id: number) => {
  const pengurus = await findPengurusById(id);

  if (!pengurus) {
    throw new Error("Tidak ada data id pengurus");
  }

  return pengurus;
};

export const getPengurusByName = async (name: string) => {
  const pengurus = await findPengurusByName(name);

  // if (!pengurus) {
  //   throw new Error("Tidak ada data nama pengurus");
  // }

  return pengurus;
};

export const createNewPengurus = async (newPengurus: TCreatePengurus) => {
  const pengurus = await insertPengurus(newPengurus);

  return pengurus;
};

export const deletePengurusById = async (id: number) => {
  await getPengurusById(id);

  const deletedPengurus = await deletePengurus(id);

  return deletedPengurus;
};

export const updatePengurusById = async (
  id: number,
  newPengurus: TCreatePengurus
) => {
  await getPengurusById(id);

  const updatedPengurus = await updatePengurus(id, newPengurus);

  return updatedPengurus;
};
