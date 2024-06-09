import clientErrors from './client-errors';

const getError = code => clientErrors.find(item => item.code === code);

const getErrorMessage = res => {
  if (res.message == 'Network Error') {
    return {
      message: null,
    };
  }

  if (res.message == 'timeout of 30000ms exceeded') {
    return {
      message: 'Lỗi kết nối. Vui lòng thử lại!',
    };
  }

  if (res.message == 'Request failed with status code 413') {
    return {
      message: 'Tổng dung lượng ảnh quá lớn!',
    };
  }

  return {
    message: res.message,
    status: res.status,
    code: res.code,
  };
};

export default {
  getErrorMessage: res => getErrorMessage(res),
};
