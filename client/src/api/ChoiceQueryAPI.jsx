import config from './config';

let ChoiceQueryAPI = (words) => {
  let url = config.API_URL + '/search/choice?choice_one=' + words.word1 + '&choice_two=' + words.word2;
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
    console.log('API ChoiceQueryAPI.js: ', error);
  });

}

export default ChoiceQueryAPI;
