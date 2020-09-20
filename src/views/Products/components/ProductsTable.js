import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/styles";
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

import { useHistory } from "react-router-dom";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { requestDelete, requestItems } from "../service";
import { DeleteDialog } from "../../../components/DeleteDialog";

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

export const ProductsTable = ({ className, items, setItems, ...rest }) => {
  const history = useHistory();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const domain = "product";

  const [selectedItems, setSelectedItems] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);

  const handleSelectAll = (event) => {
    let selectedItems;
    if (event.target.checked) {
      selectedItems = items.map((item) => item.id);
    } else {
      selectedItems = [];
    }

    setSelectedItems(selectedItems);
  };

  const handleSelectOne = (item, id) => {
    const selectedIndex = selectedItems.indexOf(id);
    let newSelectedItems = [];

    if (selectedIndex === -1) {
      newSelectedItems = newSelectedItems.concat(selectedItems, id);
    } else if (selectedIndex === 0) {
      newSelectedItems = newSelectedItems.concat(selectedItems.slice(1));
    } else if (selectedIndex === selectedItems.length - 1) {
      newSelectedItems = newSelectedItems.concat(selectedItems.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedItems = newSelectedItems.concat(
        selectedItems.slice(0, selectedIndex),
        selectedItems.slice(selectedIndex + 1)
      );
    }

    setSelectedItems(newSelectedItems);
  };

  const handlePageChange = (item, page) => {
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
                    <TableCell>Nombre</TableCell>
                    <TableCell>Descripción</TableCell>
                    <TableCell>Precio</TableCell>
                    <TableCell>Cantidad</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Categoria</TableCell>
                    {/* <TableCell>Capacidad</TableCell>
                  {/* <TableCell>Horario de atención</TableCell> */}
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
                          onChange={(itemSelected) =>
                            handleSelectOne(itemSelected, item.id)
                          }
                          value="true"
                        />
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.has_stock ? "Si" : "No"}</TableCell>
                      <TableCell>
                        {item.category ? item.category.name : "Ninguna"}
                      </TableCell>
                      <TableCell>
                        <EditIcon
                          onClick={() =>
                            history.push(`/${domain}s/create`, {
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
            count={items.length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            labelRowsPerPage={"Filas por página"}
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
            let result = await requestDelete(itemIdToDelete);

            const { ok, data } = await requestItems();
            if (!ok) {
              console.log("some error ocurred!");
            }
            setItems(data);
            enqueueSnackbar(SUCCESSFUL_OPERATION, {
              variant: "success",
            });
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
