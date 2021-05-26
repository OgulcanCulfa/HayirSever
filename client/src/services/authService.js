import axios from "axios";
import jwtDecode from "jwt-decode";
import { heroku } from "../environments/index";

const API_URL = heroku;

export const login = (EmailAddress, Password) => {
  return axios
    .post(API_URL + "login", { EmailAddress, Password })
    .then((res) => {
      localStorage.setItem("token", JSON.stringify(res.data.token));
      const user = jwtDecode(res.data.token);
      return user;
    })
    .catch((err) => {
      throw err;
    });
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const register = (
  Name,
  Surname,
  EmailAddress,
  Password,
  department,
  classNum
) => {
  return axios
    .post(API_URL + "register", {
      Name,
      Surname,
      EmailAddress,
      Password,
      department,
      classNum,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};
