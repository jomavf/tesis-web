import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/styles";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from "@material-ui/core";
import { DeleteDialog } from "../../../components/DeleteDialog";

import { useHistory } from "react-router-dom";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { useSnackbar } from "notistack";
import { SUCCESSFUL_OPERATION } from "../../../constants";

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1050,
  },
  nameContainer: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  actions: {
    justifyContent: "flex-end",
  },
}));

export const CheckInTable = ({
  className,
  items,
  setItems,
  requestItemDelete,
  requestItems,
  domainLabel,
  domain,
  ...rest
}) => {
  const history = useHistory();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [selectedItems, setSelectedItems] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);

  const handleSelectAll = (event) => {
    let selected;
    if (event.target.checked) {
      selected = items.map((item) => item.id);
    } else {
      selected = [];
    }

    setSelectedItems(selected);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedItems.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedItems, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedItems.slice(1));
    } else if (selectedIndex === selectedItems.length - 1) {
      newSelected = newSelected.concat(selectedItems.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedItems.slice(0, selectedIndex),
        selectedItems.slice(selectedIndex + 1)
      );
    }

    setSelectedItems(newSelected);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };

  return (
    <>
      <Card {...rest} className={clsx(classes.root, className)}>
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedItems.length === items.length}
                        color="primary"
                        indeterminate={
                          selectedItems.length > 0 &&
                          selectedItems.length < items.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>Huesped</TableCell>
                    <TableCell>Habitaciones</TableCell>
                    <TableCell>Fecha Inicio</TableCell>
                    <TableCell>Fecha Fin</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.slice(0, rowsPerPage).map((item) => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={item.id}
                      selected={selectedItems.indexOf(item.id) !== -1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedItems.indexOf(item.id) !== -1}
                          color="primary"
                          onChange={(event) => handleSelectOne(event, item.id)}
                          value="true"
                        />
                      </TableCell>

                      <TableCell>
                        {item["guest"]
                          ? item.guest.first_name + item.guest.last_name
                          : "No definido"}
                      </TableCell>
                      <TableCell>
                        {item[domain] ? item[domain].id : "No definido"}
                      </TableCell>
                      <TableCell>
                        {format(new Date(item.start_date), "PPpp", {
                          locate: es,
                        })}
                      </TableCell>
                      <TableCell>
                        {format(new Date(item.end_date), "PPpp", {
                          locate: es,
                        })}
                      </TableCell>
                      <TableCell>
                        <EditIcon
                          onClick={() =>
                            history.push(`/check-in/create`, {
                              [domain]: item,
                            })
                          }
                        />{" "}
                        <DeleteIcon
                          onClick={() => {
                            setOpenDeleteDialog(true);
                            setItemIdToDelete(item.id);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <CardActions className={classes.actions}>
          <TablePagination
            component="div"
            labelRowsPerPage={"Filas por página"}
            count={items.length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
      <DeleteDialog
        handleDeletion={async () => {
          try {
            if (!itemIdToDelete) {
              return;
            }

            let result = await requestItemDelete(itemIdToDelete);

            const { success, data = [] } = await requestItems();
            if (!success) {
              console.log("some error ocurred!");
            }
            setItems(data);
            enqueueSnackbar(SUCCESSFUL_OPERATION, { variant: "success" });
          } catch (error) {
            console.error("error while delelting!");
          }
        }}
        setOpen={setOpenDeleteDialog}
        open={openDeleteDialog}
      />
    </>
  );
};
