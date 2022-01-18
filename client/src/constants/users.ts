import { HeadCell } from "./../interfaces/table";

export const USER_HEAD_CELLS: HeadCell[] = [
  {
    id: "firstname",
    numeric: false,
    disablePadding: true,
  },
  {
    id: "lastname",
    numeric: false,
    disablePadding: false,
  },
  {
    id: "username",
    numeric: false,
    disablePadding: false,
  },
];

export const USER_TABLE_COLUMNS = USER_HEAD_CELLS.map(c => c.id)
