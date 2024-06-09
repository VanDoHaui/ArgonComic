import * as ApiGateway from '../ApiGateway';
import storage from '../../utils/storage';

// call api
const postLogin = async (body, cfg) => {
  return await ApiGateway.POST('/login', body, cfg);
};

// call api
const postRegister = async (body, cfg) => {
  return await ApiGateway.POST('/register', body, cfg);
};

// call api
const getUser = async cfg => {
  const api = ApiGateway;
  const accessToken = await storage.get(storage.key.access_token);
  api.setTokenAuthorization(accessToken);
  return await ApiGateway.GET('/user', cfg);
};

export default {
  postLogin,
  postRegister,
  getUser,
};
