import React, { useState } from "react";
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
import { requestCreateOrUpdate } from "./service";
import { useHistory } from "react-router-dom";
import { TextFieldFormik } from "../../components/TextFieldFormik";
import { SUCCESSFUL_OPERATION } from "../../constants";
import { useSnackbar } from "notistack";

const CreateGymSchema = Yup.object().shape({
  name: Yup.string().required("*Este campo es requerido"),
  description: Yup.string().required("*Este campo es requerido"),
  imgUrl: Yup.string()
    .matches(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
      "Porfavor ingresar el formato de URL"
    )
    .required("*Este campo es requerido"),
});

const useStyles = makeStyles(() => ({
  root: {},
}));

export const CreateGym = ({ className, location, ...rest }) => {
  const gym = location.state != null ? location.state.gym : null;
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: gym || {
      name: "",
      description: "",
      imgUrl: "",
    },
    onSubmit: async (values) => {
      try {
        const result = await requestCreateOrUpdate(values);
        if (result.success) {
          history.push("/gyms");
          enqueueSnackbar(SUCCESSFUL_OPERATION, { variant: "success" });
        }
      } catch (error) {
        console.log("some error ocurred!", error);
      }
    },
    validationSchema: CreateGymSchema,
  });

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <CardHeader
          subheader="La información puede ser editada posteriar a la creación"
          title="Agregar nuevo gyme"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextFieldFormik
                formik={formik}
                label="Nombre"
                name="name"
                helperTextDefault={"Por favor ingrese el nombre del gimnasio"}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextFieldFormik
                formik={formik}
                label="Descripción"
                name="description"
                helperTextDefault={
                  "Por favor ingrese la descripción del gimnasio"
                }
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextFieldFormik
                formik={formik}
                label="Imagen (URL)"
                name="imgUrl"
                helperTextDefault={
                  "Por favor ingresar una url de la imagen del gimnasio"
                }
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button type="submit" color="primary" variant="contained">
            {gym == null ? "Crear" : "Actualizar"}
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};
