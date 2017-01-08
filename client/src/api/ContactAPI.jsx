import config from './config';

let ContactAPI = (object) => {
  let url = config.API_URL + '/contact';
  return fetch(url, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
    body: JSON.stringify(object)
	})
  .then((res) => {
    return res.json();
  })
  .catch((error) => {
    console.log('API ContactAPI.js: ', error);
  });

}

export default ContactAPI;
