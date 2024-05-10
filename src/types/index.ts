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

export type TCreateMustahik = Omit<TMustahik, "id">;

export type TCreatePengurus = Omit<TPengurus, "id">;
