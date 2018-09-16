import superagent from 'superagent';
import routes from '../utils/routes';
import { deleteCookie } from '../utils/cookie';
import { TOKEN_COOKIE_KEY } from '../utils/constants';

const setToken = token => ({
  type: 'TOKEN_SET',
  payload: token,
});

const removeToken = () => ({
  type: 'TOKEN_REMOVE',
});

const logout = () => {
  deleteCookie(TOKEN_COOKIE_KEY);
  return removeToken();
};

const loginRequest = password => (store) => {
  // const API_URL = 'http://localhost:8000';
  return superagent.post(`/api${routes.LOGIN}`)
    .send({ password })
    .then((response) => {
      const { token } = response.body;
      return store.dispatch(setToken(token));
    });
};

export { loginRequest, logout };
