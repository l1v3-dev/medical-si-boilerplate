import React, { FC, useState } from 'react'
import { Checkbox, TableBody, TableCell, TableRow } from '@mui/material'
import { Data } from '../../../interfaces/table'
import { getComparator, Order } from '../../utils'

interface ICustomTableBodyProps {
  rows: Data[]
  columns: String[]
  dense: boolean
  page: number
  rowsPerPage: number
  order: Order
  orderBy: keyof Data
  setSelected: (item: readonly string[]) => void
}

const CustomTableBody: FC<ICustomTableBodyProps> = (props) => {
  const {
    rows,
    dense,
    columns,
    page,
    rowsPerPage,
    order,
    orderBy,
    setSelected,
  } = props

  const [selected] = useState<readonly string[]>([])

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const formatDataForDisplay = (data: Data[]): Data[] =>
    data
      .slice()
      .sort(getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <TableBody>
      {formatDataForDisplay(rows).map((row, index) => {
        const isItemSelected = isSelected(row._id)
        const labelId = `custom-table-checkbox-${index}`

        return (
          <TableRow
            hover
            onClick={(event) => handleClick(event, row._id)}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={index}
            selected={isItemSelected}
          >
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                checked={isItemSelected}
                inputProps={{
                  'aria-labelledby': labelId,
                }}
              />
            </TableCell>
            {columns.map((key, index) => (
              <TableCell align="right" key={index}>
                {/* @ts-ignore */}
                {row[key]}
              </TableCell>
            ))}
          </TableRow>
        )
      })}
      {emptyRows > 0 && (
        <TableRow
          style={{
            height: (dense ? 33 : 53) * emptyRows,
          }}
        >
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  )
}

export default CustomTableBody
