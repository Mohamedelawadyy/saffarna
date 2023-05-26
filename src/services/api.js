import axios from "axios";

const getUser = (username) => {
  axios
    .get(`http://localhost:9000/users/${username}`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
export default getUser;
