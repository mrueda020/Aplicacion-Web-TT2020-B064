import { ACCESS_TOKEN, REFRESH_TOKEN, baseURL } from "../utils/constants";
import jwtDecode from "jwt-decode";

export const getAccesToken = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  if (!accessToken || accessToken === "null") {
    return null;
  }

  return hasExpired(accessToken) ? null : accessToken;
};

export const getRefeshToken = () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  if (!refreshToken || refreshToken === "null") {
    return null;
  }
  return hasExpired(refreshToken) ? null : refreshToken;
};

export const refreshAccessToken = async (refreshToken) => {
  const url = `${baseURL}/refrescar-token`;
  const bodyObj = {
    refreshToken: refreshToken,
  };
  const params = {
    method: "POST",
    body: JSON.stringify(bodyObj),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(url, params)
    .then((response) => {
      if (response.status !== 200) {
        logOut();
        return null;
      }
      return response.json();
    })
    .then((result) => {
      if (!result) {
        logOut();
        window.location.reload();
      } else {
        const { accessToken, refreshToken } = result;
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
        window.location.reload();
      }
    });
};

export const logOut = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

const hasExpired = (token) => {
  const metaToken = jwtDecode(token);
  const { exp } = metaToken;
  const now = Date.now() / 1000;
  return now > exp;
};

export const getUserId = () => {
  const accessToken = getAccesToken();
  if (accessToken) {
    const metaToken = jwtDecode(accessToken);
    const { sub } = metaToken;
    return sub.id;
  }
};
