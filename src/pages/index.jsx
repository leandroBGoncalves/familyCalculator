import * as React from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Contexts/AuthContext";
import Head from "next/head";
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  Link,
  Dialog,
  Alert,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import SignUp from "../components/SignUp/SingUp";

const theme = createTheme();

export default function SignIn() {
  const {
    SignIn,
    errorLog,
    loading,
    succesLog,
    handleCloseSignUp,
    openSignUp,
    handleOpenSignUp,
  } = React.useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [visible, setVisible] = React.useState(false);

  async function handleSignIn(data) {
    await SignIn(data);
  }

  return (
    <ThemeProvider theme={theme}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Head>
        <title>Login | Family calculator</title>
      </Head>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {errorLog && (
            <Alert variant="filled" severity="error">
              Não autorizado! Verifique suas informações e tente novamente!
            </Alert>
          )}
          {succesLog && (
            <Alert variant="filled" severity="success">
              Entrando, aguarde...
            </Alert>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit(handleSignIn)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              {...register("email")}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              {...register("password")}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={visible ? "texte" : "password"}
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => setVisible(!visible)}
                  value="visible"
                  color="primary"
                />
              }
              label="Mostrar senha"
            />
            <Button
              onSubmit={handleSubmit}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  onClick={handleOpenSignUp}
                  style={{ cursor: "pointer" }}
                  variant="body2"
                >
                  {"Ainda não tem cadastro? clique aqui"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Dialog open={openSignUp} onClose={handleCloseSignUp}>
        <SignUp />
      </Dialog>
    </ThemeProvider>
  );
}
