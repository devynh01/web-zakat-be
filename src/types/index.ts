type TPengurus = {
  id?: string;
  name: string;
  DoB: Date;
  address: string;
};

export type TCreatePengurus = Omit<TPengurus, "id">;
