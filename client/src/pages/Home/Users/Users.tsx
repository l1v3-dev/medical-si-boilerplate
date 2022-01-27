import React, { FC, useState } from "react";
import { useQuery } from "@apollo/client";
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
import Spinner from "../../../components/Common/Spinner";
import { GET_ALL_USERS } from "../../../graphql/User/queries";
import { USER_HEAD_CELLS, USER_TABLE_COLUMNS } from "../../../constants/users";

interface IUsersProps {
  dense: boolean;
}

const Users: FC<IUsersProps> = (props) => {
  // const classes = useStyles();
  const { dense } = props;
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("firstname");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [headers] = useState(USER_HEAD_CELLS);
  const [cols] = useState(USER_TABLE_COLUMNS);

  const { loading, error, data: rows } = useQuery(GET_ALL_USERS, {
    variables: { pageSize, after: pageSize * page },
    onCompleted: (res) => {
      // ...
      console.log('!!result', res)
    },
    onError: (err) => {
      // ...
      console.log('!!err', err)
    }
  });
  if (loading) return <Spinner />;
  if (error) {
    console.log("!!err", error);
    return <p>Error :(</p>;
  }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    // if (event.target.checked) {
    //   const newSelecteds = rows.map((n) => n.name);
    //   setSelected(newSelecteds);
    //   return;
    // }
    // setSelected([]);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log('!!newPage', newPage)
    setPage(newPage);
  };

  const handleChangePageSize = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageSize(parseInt(event.target.value, 10));
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
              rowCount={rows.users.length}
            />
            {rows.users && (
              <CustomTableBody
                columns={cols}
                rows={rows.users}
                dense={true}
                page={page}
                rowsPerPage={pageSize}
                order={order}
                orderBy={orderBy}
                setSelected={setSelected}
              />
            )}
          </Table>
        </TableContainer>
        {rows.users && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.users.length}
            rowsPerPage={pageSize}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangePageSize}
          />
        )}
      </Paper>
    </Box>
  );
};

export default Users;
