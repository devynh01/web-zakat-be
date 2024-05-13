type TPengurus = {
  id?: string;
  name: string;
  DoB: Date;
  address: string;
};

type TMustahik = {
  id?: number;
  name: string;
  distributionDate: Date;
  amountRice: number;
  amountMoney: number;
  notes: string;

  pengurusName: TPengurus["name"]; // foreign key
};

type TMuzakki = {
  id?: number;
  name: string;
  paymentDate: Date;
  amountRice: number;
  amountMoney: number;
  notes: string;

  pengurusName: TPengurus["name"]; // foreign key
};

type TInfaq = {
  id?: number;
  name: string;
  date: Date;
  amountRice: number;
  amountMoney: number;
  notes: string;

  pengurusName: TPengurus["name"]; // foreign key
};

type TMasyarakat = {
  id: number;
  name: string;
  DoB: Date;
  PoB: string;
  job: string;
  type: typeMasyarakat;

  phone: string;
  address: string;
};

export enum typeMasyarakat {
  MUZAKKI = "MUZAKKI",
  MUSTAHIK = "MUSTAHIK",
}

export type TCreateMasyarakat = Omit<TMasyarakat, "id">;

export type TCreateInfaq = Omit<TInfaq, "id">;

export type TCreateMustahik = Omit<TMustahik, "id">;

export type TCreateMuzakki = Omit<TMuzakki, "id">;

export type TCreatePengurus = Omit<TPengurus, "id">;
