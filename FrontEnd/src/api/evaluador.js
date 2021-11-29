import { baseURL } from "../utils/constants";
import { getUserId } from "./auth";
import { getAccesToken } from "./auth";
export const addQuestion = async (payload) => {
  const accessToken = getAccesToken();
  if (accessToken) {
    const url = `${baseURL}/agregar-pregunta`;
    const params = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    };
    const response = await fetch(url, params);
    return response;
  }
};

export const getQuestions = () => {
  const id = getUserId();
  const url = `${baseURL}/preguntas/${id}`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    });
};

export const deleteQuestion = (idPregunta) => {
  const idEvaluador = getUserId();
  const url = `${baseURL}/eliminar-pregunta/${idEvaluador}/${idPregunta}`;
  const params = {
    method: "DELETE",
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    });
};

export const fetchAllQuestions = () => {
  const url = `${baseURL}/cargar-preguntas`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    });
};

export const createExam = (payload) => {
  const url = `${baseURL}/crear-examen`;
  payload.idEvaluador = getUserId();
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

export const getUsers = () => {
  const url = `${baseURL}/obtener-evaluados`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    });
};

export const createGroup = (payload) => {
  const url = `${baseURL}/crear-grupo`;
  payload.idEvaluador = getUserId();
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

export const getExams = () => {
  const url = `${baseURL}/obtener-examenes`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    });
};

export const getGroups = () => {
  const idEvaluador = getUserId();
  const url = `${baseURL}/grupos/${idEvaluador}`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    });
};

export const assignExams = (payload) => {
  payload.idEvaluador = getUserId();
  const url = `${baseURL}/asignar-examen`;
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

export const updateInfo = (payload) => {
  const idEvaluador = getUserId();
  const url = `${baseURL}/actualizar-info-evaluador/${idEvaluador}`;
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
