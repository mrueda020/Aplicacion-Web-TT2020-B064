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
      return result.data;
    });
};
