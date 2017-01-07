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

};

export default FeedbackAPI;