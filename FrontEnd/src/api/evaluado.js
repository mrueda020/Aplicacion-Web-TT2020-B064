import { baseURL } from "../utils/constants";
import { getUserId } from "./auth";

export const getGroups = () => {
  const id = getUserId();
  const url = `${baseURL}/cargar-grupos/${id}`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    });
};

export const getExams = (groupId) => {
  const id = getUserId();
  const url = `${baseURL}/cargar-examanes/${id}/${groupId}`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    });
};

export const getEvaluation = (examId) => {
  const id = getUserId();
  const url = `${baseURL}/cargar-examen/${id}/${examId}`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    });
};

export const sendAnswers = (payload) => {
  payload.idEvaluado = getUserId();
  const url = `${baseURL}/enviar-respuestas`;
  const params = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(url, params).then((response) => {
    return response;
  });
};

export const getResults = () => {
  const idEvaluado = getUserId();
  const url = `${baseURL}/resultados/${idEvaluado}`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    });
};

export const updateInfo = (payload) => {
  const idEvaluado = getUserId();
  const url = `${baseURL}/actualizar-info/${idEvaluado}`;
  const params = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(url, params).then((response) => {
    return response;
  });
};
