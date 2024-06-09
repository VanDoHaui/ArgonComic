import * as ApiGateway from '../ApiGateway';
import storage from '../../utils/storage';

// call api
const getBanner = async cfg => {
  const api = ApiGateway;
  const accessToken = await storage.get(storage.key.access_token);
  api.setTokenAuthorization(accessToken);
  return await ApiGateway.GET('/banner', cfg);
};

export default {
  getBanner,
};
