import React, { FC, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableContainer,
  TablePagination,
} from "@mui/material";
import CustomTableToolBar from "../../../components/Table/ToolBar";
import CustomTableHeader from "../../../components/Table/TableHead";
import CustomTableBody from "../../../components/Table/TableBody";
import { HeadCell, Data } from "../../../interfaces/table";
import { Order } from "../../../components/utils";

interface IUsersProps {
  dense: boolean;
  headers: HeadCell[];
  rows: Data[];
}

const Users: FC<IUsersProps> = (props) => {
  // const classes = useStyles();
  const { dense, headers, rows } = props;
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("calories");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<readonly string[]>([]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <CustomTableToolBar numSelected={selected.length} tableTitle="" />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <CustomTableHeader
              headerCells={headers}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <CustomTableBody
              rows={rows}
              dense={true}
              page={page}
              rowsPerPage={rowsPerPage}
              order={order}
              orderBy={orderBy}
              setSelected={setSelected}
            />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default Users;
