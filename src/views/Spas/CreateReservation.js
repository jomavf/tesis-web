import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { SUCCESSFUL_OPERATION } from "../../constants";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { requestCreateOrUpdateReservation, requestItems } from "./service";
import { requestGuests } from "../../API";

const useStyles = makeStyles(() => ({
  root: {},
}));

export const CreateReservation = ({
  name = "",
  className,
  location,
  ...rest
}) => {
  const requestCreateOrUpdate = requestCreateOrUpdateReservation;
  const requestDomainList = requestItems;
  const domainId = "spa_id";
  const domain = "spa";
  const domainLabel = "Spa";

  const reservation = location.state != null ? location.state[domain] : null;
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [guests, setGuests] = useState([]);
  const [domainList, setDomainList] = useState([]);

  const [data, setData] = useState(
    reservation != null
      ? {
          id: reservation.id,
          guest_id: reservation.guest_id,
          description: reservation.description,
          [domainId]: reservation.restaurant_id,
          start_time: reservation.start_time.substr(0, 16),
          end_time: reservation.end_time.substr(0, 16),
        }
      : {
          guest_id: null,
          description: "",
          [domainId]: "",
          start_time: new Date().toISOString().substr(0, 16),
          end_time: new Date().toISOString().substr(0, 16),
        }
  );

  const [errors, setErrors] = useState({
    guest_id: null,
    description: null,
    [domainId]: null,
    start_time: null,
    end_time: null,
  });

  const handleChange = (event, pvalue = null, pname = null) => {
    const value = pvalue || event.target.value;
    const name = pname || event.target.name;
    setData((d) => ({ ...d, [name]: value }));
  };

  const validateFields = () => {
    const requiredLabel = "El campo es requerido";
    let isValid = true;
    Object.entries(data).forEach((d) => {
      const key = d[0];
      const value = d[1];
      if (value == null || value === "") {
        setErrors((errors) => ({ ...errors, [key]: requiredLabel }));
        isValid = false;
      }
    });
    return isValid;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateFields();
    if (!isValid) return;
    try {
      const result = await requestCreateOrUpdate({
        ...data,
      });
      if (result.success) {
        history.push(`/${domain}s/reservations`);
        enqueueSnackbar(SUCCESSFUL_OPERATION, { variant: "success" });
      }
    } catch (error) {
      console.log("some error ocurred!", error);
    }
  };

  const requestComboBoxItems = async () => {
    try {
      const guestsResponse = await requestGuests();
      setGuests(guestsResponse.data);
      const domainListResponse = await requestDomainList();
      setDomainList(domainListResponse.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    requestComboBoxItems();
  }, []);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete="off" onSubmit={onSubmit}>
        <CardHeader
          subheader="La información puede ser editada posteriar a la creación"
          title="Agregar nueva reserva"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                label="Descripcion"
                name="description"
                fullWidth
                helperText={
                  errors["description"]
                    ? errors["description"]
                    : "Ingrese la descripcion"
                }
                error={errors["description"] != null}
                label={"Descripcion"}
                margin="dense"
                name={"description"}
                onChange={handleChange}
                value={data["description"]}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                id="datetime-local"
                type="datetime-local"
                fullWidth
                helperText={
                  errors["start_time"]
                    ? errors["start_time"]
                    : "Por favor ingrese la hora de inicio"
                }
                error={errors["start_time"] != null}
                defaultValue={new Date().toISOString().substr(0, 16)}
                label={"Hora de inicio"}
                margin="dense"
                name="start_time"
                onChange={handleChange}
                value={data["start_time"]}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                id="datetime-local"
                type="datetime-local"
                fullWidth
                helperText={
                  errors["end_time"]
                    ? errors["end_time"]
                    : "Por favor ingrese la hora de fin"
                }
                error={errors["end_time"] != null}
                defaultValue={new Date().toISOString().substr(0, 16)}
                label={"Hora de fin"}
                margin="dense"
                name="end_time"
                onChange={handleChange}
                value={data["end_time"]}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Autocomplete
                name={domainId}
                id="combo-box-demo"
                options={domainList}
                getOptionLabel={(option) => {
                  console.log("option", option);
                  return option.name;
                }}
                defaultValue={
                  reservation
                    ? reservation[domain]
                    : domainList.find(
                        (restaurant) => restaurant.id === data[domainId]
                      )
                }
                style={{ width: "100%" }}
                value={domainList.find(
                  (restaurant) => restaurant.id === data[domainId]
                )}
                onChange={(event, newValue) => {
                  handleChange(null, newValue.id, domainId);
                }}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      label={domainLabel}
                      variant="outlined"
                      helperText={
                        errors[domainId]
                          ? errors[domainId]
                          : `Por favor ingrese el nombre del ${domainLabel}`
                      }
                      error={errors[domainId] != null}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Autocomplete
                name="guest_id"
                id="combo-box-demo"
                options={guests}
                getOptionLabel={(option) =>
                  `${option.first_name} ${option.last_name}`
                }
                style={{ width: "100%" }}
                defaultValue={
                  reservation
                    ? reservation.guest
                    : guests.find((guest) => guest.id === data["guest_id"])
                }
                value={guests.find((guest) => guest.id === data["guest_id"])}
                onChange={(event, newValue) => {
                  handleChange(null, newValue.id, "guest_id");
                }}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      label="Huesped"
                      variant="outlined"
                      helperText={
                        errors[domainId]
                          ? errors[domainId]
                          : `Por favor ingrese el nombre del ${domainLabel}`
                      }
                      error={errors[domainId] != null}
                    />
                  );
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button type="submit" color="primary" variant="contained">
            {reservation == null ? "Crear" : "Actualizar"}
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};
