import { prisma } from "../db";
import { TCreateMuzakki } from "../types";

export const findAllMuzakki = async () => {
  const muzakki = await prisma.pembayaran.findMany();

  const totalRice = await prisma.pembayaran.aggregate({
    _sum: {
      amountRice: true,
    },
  });

  const totalMoney = await prisma.pembayaran.aggregate({
    _sum: {
      amountMoney: true,
    },
  });

  return { muzakki, totalRice, totalMoney };
};

export const findAllMuzakkiByYear = async (year: number) => {
  const muzakki = await prisma.pembayaran.findMany({
    where: {
      paymentDate: {
        gte: new Date(year, 0, 1),
        lte: new Date(year, 11, 31),
      },
    },
  });

  const totalRice = await prisma.pembayaran.aggregate({
    _sum: {
      amountRice: true,
    },
    where: {
      paymentDate: {
        gte: new Date(year, 0, 1),
        lte: new Date(year, 11, 31),
      },
    },
  });

  const totalMoney = await prisma.pembayaran.aggregate({
    _sum: {
      amountMoney: true,
    },
    where: {
      paymentDate: {
        gte: new Date(year, 0, 1),
        lte: new Date(year, 11, 31),
      },
    },
  });

  return { muzakki, totalRice, totalMoney };
};

export const findMuzakkiById = async (id: number) => {
  const muzakki = await prisma.pembayaran.findUnique({
    where: {
      id,
    },
  });

  return muzakki;
};

export const insertMuzakki = async (newMuzakki: TCreateMuzakki) => {
  const muzakki = await prisma.pembayaran.create({
    data: {
      muzakkiName: newMuzakki.name,
      paymentDate: newMuzakki.paymentDate,
      amountRice: newMuzakki.amountRice,
      amountMoney: newMuzakki.amountMoney,
      notes: newMuzakki.notes,
      pengurusName: newMuzakki.pengurusName,
    },
  });

  return muzakki;
};

export const updateMuzakki = async (
  id: number,
  newMuzakki: TCreateMuzakki
) => {
  const muzakki = await prisma.pembayaran.update({
    where: {
      id,
    },
    data: {
      muzakkiName: newMuzakki.name,
      paymentDate: newMuzakki.paymentDate,
      amountRice: newMuzakki.amountRice,
      amountMoney: newMuzakki.amountMoney,
      notes: newMuzakki.notes,
      pengurusName: newMuzakki.pengurusName,
    },
  });

  return muzakki;
};

export const deleteMuzakki = async (id: number) => {
  const muzakki = await prisma.pembayaran.delete({
    where: {
      id,
    },
  });

  return muzakki;
};
