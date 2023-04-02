import React from "react";
import { redirect } from "react-router-dom";

type AuthProps = {
  isAuthenticated: boolean;
  authenticate: Function;
  signout: Function;
};

export const AuthContext = React.createContext({} as AuthProps);

const isValidToken = () => {
  const token = localStorage.getItem("authorization");
  if (token) return true;
  return false;
};

const AuthProvider = (props: any) => {
  const [isAuthenticated, makeAuthenticated] = React.useState(isValidToken());

  function authenticate(token: string) {
    makeAuthenticated(true);
    localStorage.setItem("authorization", `Bearer ${token}`);
  }

  function signout(c: any) {
    makeAuthenticated(false);
    localStorage.removeItem("authorization");
  }
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        signout,
      }}
    >
      <>{props.children}</>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
