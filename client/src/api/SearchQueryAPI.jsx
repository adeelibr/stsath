import config from './config';

let SearchQueryAPI = (word) => {
  let url = config.API_URL + '/search/query?word=' + word;
  return fetch(url, {
		method: 'GET',
		headers: {
			"Content-Type": "application/json",
		}
	})
  .then((res) => {
    return res.json();
  })
  .catch((error) => {
    console.log('API SearchQueryAPI.js: ', error);
  });

}

export default SearchQueryAPI;
