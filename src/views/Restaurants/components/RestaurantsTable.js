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
  Typography,
  TablePagination,
  Button,
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

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

export const RestaurantsTable = (props) => {
  const { className, restaurants, ...rest } = props;
  const classes = useStyles();

  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    const { restaurants } = props;
    let selectedRestaurants;
    if (event.target.checked) {
      selectedRestaurants = restaurants.map((restaurant) => restaurant.id);
    } else {
      selectedRestaurants = [];
    }

    setSelectedRestaurants(selectedRestaurants);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedRestaurants.indexOf(id);
    let newSelectedRestaurants = [];

    if (selectedIndex === -1) {
      newSelectedRestaurants = newSelectedRestaurants.concat(
        selectedRestaurants,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedRestaurants = newSelectedRestaurants.concat(
        selectedRestaurants.slice(1)
      );
    } else if (selectedIndex === selectedRestaurants.length - 1) {
      newSelectedRestaurants = newSelectedRestaurants.concat(
        selectedRestaurants.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedRestaurants = newSelectedRestaurants.concat(
        selectedRestaurants.slice(0, selectedIndex),
        selectedRestaurants.slice(selectedIndex + 1)
      );
    }

    setSelectedRestaurants(newSelectedRestaurants);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={
                        selectedRestaurants.length === restaurants.length
                      }
                      color="primary"
                      indeterminate={
                        selectedRestaurants.length > 0 &&
                        selectedRestaurants.length < restaurants.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Capacidad</TableCell>
                  <TableCell>Horario de atención</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {restaurants.slice(0, rowsPerPage).map((restaurant) => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={restaurant.id}
                    selected={selectedRestaurants.indexOf(restaurant.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={
                          selectedRestaurants.indexOf(restaurant.id) !== -1
                        }
                        color="primary"
                        onChange={(event) =>
                          handleSelectOne(event, restaurant.id)
                        }
                        value="true"
                      />
                    </TableCell>
                    <TableCell>{restaurant.name}</TableCell>
                    <TableCell>{restaurant.description}</TableCell>
                    <TableCell>{restaurant.capacity}</TableCell>
                    <TableCell>{restaurant.businessHours}</TableCell>
                    <TableCell>
                      <EditIcon
                        onClick={() => console.log(`Editing ${restaurant}`)}
                      />{" "}
                      <DeleteIcon
                        onClick={() =>
                          console.log(
                            `Deleting restaurant with id: ${restaurant.id}`
                          )
                        }
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
          count={restaurants.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

RestaurantsTable.propTypes = {
  className: PropTypes.string,
  restaurants: PropTypes.array.isRequired,
};
