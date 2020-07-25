import axios from "axios";
import { addHistory } from "./historicAction";
export const GET_USERS_LIST = "GET_USERS_LIST";
export const GET_USER_DETAIL = "GET_USER_DETAIL";
export const POST_USER_CREATE = "POST_USER_CREATE";
export const PUT_USER_EDIT = "PUT_USER_EDIT";


axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');

export const getUsersList = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:3001/products/")
      .then(function (response) {
        dispatch({
          type: GET_USERS_LIST,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_USERS_LIST,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getUserDetail = (id) => {
  return (dispatch) => {
    axios
      .get("http://localhost:3001/products/" + id)
      .then(function (response) {
        dispatch({
          type: GET_USER_DETAIL,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_USER_DETAIL,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const postUserCreate = (data, currentUser) => {
  return (dispatch) => {
    const formData = new FormData();
    formData.append("photo", data.photo[0]);
    formData.set("annee", data.annee);
    formData.set("commentaire", data.commentaire);
    formData.set("createur", data.createur);
    formData.set("gamme", data.gamme);
    formData.set("mesure", data.mesure);
    formData.set("modele", data.modele);
    formData.set("name", data.name);
    formData.set("saison", data.saison);
    formData.set("sex", data.sex);
    formData.set("qte", data.qte);


    axios
      .post("http://localhost:3001/products/", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then(function (response) {
        //historic
        let y = {
          date: new Date(),
          operation: "création de produit",
          name: data.name,
          modele: data.modele,
          username: currentUser.userName,
        };
        dispatch(addHistory(y));
        //historic
        console.log(response);

        dispatch({
          type: POST_USER_CREATE,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: POST_USER_CREATE,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const putUserUpdate = (data, id, currentUser) => {
  console.log("iddddddddddddd : ", id);
  const formData = new FormData();
  formData.append("photo", data.photo[0]);
  formData.set("annee", data.annee);
  formData.set("commentaire", data.commentaire);
  formData.set("createur", data.createur);
  formData.set("gamme", data.gamme);
  formData.set("mesure", data.mesure);
  formData.set("modele", data.modele);
  formData.set("name", data.name);
  formData.set("saison", data.saison);
  formData.set("sex", data.sex);
  formData.set("qte", data.qte);
  return (dispatch) => {
    axios
      .put("http://localhost:3001/products/" + id, formData, {
        headers: {
          "content-type": "multipart/form-data",
        }
      })
      .then(function (response) {
        //historic
        let y = {
          date: new Date(),
          operation: "produit actualisé",
          name: data.name,
          modele: data.modele,
          username: currentUser.userName,
        };
        console.log("y", y);

        dispatch(addHistory(y));
        //historic
        console.log(response);

        dispatch({
          type: PUT_USER_EDIT,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: PUT_USER_EDIT,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const deleteUser = (row, currentUser) => {
  console.log("delete user action");

  return (dispatch) => {
    axios
      .delete("http://localhost:3001/products/" + row._id)
      .then((response) => {
        console.log(response);
        //historic
        let y = {
          date: new Date(),
          operation: "Suppression de produit",
          name: row.name,
          modele: row.modele,
          username: currentUser.userName,
        };
        console.log("y", y);
        dispatch(getUsersList());
        dispatch(addHistory(y));
        //historic
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const deleteDataUser = () => {
  return (dispatch) => {
    dispatch({
      type: GET_USER_DETAIL,
      payload: {
        data: false,
        errorMessage: false,
      },
    });

    dispatch({
      type: POST_USER_CREATE,
      payload: {
        data: false,
        errorMessage: false,
      },
    });
  };
};
