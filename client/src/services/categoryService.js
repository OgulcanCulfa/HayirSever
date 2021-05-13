import axios from "axios";

const API_URL = "http://localhost:5000/";

export const getCategories = () => {
  return axios
    .get(API_URL + "category", {
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};