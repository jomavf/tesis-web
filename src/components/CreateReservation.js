import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
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
import { TextFieldFormik } from "./TextFieldFormik";
import { useSnackbar } from "notistack";
import { SUCCESSFUL_OPERATION } from "../constants";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextDatetimeFieldFormik } from "./TextDatetimeFieldFormik";

const useStyles = makeStyles(() => ({
  root: {},
}));

const CreateRestaurantSchema = Yup.object().shape({
  name: Yup.string().required("*Este campo es requerido"),
  description: Yup.string().required("*Este campo es requerido"),
  imgUrl: Yup.string()
    .matches(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
      "Porfavor ingresar el formato de URL"
    )
    .required("*Este campo es requerido"),
});

export const CreateReservation = ({
  name = "",
  className,
  requestCreateOrUpdate,
  requestGuests,
  requestDomainList,
  location,
  ...rest
}) => {
  const reservation =
    location.state != null ? location.state.reservation : null;
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [guests, setGuests] = useState([]);
  const [domainList, setDomainList] = useState([]);

  const formik = useFormik({
    initialValues: reservation || {
      guest_id: "",
      description: "",
      restaurant_id: "",
      start_time: null,
      end_time: null,
    },
    onSubmit: async (values) => {
      try {
        const result = await requestCreateOrUpdate({
          ...values,
        });
        if (result.success) {
          history.push("/restaurants/reservations");
          enqueueSnackbar(SUCCESSFUL_OPERATION, { variant: "success" });
        }
      } catch (error) {
        console.log("some error ocurred!", error);
      }
    },
    validationSchema: CreateRestaurantSchema,
  });
  const requestComboBoxItems = async () => {
    try {
      const guests = await requestGuests();
      setGuests(guests);
      const domainList = await requestDomainList();
      setDomainList(domainList);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    requestComboBoxItems();
  }, []);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <CardHeader
          subheader="La información puede ser editada posteriar a la creación"
          title="Agregar nueva reserva"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextFieldFormik
                formik={formik}
                label="Descripcion"
                name="description"
                helperTextDefault={
                  "Por favor ingrese la descripcion de la reserva"
                }
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextDatetimeFieldFormik
                formik={formik}
                label="Hora inicio"
                name="start_time"
                helperTextDefault={"Por favor ingrese la fecha de inicio"}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextDatetimeFieldFormik
                formik={formik}
                label="Hora fin"
                name="end_time"
                helperTextDefault={"Por favor ingrese la fecha de fin"}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Autocomplete
                id="combo-box-demo"
                options={domainList}
                getOptionLabel={(option) => option.title}
                style={{ width: "100%" }}
                renderInput={(params) => {
                  return (
                    <TextFieldFormik
                      {...params}
                      formik={formik}
                      name="restaurant_id"
                      label="Restaurante"
                    />
                  );
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Autocomplete
                id="combo-box-demo"
                options={guests}
                getOptionLabel={(option) => option.title}
                style={{ width: "100%" }}
                renderInput={(params) => {
                  return (
                    <TextFieldFormik
                      {...params}
                      formik={formik}
                      name="guest_id"
                      label="Huesped"
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
