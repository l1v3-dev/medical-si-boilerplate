import React, { FC } from "react";
import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { DeleteOutlined, FilterListOutlined } from "@mui/icons-material";

interface ITableToolBarProps {
  tableTitle: string;
  numSelected: number;
}

const TableToolBar: FC<ITableToolBarProps> = (props) => {
  const { numSelected, tableTitle } = props;
  return (
    <Toolbar>
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {tableTitle}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteOutlined />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListOutlined />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default TableToolBar;
