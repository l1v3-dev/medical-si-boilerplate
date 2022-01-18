import { HeadCell } from "./../interfaces/table";
export const TABLE_COLUMNS = ["firstname", "lastname", "username"];

export const HEAD_CELLS: HeadCell[] = [
  {
    id: "firstname",
    numeric: false,
    disablePadding: true,
    label: "Dessert (100g serving)",
  },
  {
    id: "lastname",
    numeric: true,
    disablePadding: false,
    label: "Calories",
  },
  {
    id: "username",
    numeric: true,
    disablePadding: false,
    label: "Fat (g)",
  },
];
