import config from './config';

let UserAPI = {

  getUserById: function (id) {
    let url = config.API_URL + '/user/' + id;
    let token = localStorage.getItem('token');

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
      console.log('API getUserById UserAPI.js: ', error);
    });
  },

  getAllUsers: function (id) {
    let url = config.API_URL + '/user/';
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
      console.log('API getAllUsers UserAPI.js: ', error);
    });
  },

  toggleUserStatus: function (id) {
    let url = config.API_URL + '/user/status/' + id;
    let token = localStorage.getItem('admintoken');

    return fetch(url, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + " " + token
      }
    })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.log('API toggleUserStatus UserAPI.js: ', error);
    });
  },

  updateUserById: function (id, payload) {
    let url = config.API_URL + '/user/' + id;
    let token = localStorage.getItem('token');

    return fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + " " + token
      },
      body: JSON.stringify(payload)
    })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.log('API getUserById UserAPI.js: ', error);
    });
  },

  updateUserPasswordById: function (id, payload) {
    let url = config.API_URL + '/user/' + id + '/passwordchange';
    let token = localStorage.getItem('token');

    return fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + " " + token
      },
      body: JSON.stringify(payload)
    })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.log('API getUserById UserAPI.js: ', error);
    });
  }

};

export default UserAPI;
