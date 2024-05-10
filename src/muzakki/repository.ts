import { prisma } from "../db";
import { TCreateMuzakki } from "../types";

export const findAllMuzakki = async () => {
  const muzakki = await prisma.pembayaran.findMany();

  return muzakki;
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
