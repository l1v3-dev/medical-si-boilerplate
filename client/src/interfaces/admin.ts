export interface IUser {
  _id?: string;
  firstname: string;
  lastname: string;
  username: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface INote {
  _id?: string;
  value: number;
  fromID: string | IUser;
  toID: string | IUser;
}
