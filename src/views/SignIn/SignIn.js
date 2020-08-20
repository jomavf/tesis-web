import React, { useState, useEffect } from "react";
import { Link as RouterLink, withRouter, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import validate from "validate.js";
import { makeStyles } from "@material-ui/styles";
import { Grid, Button, TextField, Typography } from "@material-ui/core";
import { requestLogin } from "./services/login";

import { useSnackbar } from "notistack";
import { SUCCESSFUL_OPERATION, WRONG_CREDENTIALS } from "../../constants";

const schema = {
  email: {
    presence: { allowEmpty: false, message: "es requerido" },
    email: { message: "Por favor ingresa un email válido" },
    length: {
      maximum: 64,
    },
  },
  password: {
    // message: "Contraseña tiene que ser válida",
    presence: { allowEmpty: false, message: "es requerido" },
    length: {
      maximum: 128,
    },
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100%",
  },
  grid: {
    height: "100%",
  },
  quoteContainer: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url(/images/auth.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  quoteInner: {
    textAlign: "center",
    flexBasis: "600px",
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300,
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white,
  },
  bio: {
    color: theme.palette.white,
  },
  contentContainer: {},
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  contentHeader: {
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  logoImage: {
    marginLeft: theme.spacing(4),
  },
  contentBody: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  title: {
    marginTop: theme.spacing(3),
  },
  socialButtons: {
    marginTop: theme.spacing(3),
  },
  socialIcon: {
    marginRight: theme.spacing(1),
  },
  sugestion: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  signInButton: {
    margin: theme.spacing(2, 0),
  },
}));

const SignIn = (props) => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = (event) => {
    event.persist();

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    const response = await requestLogin(formState.values);
    console.log("response", response);
    if (response.success) {
      const { data } = response;
      localStorage.setItem("token", data.token);
      history.push("/restaurants");
    } else {
      // show message error while signing in
      history.push("/sign-in");
      enqueueSnackbar(WRONG_CREDENTIALS, { variant: "error" });
    }
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.quoteContainer} item lg={5}>
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography className={classes.quoteText} variant="h1">
                Beber cerveza es fácil. Destrozar tu habitación de hotel es
                fácil. Pero ser un cristiano, eso es una decisión difícil. Eso
                es rebelión.
              </Typography>
              <div className={classes.person}>
                <Typography className={classes.name} variant="body1">
                  JV
                </Typography>
                <Typography className={classes.bio} variant="body2">
                  UPC
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className={classes.content} item lg={7} xs={12}>
          <div className={classes.content}>
            <div className={classes.contentBody}>
              <form className={classes.form} onSubmit={handleSignIn}>
                <Typography
                  align="center"
                  className={classes.title}
                  variant="h2"
                >
                  Inicia sesión
                </Typography>
                <TextField
                  className={classes.textField}
                  error={hasError("email")}
                  fullWidth
                  helperText={
                    hasError("email") ? formState.errors.email[0] : null
                  }
                  label="Correo empresarial"
                  name="email"
                  onChange={handleChange}
                  type="email"
                  value={formState.values.email || ""}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError("password")}
                  fullWidth
                  helperText={
                    hasError("password") ? formState.errors.password[0] : null
                  }
                  label="Contraseña"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.password || ""}
                  variant="outlined"
                />
                <Button
                  className={classes.signInButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Inicia sesión ahora
                </Button>
                {/* <Typography color="textSecondary" variant="body1">
                  Don't have an account?{" "}
                  <Link
                    disabled
                    component={RouterLink}
                    to="/sign-up"
                    variant="h6"
                  >
                    Registrate
                  </Link>
                </Typography> */}
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object,
};

export default withRouter(SignIn);
