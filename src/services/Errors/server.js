export default {
  getDefaultMessage: res => ({
    message: 'SERVER.PROBLEM',
    status: res.status,
    type: 'server',
  }),
};
