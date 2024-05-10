import { prisma } from "../db";
import { TCreateMustahik } from "../types";

export const findAllMustahik = async () => {
  const mustahik = await prisma.penyaluran.findMany();

  return mustahik;
};

export const findMustahikById = async (id: number) => {
  const mustahik = await prisma.penyaluran.findUnique({
    where: {
      id,
    },
  });

  return mustahik;
};

export const insertMustahik = async (newMustahik: TCreateMustahik) => {
  const mustahik = await prisma.penyaluran.create({
    data: {
      mustahikName: newMustahik.name,
      distributionDate: newMustahik.distributionDate,
      amountRice: newMustahik.amountRice,
      amountMoney: newMustahik.amountMoney,
      notes: newMustahik.notes,
      pengurusName: newMustahik.pengurusName,
    },
  });

  return mustahik;
};

export const updateMustahik = async (
  id: number,
  newMustahik: TCreateMustahik
) => {
  const mustahik = await prisma.penyaluran.update({
    where: {
      id,
    },
    data: {
      mustahikName: newMustahik.name,
      distributionDate: newMustahik.distributionDate,
      amountRice: newMustahik.amountRice,
      amountMoney: newMustahik.amountMoney,
      notes: newMustahik.notes,
      pengurusName: newMustahik.pengurusName,
    },
  });

  return mustahik;
};

export const deleteMustahik = async (id: number) => {
  const mustahik = await prisma.penyaluran.delete({
    where: {
      id,
    },
  });

  return mustahik;
};
