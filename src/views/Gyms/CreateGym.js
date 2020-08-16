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
import { requestCreateOrUpdate } from "./service";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {},
}));

export const CreateGym = ({ className, location, ...rest }) => {
  const gym = location.state != null ? location.state.gym : null;
  const classes = useStyles();
  const history = useHistory();

  const [values, setValues] = useState(
    gym || {
      name: "",
      description: "",
      imgUrl: "",
    }
  );

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnCreate = async () => {
    try {
      const result = await requestCreateOrUpdate(values);
      if (result.ok) {
        history.push("/gyms");
      }
    } catch (error) {
      console.log("some error ocurred!", error);
    }
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete="off" noValidate>
        <CardHeader
          subheader="La información puede ser editada posteriar a la creación"
          title="Agregar nuevo gyme"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Por favor ingresar el nombre del gyme"
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
                helperText="Por favor ingresar la descripción del gyme"
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
                helperText="Por favor ingresar una url de la imagen del gyme"
                label="Imagen (URL)"
                margin="dense"
                name="imgUrl"
                onChange={handleChange}
                required
                value={values.imgUrl}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" variant="contained" onClick={handleOnCreate}>
            {gym == null ? "Crear" : "Actualizar"}
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};
