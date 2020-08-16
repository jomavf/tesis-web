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
import { requestDelete, requestGyms } from "../service";
import { DeleteDialog } from "../../../components/DeleteDialog";

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

export const GymsTable = ({ className, gyms, setGyms, ...rest }) => {
  const history = useHistory();
  const classes = useStyles();

  const [selectedGyms, setSelectedGyms] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [gymIdToDelete, setGymIdToDelete] = useState(null);

  const handleSelectAll = (event) => {
    let selectedGyms;
    if (event.target.checked) {
      selectedGyms = gyms.map((gym) => gym.id);
    } else {
      selectedGyms = [];
    }

    setSelectedGyms(selectedGyms);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedGyms.indexOf(id);
    let newSelectedGyms = [];

    if (selectedIndex === -1) {
      newSelectedGyms = newSelectedGyms.concat(selectedGyms, id);
    } else if (selectedIndex === 0) {
      newSelectedGyms = newSelectedGyms.concat(selectedGyms.slice(1));
    } else if (selectedIndex === selectedGyms.length - 1) {
      newSelectedGyms = newSelectedGyms.concat(selectedGyms.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedGyms = newSelectedGyms.concat(
        selectedGyms.slice(0, selectedIndex),
        selectedGyms.slice(selectedIndex + 1)
      );
    }

    setSelectedGyms(newSelectedGyms);
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
                        checked={selectedGyms.length === gyms.length}
                        color="primary"
                        indeterminate={
                          selectedGyms.length > 0 &&
                          selectedGyms.length < gyms.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Descripción</TableCell>
                    {/* <TableCell>Capacidad</TableCell>
                  {/* <TableCell>Horario de atención</TableCell> */}
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {gyms.slice(0, rowsPerPage).map((gym) => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={gym.id}
                      selected={selectedGyms.indexOf(gym.id) !== -1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedGyms.indexOf(gym.id) !== -1}
                          color="primary"
                          onChange={(event) => handleSelectOne(event, gym.id)}
                          value="true"
                        />
                      </TableCell>
                      <TableCell>{gym.name}</TableCell>
                      <TableCell>{gym.description}</TableCell>
                      <TableCell>
                        <EditIcon
                          onClick={() => history.push("/gyms/create", { gym })}
                        />{" "}
                        <DeleteIcon
                          onClick={() => {
                            setOpenDeleteDialog(true);
                            setGymIdToDelete(gym.id);
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
            count={gyms.length}
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
            if (!gymIdToDelete) {
              return;
            }
            let result = await requestDelete(gymIdToDelete);

            const { ok, data } = await requestGyms();
            if (!ok) {
              console.log("some error ocurred!");
            }
            setGyms(data);
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

GymsTable.propTypes = {
  className: PropTypes.string,
  gyms: PropTypes.array.isRequired,
};
