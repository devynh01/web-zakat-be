import { prisma } from "../db";
import { TCreateInfaq } from "../types";

export const findAllMunfiq = async () => {
  const munfiq = await prisma.infaq.findMany();

  const totalRice = await prisma.infaq.aggregate({
    _sum: {
      amountRice: true,
    },
  });

  const totalMoney = await prisma.infaq.aggregate({
    _sum: {
      amountMoney: true,
    },
  });

  return { munfiq, totalRice, totalMoney };
};

export const findAllMunfiqByYear = async (year: number) => {
  const munfiq = await prisma.infaq.findMany({
    where: {
      date: {
        gte: new Date(year, 0, 1),
        lte: new Date(year, 11, 31),
      },
    },
  });

  const totalRice = await prisma.infaq.aggregate({
    _sum: {
      amountRice: true,
    },
    where: {
      date: {
        gte: new Date(year, 0, 1),
        lte: new Date(year, 11, 31),
      },
    },
  });

  const totalMoney = await prisma.infaq.aggregate({
    _sum: {
      amountMoney: true,
    },
    where: {
      date: {
        gte: new Date(year, 0, 1),
        lte: new Date(year, 11, 31),
      },
    },
  });

  return { munfiq, totalRice, totalMoney };
};

export const findMunfiqById = async (id: number) => {
  const munfiq = await prisma.infaq.findUnique({
    where: {
      id,
    },
  });

  return munfiq;
};

export const insertMunfiq = async (newMunfiq: TCreateInfaq) => {
  const munfiq = await prisma.infaq.create({
    data: {
      name: newMunfiq.name,
      date: newMunfiq.date,
      amountRice: newMunfiq.amountRice,
      amountMoney: newMunfiq.amountMoney,
      notes: newMunfiq.notes,
      pengurusName: newMunfiq.pengurusName,
    },
  });

  return munfiq;
};

export const updateMunfiq = async (id: number, newMunfiq: TCreateInfaq) => {
  const munfiq = await prisma.infaq.update({
    where: {
      id,
    },
    data: {
      name: newMunfiq.name,
      date: newMunfiq.date,
      amountRice: newMunfiq.amountRice,
      amountMoney: newMunfiq.amountMoney,
      notes: newMunfiq.notes,
      pengurusName: newMunfiq.pengurusName,
    },
  });

  return munfiq;
};

export const deleteMunfiq = async (id: number) => {
  const munfiq = await prisma.infaq.delete({
    where: {
      id,
    },
  });

  return munfiq;
};
