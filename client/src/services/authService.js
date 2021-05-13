import axios from "axios";
import { Redirect } from "react-router";
import jwtDecode from "jwt-decode";

const API_URL = "http://localhost:5000/";

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

export const register = (Name, Surname, EmailAddress, Password) => {
  return axios
    .post(API_URL + "register", {
      Name,
      Surname,
      EmailAddress,
      Password,
    })
    .then((res) => {
      <Redirect to="/login"></Redirect>;
      return res.data;
    })
    .catch((err) => {
      if (err) throw err;
    });
};
