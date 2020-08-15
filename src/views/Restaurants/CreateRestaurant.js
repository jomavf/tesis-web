import React, { useState } from "react";
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

const useStyles = makeStyles(() => ({
  root: {},
}));

export const CreateRestaurant = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const [values, setValues] = useState({
    name: "",
    description: "",
    capacity: "",
    businessHours: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete="off" noValidate>
        <CardHeader
          subheader="La información puede ser editada posteriar a la creación"
          title="Agregar nuevo restaurante"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Por favor ingresar el nombre del restaurante"
                label="Nombre"
                margin="dense"
                name="name"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Por favor ingresar la descripción del restaurante"
                label="Descripción"
                margin="dense"
                name="description"
                onChange={handleChange}
                required
                value={values.description}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Por favor ingresar la capacidad del restaurante"
                label="Capacidad"
                margin="dense"
                name="capacity"
                onChange={handleChange}
                required
                value={values.capacity}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Por favor ingresar los horarios de atención del restaurante"
                label="Horarios de atención"
                margin="dense"
                name="businessHours"
                onChange={handleChange}
                required
                value={values.businessHours}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" variant="contained">
            Crear
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};
