import clientErrors from './client-errors';

const getError = (code, message) =>
  clientErrors.find(
    item =>
      item?.code == code &&
      item?.message?.toString()?.toUpperCase() ==
        message?.toString()?.toUpperCase(),
  );

const getErrorMessage = res => {
  if (!res.message) {
    return {
      message: 'Có lỗi xảy ra',
    };
  }

  const {code, message} = res;
  const error = getError(code, message);
  if (!error) {
    return res;
  }

  return {
    message: error.message_vi,
    status: res.status,
    code: error.code,
    type: 'client',
  };
};

export default {
  getErrorMessage: res => getErrorMessage(res),
};
