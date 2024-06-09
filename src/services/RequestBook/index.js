import * as ApiGateway from './../ApiGateway';
import storage from '../../utils/storage';

// call api
const getCategory = async cfg => {
  const api = ApiGateway;
  const accessToken = await storage.get(storage.key.access_token);
  api.setTokenAuthorization(accessToken);
  return await ApiGateway.GET('/category', cfg);
};

// call api
const getStories = async cfg => {
  const api = ApiGateway;
  const accessToken = await storage.get(storage.key.access_token);
  api.setTokenAuthorization(accessToken);
  return await ApiGateway.GET('/stories', cfg);
};

// call api
const getStoriesShow = async (id, cfg) => {
  const api = ApiGateway;
  const accessToken = await storage.get(storage.key.access_token);
  api.setTokenAuthorization(accessToken);
  return await ApiGateway.GET(`/stories/show/${id}`, cfg);
};

// call api
const getChapter = async (id, cfg) => {
  const api = ApiGateway;
  const accessToken = await storage.get(storage.key.access_token);
  api.setTokenAuthorization(accessToken);
  return await ApiGateway.GET(`/chapter/${id}`, cfg);
};

// call api
const getChapterShow = async (id, cfg) => {
  const api = ApiGateway;
  const accessToken = await storage.get(storage.key.access_token);
  api.setTokenAuthorization(accessToken);
  return await ApiGateway.GET(`/chapter/show/${id}`, cfg);
};

// call api
const postWalletStory = async (id, body, cfg) => {
  const api = ApiGateway;
  const accessToken = await storage.get(storage.key.access_token);
  api.setTokenAuthorization(accessToken);
  return await ApiGateway.POST(`/wallet/story/${id}`, body, cfg);
};

export default {
  getCategory,
  getStories,
  getStoriesShow,
  getChapter,
  getChapterShow,
  postWalletStory,
};
