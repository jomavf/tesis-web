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
  Button,
} from "@material-ui/core";
import { DeleteDialog } from "../../../components/DeleteDialog";

import { useHistory } from "react-router-dom";

import { useSnackbar } from "notistack";
import { SUCCESSFUL_OPERATION } from "../../../constants";
import { requestInternetSuccessOrDenial } from "../service";

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

export const InternetRequestTable = ({
  className,
  items,
  setItems,
  requestItemDelete,
  requestItems,
  domain,
  getItems,
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

  const transformItem = (item, accepted) => {
    return {
      id: item.id,
      is_accepted: accepted,
      active: false,
      accepted_by: item.accepted_by,
      number_days: item.number_days,
      application_date: item.application_date,
      acceptance_date: item.acceptance_date,
      cancellation_date: item.cancellation_date,
      created_at: item.created_at,
      updated_at: item.updated_at,
      deleted_at: item.deleted_at,
      hsia_package_id: item.hsia_package_id,
      administrator_id: item.administrator_id,
      guest_id: item.guest_id,
    };
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
                    <TableCell>Id</TableCell>
                    <TableCell>Huesped</TableCell>
                    <TableCell>Paquete</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.slice(0, rowsPerPage).map((item, index) => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={item.id}
                      selected={selectedItems.indexOf(item.id) !== -1}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {item["guest"]
                          ? item.guest.first_name + item.guest.last_name
                          : "No definido"}
                      </TableCell>
                      <TableCell>
                        {item[domain] ? item[domain].name : "No definido"}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={async () => {
                            await requestInternetSuccessOrDenial(
                              transformItem(item, true)
                            );
                            await getItems();
                          }}
                          style={{ marginRight: "0.5rem" }}
                        >
                          Aceptar
                        </Button>

                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={async () => {
                            await requestInternetSuccessOrDenial(
                              transformItem(item, false)
                            );
                            await getItems();
                          }}
                        >
                          Denegar
                        </Button>
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
