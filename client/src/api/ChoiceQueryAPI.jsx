import config from './config';

let SearchQueryAPI = (word) => {
  let url = config.API_URL + '/choice?choice_one=' + word '&choice_two=' + word2;
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
  .then((res) => {
    return res;
  })
  .catch((error) => {
    console.log('API SearchQueryAPI.js: ', error);
  });

}

export default SearchQueryAPI;
