import * as React from "react";
import { useForm } from "react-hook-form";
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
  Alert,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { AuthContext } from "../../Contexts/AuthContext";
const theme = createTheme();

export default function SignUp() {
  const { 
    SignUp, 
    openErrorCad, 
    openSucessCad, 
    loading, 
    handleCloseSignUp 
  } =
    React.useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  const [showPassword, setShowPassword] = React.useState(false);

  async function handleSignUp(data) {
    await SignUp(data);
  }

  return (
    <ThemeProvider theme={theme}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
            Sign up
          </Typography>
          {openErrorCad && (
            <Alert variant="filled" severity="error">
              Erro! Verifique se todas as informações estão corretas e tente
              novamente!
            </Alert>
          )}
          {openSucessCad && (
            <Alert variant="filled" severity="success">
              Realizando cadastro, aguarde...
            </Alert>
          )}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(handleSignUp)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  {...register("completeName")}
                  required
                  fullWidth
                  id="completeName"
                  label="complete name"
                  name="completeName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("email")}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("password")}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => setShowPassword(!showPassword)}
                      value="allowExtraEmails"
                      color="primary"
                    />
                  }
                  label="Show password."
                />
              </Grid>
            </Grid>
            <Button
              onSubmit={handleSubmit}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Button
              onClick={handleCloseSignUp}
              fullWidth
              variant="outlined"
              sx={{ mt: 1, mb: 2 }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
