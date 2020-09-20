import React, { useEffect, useState } from "react";
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
import { useSnackbar } from "notistack";
import { SUCCESSFUL_OPERATION } from "../../constants";
import { requestCategories } from "./service";

const useStyles = makeStyles(() => ({
  root: {},
}));

const CreateRestaurantSchema = Yup.object().shape({
  name: Yup.string().required("*Este campo es requerido"),
  description: Yup.string().required("*Este campo es requerido"),
  quantity: Yup.string().required("*Este campo es requerido"),
  price: Yup.string().required("*Este campo es requerido"),
  has_stock: Yup.string().required("*Este campo es requerido"),
  product_category_id: Yup.string().required("*Este campo es requerido"),
  img_url: Yup.string()
    .matches(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
      "Porfavor ingresar el formato de URL"
    )
    .required("*Este campo es requerido"),
});

export const CreateProduct = ({ className, location, ...rest }) => {
  const domain = "product";
  const domainLabel = "Producto";
  const item = location.state != null ? location.state[domain] : null;
  const classes = useStyles();
  const history = useHistory();
  const [categories, setCategories] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: item
      ? {
          id: item.id,
          name: item.name,
          description: item.description,
          img_url: item.img_url,
          price: item.price,
          quantity: item.quantity,
          has_stock: item.has_stock ? "1" : "0",
          product_category_id: `${item.product_category_id}`, // TODO: fix hardcode value
          active: item.active,
        }
      : {
          name: "",
          description: "",
          img_url: "",
          price: "",
          quantity: "",
          has_stock: "0",
          product_category_id: "1", // TODO: fix hardcode value
          active: true,
        },
    onSubmit: async (values) => {
      try {
        const result = await requestCreateOrUpdate({
          ...values,
        });
        if (result.success) {
          history.push(`/${domain}s`);
          enqueueSnackbar(SUCCESSFUL_OPERATION, { variant: "success" });
        }
      } catch (error) {
        console.log("some error ocurred!", error);
      }
    },
    validationSchema: CreateRestaurantSchema,
  });

  const getCategories = async () => {
    const { success, data } = await requestCategories();
    if (success) {
      setCategories(data);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <CardHeader
          subheader="La información puede ser editada posteriar a la creación"
          title={`Agregar nuevo ${domainLabel}`}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextFieldFormik
                formik={formik}
                label="Nombre"
                name="name"
                helperTextDefault={`Por favor ingrese el nombre del ${domainLabel}`}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextFieldFormik
                formik={formik}
                label="Descripción"
                name="description"
                helperTextDefault={`Por favor ingrese la descripción del ${domainLabel}`}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextFieldFormik
                formik={formik}
                label="Precio"
                name="price"
                helperTextDefault={`Por favor ingrese el precio del ${domainLabel}`}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextFieldFormik
                formik={formik}
                label="Cantidad"
                name="quantity"
                helperTextDefault={`Por favor ingrese la cantidad del ${domainLabel}`}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextFieldFormik
                formik={formik}
                label="Imagen (URL)"
                name="img_url"
                helperTextDefault={`Por favor ingresar una url de la imagen del ${domainLabel}`}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              {
                <select
                  style={{
                    width: "100%",
                    padding: "0.7rem 0.6rem",
                    fontSize: "0.9rem",
                    borderRadius: "5px",
                    borderColor: "lightgray",
                  }}
                  name="has_stock"
                  onChange={(e) => {
                    console.log(e.target.value);
                    formik.setFieldValue("has_stock", e.target.value);
                  }}
                >
                  {[
                    { label: "No", value: "0" },
                    { label: "Si", value: "1" },
                  ].map((c, index) => (
                    <option
                      key={index}
                      value={item ? item.has_stock : c.value}
                      defaultValue={item ? item.has_stock : c.value}
                      selected={item && item.has_stock === Boolean(+c.value)}
                      defaultChecked={item ? item.has_stock : index === 1}
                    >
                      {c.label}
                    </option>
                  ))}
                </select>
              }
            </Grid>
            <Grid item md={6} xs={12}>
              {categories && categories.length > 0 && (
                <select
                  style={{
                    width: "100%",
                    padding: "0.7rem 0.6rem",
                    fontSize: "0.9rem",
                    borderRadius: "5px",
                    borderColor: "lightgray",
                  }}
                  name="product_category_id"
                  onChange={formik.handleChange}
                >
                  {categories.map((c, index) => (
                    <option
                      key={index}
                      value={c.id}
                      selected={item && item.product_category_id === +c.id}
                    >
                      {c.name}
                    </option>
                  ))}
                </select>
              )}
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button type="submit" color="primary" variant="contained">
            {item == null ? "Crear" : "Actualizar"}
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};
