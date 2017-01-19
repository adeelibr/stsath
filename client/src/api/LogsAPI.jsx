import config from './config';

let LogsAPI = {

  getLogs: function () {
    let url = config.API_URL + '/logs/';
    let token = localStorage.getItem('admintoken');

    return fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + " " + token
      }
    })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.log('API getLogs LogsAPI.js: ', error);
    });
  },

  deleteLogById: function (id) {
    let url = config.API_URL + '/logs/' + id;
    let token = localStorage.getItem('admintoken');

    return fetch(url, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + " " + token
      }
    })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.log('API deleteLogById LogsAPI.js: ', error);
    });
  },

};

export default LogsAPI;
