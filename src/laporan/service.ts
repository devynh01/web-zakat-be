import { findAllPengurus } from "../data-pengurus/repository";
import { findAllMunfiqByYear } from "../infaq/repository";
import { findAllMasyarakat } from "../masyarakat/repository";
import { findAllMustahikByYear } from "../mustahik/repository";
import { findAllMuzakkiByYear } from "../muzakki/repository";

export const getLaporanByYear = async (year: number) => {
  const pengurus = await findAllPengurus();
  const masyarakat = await findAllMasyarakat();
  const munfiq = await findAllMunfiqByYear(Number(year));
  const mustahik = await findAllMustahikByYear(Number(year));
  const muzakki = await findAllMuzakkiByYear(Number(year));

  if (!munfiq || !mustahik || !muzakki) {
    throw new Error("Tidak ada data laporan");
  }

  const totalMoneyMuzakki = muzakki.totalMoney._sum.amountMoney; // total uang muzakki (pembayar zakat)
  const muzakkiByMoney = muzakki.totalMoney._count.amountMoney; // total muzakki yang zakat uang
  const totalRiceMuzakki = muzakki.totalRice._sum.amountRice; // total beras muzakki (pembayar zakat)
  const muzakkiByRice = muzakki.totalRice._count.amountRice; // total muzakki yang zakat beras

  const totalMuzakki = muzakki.totalMuzakki; // total muzakki

  const totalMoneyInfaq = munfiq.totalMoney._sum.amountMoney; // total uang munfiq (pembayar infaq)

  const totalMunfiq = munfiq.totalMunfiq; // total munfiq

  const totalDonatur = totalMuzakki + totalMunfiq; // total donatur
  const totalMoneyPembayar = totalMoneyMuzakki! + totalMoneyInfaq!; // total uang pembayar

  const totalMoneyMustahik = mustahik.totalMoney._sum.amountMoney; // total uang mustahik (penyaluran zakat)
  const mustahikByMoney = mustahik.totalMoney._count.amountMoney; // total mustahik yang diberi uang
  const totalRiceMustahik = mustahik.totalRice._sum.amountRice; // total beras mustahik (penyaluran zakat)
  const mustahikByRice = mustahik.totalRice._count.amountRice; // total mustahik yang diberi beras

  const totalMustahik = mustahik.totalMustahik; // total penerima

  const totalPengurus = pengurus.length; // total pengurus
  const totalMasyarakat = masyarakat.length; // total masyarakat

  // const moneyForAmil = totalMoneyMuzakki! * 0.05; // beban amil 5% dari total uang muzakki
  // const riceForAmil = totalRiceMuzakki! * 0.05; // beban amil 5% dari total beras muzakki

  const totalPenerima = totalMustahik; // total penerima
  // const totalPenyaluranMoney = moneyForAmil + totalMoneyMustahik!; // total uang penyaluran
  const totalPenyaluranMoney = totalMoneyMustahik!; // total uang penyaluran
  // const totalPenyaluranRice = riceForAmil + totalRiceMustahik!; // total beras penyaluran
  const totalPenyaluranRice = totalRiceMustahik!; // total beras penyaluran

  const saldoMoney = totalMoneyPembayar! - totalPenyaluranMoney!; // saldo uang
  const saldoRice = totalRiceMuzakki! - totalPenyaluranRice!; // saldo beras

  const penerimaan = {
    muzakki: {
      uang: {
        total: totalMoneyMuzakki,
        pembayar: muzakkiByMoney,
      },
      beras: {
        total: totalRiceMuzakki,
        pembayar: muzakkiByRice,
      },
      total: totalMuzakki,
    },
    munfiq: {
      uang: {
        total: totalMoneyInfaq,
      },
      total: totalMunfiq,
    },
    total: {
      pembayar: totalDonatur,
      uang: totalMoneyPembayar,
      beras: totalRiceMuzakki,
    },
  };

  const penyaluran = {
    mustahik: {
      uang: {
        total: totalMoneyMustahik,
        penerima: mustahikByMoney,
      },
      beras: {
        total: totalRiceMustahik,
        penerima: mustahikByRice,
      },
      total: totalMustahik,
    },
    pengurus: {
      // uang: {
      //   total: moneyForAmil,
      // },
      // beras: {
      //   total: riceForAmil.toFixed(2),
      // },
      total: totalPengurus,
    },
    total: {
      penerima: totalPenerima,
      uang: totalPenyaluranMoney,
      beras: totalPenyaluranRice,
    },
  };

  return {
    penerimaan,
    penyaluran,
    totalPengurus,
    totalMasyarakat,
    totalSaldoUang: saldoMoney,
    totalSaldoBeras: saldoRice,
    year,
  };
};
