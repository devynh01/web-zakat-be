import { prisma } from "../db";
import { TCreateInfaq } from "../types";

export const findAllMunfiq = async () => {
  const munfiq = await prisma.infaq.findMany();

  return munfiq;
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
