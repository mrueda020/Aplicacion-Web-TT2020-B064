import React, { useState, useEffect, createContext } from "react";
import {
  getAccesToken,
  getRefeshToken,
  refreshAccessToken,
  logOut,
} from "../api/auth";

import jwtDecode from "jwt-decode";

function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState({
    user: null,
    isLoading: true,
  });
  useEffect(() => {
    checkUser(setUser);
  }, []);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

const checkUser = (setUser) => {
  const accessToken = getAccesToken();
  if (!accessToken) {
    const refreshToken = getRefeshToken();
    if (!refreshToken) {
      logOut();
      setUser({ user: null, isLoading: false });
    } else {
      refreshAccessToken(refreshToken);
    }
  } else {
    const payload = jwtDecode(accessToken);

    setUser({ isLoading: false, user: payload.sub });
  }
};

export const AuthContext = createContext();
export default AuthProvider;
