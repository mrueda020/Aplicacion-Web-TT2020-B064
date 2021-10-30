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
