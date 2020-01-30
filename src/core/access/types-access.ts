export interface Spot {
  spot_id: string;
  spot_name: string;
  spot_adress: string;
  storages: Storage[];
}

export interface Storage {
  storage_id: number;
  storage_name: string;
  storage_adress: string;
}
