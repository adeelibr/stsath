var jwtDecode = require('jwt-decode');

let AuthToken = (token) => {
  let decodedToken = jwtDecode(token);
  let tokenHasNotExpired = (decodedToken.exp < new Date().getTime());

  if (tokenHasNotExpired) {
    localStorage.setItem('userInfo', JSON.stringify(decodedToken));
  } else {
    localStorage.removeItem('token');
  }

};

let RemoveToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userInfo');
}

export {AuthToken};
export {RemoveToken};
