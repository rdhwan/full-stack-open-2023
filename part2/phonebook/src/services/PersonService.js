import axios from "axios";
const baseUrl = "http://localhost:3001/persons/";

const getPersons = () => {
  return axios
    .get(baseUrl)
    .then((response) => response.data)
    .catch((error) => {
      console.log("Error : ", error);
      throw error;
    });
};

const postPerson = (name, number) => {
  return axios
    .post(
      baseUrl,
      {
        name: name,
        number: number,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => response.data)
    .catch((error) => {
      console.log("Error : ", error);
      throw error;
    });
};

const deletePerson = (id) => {
  return axios
    .delete(baseUrl + id)
    .then((response) => response.data)
    .catch((error) => {
      console.log("Error : ", error);
      throw error;
    });
};

const updatePersonNumber = (id, name, number) => {
  return axios
    .patch(
      baseUrl + id,
      {
        name: name,
        number: number,
        id: id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => response.data)
    .catch((error) => {
      console.log("Error : ", error);
      throw error;
    });
};

export { getPersons, updatePersonNumber, postPerson, deletePerson };
