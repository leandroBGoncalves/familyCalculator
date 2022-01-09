import { createContext, useState } from "react";
import { supabase } from "../services/supraClient";
import { setCookie } from "nookies";
import Router from "next/router";
import moment from "moment";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [openErrorCad, setOpenErrorCad] = useState(false);
  const [openSucessCad, setOpenSucessCad] = useState(false);
  const [sessionCad, setSessionCad] = useState([]);
  const [errorCad, setErrorCad] = useState([]);

  const [userBack, setUserBack] = useState([]);
  const [useSession, setUseSession] = useState([]);
  const [errorLog, setErrorLog] = useState(false);
  const [succesLog, setSuccesLog] = useState(false);

  const [openSignUp, setOpenSignUp] = useState(false);

  const [body, setBody] = useState([]);
  const [errorData ,setErrorData] = useState(false);
  const [succesData ,setSuccesData] = useState(false);

  async function getData() {
    setLoading(true)
    const { data, error } =  await supabase
      .from("despesasmes")
      .select("*")

      if (error) {
          setErrorData(true);
          setLoading(false);
      } else {
        setBody(data);
        setSuccesData(true);
        setErrorData(false);
        setLoading(false);
      }
  }

  function handleCloseSignUp() {
    setOpenSignUp(false);
  }

  function handleOpenSignUp() {
    setOpenSignUp(true);
  }

  async function SignUp({ completeName, email, password }) {
    setLoading(true);
    const { user, session, error } = await supabase.auth.signUp(
      {
        email: email,
        password: password,
      },
      {
        data: {
          first_name: completeName,
        },
      }
    );
    setLoading(false);
    if (error) {
      setOpenErrorCad(true);
      setErrorCad(error);
    } else {
      setOpenErrorCad(false);
      setOpenErrorCad(false);
      setOpenSucessCad(true);
      setSessionCad(session);
      setTimeout(() => {
        handleCloseSignUp();
      }, 3000);
    }
  }

  async function SignIn({ email, password }) {
    setLoading(true);
    const { user, session, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });

    if (error) {
      setLoading(false);
      setErrorLog(true);
    } else {
      setCookie(undefined, "Family_token", session.access_token, {
        maxAge: 60 * 120 * 1,
      });
      setUserBack(user);
      setUseSession(session);
      Router.push("/home");
      setLoading(false);
      setSuccesLog(true);
      setErrorLog(false);
    }
  }


  return (
    <AuthContext.Provider
      value={{
        SignUp,
        sessionCad,
        openSucessCad,
        openErrorCad,
        errorCad,
        openSignUp,
        handleCloseSignUp,
        handleOpenSignUp,
        SignIn,
        userBack,
        useSession,
        errorLog,
        loading,
        succesLog,
        errorData,
        succesData,
        getData,
        body,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
