import { baseURL } from "../utils/constants";
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
