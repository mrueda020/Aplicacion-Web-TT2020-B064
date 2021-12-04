import { baseURL } from "../utils/constants";
import { getAccesToken, getUserId } from "./auth";

export const getGroups = () => {
  const accessToken = getAccesToken();
  const id = getUserId();
  const url = `${baseURL}/cargar-grupos/${id}`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    });
};

export const getExams = (groupId) => {
  const accessToken = getAccesToken();
  const id = getUserId();
  const url = `${baseURL}/cargar-examanes/${id}/${groupId}`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    });
};

export const getEvaluation = (examId, groupId) => {
  const accessToken = getAccesToken();
  const id = getUserId();
  const url = `${baseURL}/cargar-examen/${id}/${examId}/${groupId}`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    });
};

export const sendAnswers = (payload) => {
  const accessToken = getAccesToken();
  payload.idEvaluado = getUserId();
  const url = `${baseURL}/enviar-respuestas`;
  const params = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  };
  return fetch(url, params).then((response) => {
    return response;
  });
};

export const getResults = () => {
  const accessToken = getAccesToken();
  const idEvaluado = getUserId();
  const url = `${baseURL}/resultados/${idEvaluado}`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    });
};

export const updateInfo = (payload) => {
  const accessToken = getAccesToken();
  const idEvaluado = getUserId();
  const url = `${baseURL}/actualizar-info/${idEvaluado}`;
  const params = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  };
  return fetch(url, params).then((response) => {
    return response;
  });
};
