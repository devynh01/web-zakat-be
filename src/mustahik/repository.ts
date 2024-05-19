import { prisma } from "../db";
import { TCreateMustahik } from "../types";

export const findAllMustahik = async () => {
  const mustahik = await prisma.penyaluran.findMany();

  const totalRice = await prisma.penyaluran.aggregate({
    _sum: {
      amountRice: true,
    },

    _count: {
      amountRice: true,
    },

    where: {
      amountRice: { not: 0 },
    },
  });

  const totalMoney = await prisma.penyaluran.aggregate({
    _sum: {
      amountMoney: true,
    },

    _count: {
      amountMoney: true,
    },

    where: {
      amountMoney: { not: 0 },
    },
  });

  return { mustahik, totalRice, totalMoney };
};

export const findAllMustahikByYear = async (year: number) => {
  const mustahik = await prisma.penyaluran.findMany({
    where: {
      distributionDate: {
        gte: new Date(year, 0, 1),
        lte: new Date(year, 11, 31),
      },
    },
  });

  const totalRice = await prisma.penyaluran.aggregate({
    _sum: {
      amountRice: true,
    },

    _count: {
      amountRice: true,
    },
    where: {
      distributionDate: {
        gte: new Date(year, 0, 1),
        lte: new Date(year, 11, 31),
      },

      amountRice: { not: 0 },
    },
  });

  const totalMoney = await prisma.penyaluran.aggregate({
    _sum: {
      amountMoney: true,
    },

    _count: {
      amountMoney: true,
    },

    where: {
      distributionDate: {
        gte: new Date(year, 0, 1),
        lte: new Date(year, 11, 31),
      },

      amountMoney: { not: 0 },
    },
  });

  return { mustahik, totalRice, totalMoney };
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
