import axios from "axios";
import { heroku } from "../environments/index";

const API_URL = heroku;

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