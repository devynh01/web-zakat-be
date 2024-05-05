import { prisma } from "../db";
import { TCreatePengurus } from "../types";

export const findAllPengurus = async () => {
  const pengurus = await prisma.pengurus.findMany();

  return pengurus;
};

export const findPengurusById = async (id: number) => {
  const pengurus = await prisma.pengurus.findUnique({
    where: {
      id,
    },
  });

  return pengurus;
};

export const findPengurusByName = async (name: string) => {
  const pengurus = await prisma.pengurus.findUnique({
    where: {
      name,
    },
  });

  return pengurus;
};

export const insertPengurus = async (newPengurus: TCreatePengurus) => {
  const pengurus = await prisma.pengurus.create({
    data: {
      name: newPengurus.name,
      DoB: newPengurus.DoB,
      address: newPengurus.address,
    },
  });

  return pengurus;
};

export const deletePengurus = async (id: number) => {
  const pengurus = await prisma.pengurus.delete({
    where: {
      id,
    },
  });

  return pengurus;
};

export const updatePengurus = async (
  id: number,
  newPengurus: TCreatePengurus
) => {
  const pengurus = await prisma.pengurus.update({
    where: {
      id,
    },
    data: {
      name: newPengurus.name,
      DoB: newPengurus.DoB,
      address: newPengurus.address,
    },
  });

  return pengurus;
};
