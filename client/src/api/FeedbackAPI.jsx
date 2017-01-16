import config from './config';

let FeedbackAPI = {

  addFeedback: function (id, payload) {
    let url = config.API_URL + '/feedback/user/' + id;
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
      console.log('API addFeedback FeedbackAPI.js: ', error);
    });
  },

  getAllFeedbacks: function (params) {
    let url = config.API_URL + '/feedback' + '?' + params ;
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
      console.log('API getAllFeedbacks FeedbackAPI.js: ', error);
    });
  },

  deleteFeedbackById: function (id) {
    let url = config.API_URL + '/feedback/' + id;
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
      console.log('API deleteFeedbackById FeedbackAPI.js: ', error);
    });
  },

};

export default FeedbackAPI;
