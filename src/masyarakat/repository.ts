import { prisma } from "../db";
import { TCreateMasyarakat } from "../types";

export const findAllMasyarakat = async () => {
  const masyarakat = await prisma.masyarakat.findMany();

  return masyarakat;
};

export const findMasyarakatById = async (id: number) => {
  const masyarakat = await prisma.masyarakat.findUnique({
    where: {
      id,
    },
  });

  return masyarakat;
};

export const insertMasyarakat = async (newMasyarakat: TCreateMasyarakat) => {
  const masyarakat = await prisma.masyarakat.create({
    data: {
      name: newMasyarakat.name,
      address: newMasyarakat.address,
      DoB: newMasyarakat.DoB,
      type: newMasyarakat.type,
      PoB: newMasyarakat.PoB,
      phone: newMasyarakat.phone,
      job: newMasyarakat.job,
    },
  });

  return masyarakat;
};

export const updateMasyarakat = async (
  id: number,
  newMasyarakat: TCreateMasyarakat
) => {
  const masyarakat = await prisma.masyarakat.update({
    where: {
      id,
    },
    data: {
      name: newMasyarakat.name,
      address: newMasyarakat.address,
      DoB: newMasyarakat.DoB,
      type: newMasyarakat.type,
      PoB: newMasyarakat.PoB,
      phone: newMasyarakat.phone,
      job: newMasyarakat.job,
    },
  });

  return masyarakat;
};

export const deleteMasyarakat = async (id: number) => {
  const masyarakat = await prisma.masyarakat.delete({
    where: {
      id,
    },
  });

  return masyarakat;
};
