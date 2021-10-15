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
      console.log(result);
      return result;
    });
};
