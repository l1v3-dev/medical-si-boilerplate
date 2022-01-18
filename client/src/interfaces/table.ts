export interface Data {
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}
