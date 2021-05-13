import { GET_CATEGORY } from "./types";
import { getCategories } from "../services/categoryService";

export const getCategoriesAction = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    getCategories()
      .then((res) => {
        dispatch({
            type: GET_CATEGORY,
            payload: res.data
        });
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};
