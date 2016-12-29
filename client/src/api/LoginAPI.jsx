import config from './config';

let LoginAPI = (object) => {
  let url = config.API_URL + '/login';
  return fetch(url, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
    body: JSON.stringify(object)
	})
  .then((res) => {
    return res.json()
  })
  // .then((res) => {
  //   return res;
  // })
  .catch((error) => {
    console.log('API LoginAPI.js: ', error);
  });

}

export default LoginAPI;
