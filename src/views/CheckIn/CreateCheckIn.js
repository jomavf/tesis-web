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
import {
  requestCreateOrUpdateItem,
  requestItems,
  requestRooms,
} from "./service";
import { requestGuests } from "../../API";

const useStyles = makeStyles(() => ({
  root: {},
}));

export const CreateCheckIn = ({ name = "", className, location, ...rest }) => {
  const requestCreateOrUpdate = requestCreateOrUpdateItem;
  const requestDomainList = requestRooms;
  const domainId = "room_id";
  const domain = "room";
  const domainLabel = "Habitacion";

  const checkIn = location.state != null ? location.state[domain] : null;
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [guests, setGuests] = useState([]);
  const [domainList, setDomainList] = useState([]);

  const [data, setData] = useState(
    checkIn != null
      ? {
          id: checkIn.id,
          guest_id: checkIn.guest_id,
          [domainId]: checkIn.room_id,
          start_date: checkIn.start_date.substr(0, 16),
          end_date: checkIn.end_date.substr(0, 16),

          language: checkIn.configuration.languaje,
          currency: checkIn.configuration.guest_id,
          should_show_on_boarding: checkIn.configuration.should_show_on_boarding
            ? "1"
            : "0",
        }
      : {
          guest_id: null,
          [domainId]: "",
          start_date: new Date().toISOString().substr(0, 16),
          end_date: new Date().toISOString().substr(0, 16),

          language: "español",
          currency: "soles",
          should_show_on_boarding: "1",
        }
  );

  const [errors, setErrors] = useState({
    guest_id: null,
    [domainId]: null,
    start_date: null,
    end_date: null,

    languaje: null,
    currency: null,
    should_show_on_boarding: null,
  });

  const handleChange = (event, pvalue = null, pname = null) => {
    const value = pvalue || (event ? event.target.value : "");
    const name = pname || (event ? event.target.name : "");
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
        history.push(`/check-in`);
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
          subheader="La información puede ser editada posterior a la creación"
          title="Agregar nueva reserva de habitacion"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                id="datetime-local"
                type="datetime-local"
                fullWidth
                helperText={
                  errors["start_date"]
                    ? errors["start_date"]
                    : "Por favor ingrese la hora de inicio"
                }
                error={errors["start_date"] != null}
                defaultValue={new Date().toISOString().substr(0, 16)}
                label={"Hora de inicio"}
                margin="dense"
                name="start_date"
                onChange={handleChange}
                value={data["start_date"]}
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
                  errors["end_date"]
                    ? errors["end_date"]
                    : "Por favor ingrese la hora de fin"
                }
                error={errors["end_date"] != null}
                defaultValue={new Date().toISOString().substr(0, 16)}
                label={"Hora de fin"}
                margin="dense"
                name="end_date"
                onChange={handleChange}
                value={data["end_date"]}
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
                  return `${option.id}`;
                }}
                defaultValue={
                  checkIn
                    ? checkIn[domain]
                    : domainList.find((item) => item.id === data[domainId])
                }
                style={{ width: "100%" }}
                value={domainList.find((item) => item.id === data[domainId])}
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
                  checkIn
                    ? checkIn.guest
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
            <Grid item md={6} xs={12}>
              <Autocomplete
                name="languaje"
                id="combo-box-demo"
                options={["español", "ingles"]}
                getOptionLabel={(option) => {
                  const [firstLetter, ...rest] = option;
                  return `${firstLetter.toUpperCase()}${rest.join("")}`;
                }}
                style={{ width: "100%" }}
                defaultValue={
                  checkIn ? checkIn.configuration.languaje : "español"
                }
                onChange={(event, newValue) => {
                  debugger;
                  handleChange(null, newValue, "language");
                }}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      label="Idioma"
                      variant="outlined"
                      helperText={
                        errors["language"]
                          ? errors["language"]
                          : `Por favor ingrese el lenguaje`
                      }
                      error={errors["language"] != null}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Autocomplete
                name="currency"
                id="combo-box-demo"
                options={["soles", "euros", "dolares"]}
                getOptionLabel={(option) => {
                  const [firstLetter, ...rest] = option;
                  return `${firstLetter.toUpperCase()}${rest.join("")}`;
                }}
                style={{ width: "100%" }}
                defaultValue={
                  checkIn ? checkIn.configuration.currency : "soles"
                }
                onChange={(event, newValue) => {
                  handleChange(null, newValue, "currency");
                }}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      label="Moneda"
                      variant="outlined"
                      helperText={
                        errors["currency"]
                          ? errors["currency"]
                          : `Por favor ingrese la moneda`
                      }
                      error={errors["currency"] != null}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Autocomplete
                name="should_show_on_boarding"
                id="combo-box-demo"
                options={["1", "0"]}
                getOptionLabel={(option) => {
                  return Boolean(+option) ? "Mostrar" : "No Mostrar";
                }}
                style={{ width: "100%" }}
                defaultValue={checkIn ? checkIn.configuration.currency : true}
                onChange={(event, newValue) => {
                  handleChange(null, newValue, "should_show_on_boarding");
                }}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      label="Mostrar bienvenida"
                      variant="outlined"
                      helperText={
                        errors["should_show_on_boarding"]
                          ? errors["should_show_on_boarding"]
                          : `Por favor ingrese si se debe mostrar pantalla de bienvenida`
                      }
                      error={errors["should_show_on_boarding"] != null}
                    />
                  );
                }}
              />
            </Grid>
            {/* <code>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </code> */}
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button type="submit" color="primary" variant="contained">
            {checkIn == null ? "Crear" : "Actualizar"}
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};
