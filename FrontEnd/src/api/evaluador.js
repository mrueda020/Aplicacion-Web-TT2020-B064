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
  const accessToken = getAccesToken();
  const url = `${baseURL}/preguntas/${id}`;
  const params = {
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

export const deleteQuestion = (idPregunta) => {
  const accessToken = getAccesToken();
  const idEvaluador = getUserId();
  const url = `${baseURL}/eliminar-pregunta/${idEvaluador}/${idPregunta}`;
  const params = {
    method: "DELETE",
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

export const fetchAllQuestions = () => {
  const accessToken = getAccesToken();
  const url = `${baseURL}/cargar-preguntas`;
  const params = {
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

export const createExam = (payload) => {
  const accessToken = getAccesToken();
  const url = `${baseURL}/crear-examen`;
  payload.idEvaluador = getUserId();
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

export const getUsers = () => {
  const accessToken = getAccesToken();
  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  };
  const url = `${baseURL}/obtener-evaluados`;
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    });
};

export const createGroup = (payload) => {
  const accessToken = getAccesToken();
  const url = `${baseURL}/crear-grupo`;
  payload.idEvaluador = getUserId();
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

export const getExams = () => {
  const accessToken = getAccesToken();
  const url = `${baseURL}/obtener-examenes`;
  const params = {
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

export const getGroups = () => {
  const accessToken = getAccesToken();
  const idEvaluador = getUserId();
  const url = `${baseURL}/grupos/${idEvaluador}`;
  const params = {
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

export const assignExams = (payload) => {
  const accessToken = getAccesToken();
  payload.idEvaluador = getUserId();
  const url = `${baseURL}/asignar-examen`;
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

export const updateInfo = (payload) => {
  const accessToken = getAccesToken();
  const idEvaluador = getUserId();
  const url = `${baseURL}/actualizar-info-evaluador/${idEvaluador}`;
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

export const fetchExams = () => {
  const idEvaluador = getUserId();
  const url = `${baseURL}/obtener-examenes/${idEvaluador}`;
  const accessToken = getAccesToken();
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

export const deleteExam = (idExamen) => {
  const idEvaluador = getUserId();
  const url = `${baseURL}/eliminar-examen/${idEvaluador}/${idExamen}`;
  const accessToken = getAccesToken();
  const params = {
    method: "DELETE",
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

export const deleteGroup = (idGroup) => {
  const idEvaluador = getUserId();
  const url = `${baseURL}/eliminar-grupo/${idEvaluador}/${idGroup}`;
  const accessToken = getAccesToken();
  const params = {
    method: "DELETE",
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
