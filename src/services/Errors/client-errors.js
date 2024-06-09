export default [
  {
    code: 500,
    message: 'User type is invalid',
    message_vi:
      'Không phải tài khoản publisher. Vui lòng liên hệ với Admin để được hỗ trợ',
  },
  {
    code: 5011,
    message: 'Failed to active email',
    message_vi: 'Tài khoản chưa được kích hoạt.',
  },
  {
    code: 5011,
    message: 'User is inactive',
    message_vi: 'Tài khoản chưa được kích hoạt.',
  },
  {
    code: 500,
    message: 'start_at or end_at is invalid',
    message_vi: 'Thời gian không hợp lệ',
  },
  {
    code: 200,
    message: 'The login name has already been taken.',
    message_vi: 'Tên đăng nhập đã tồn tai.',
  },
  {
    code: 200,
    message: 'The phone number has already been taken.',
    message_vi: 'Số điện thoại đã tồn tại.',
  },
  {
    code: 500,
    message: 'start_at or end_at is invalid',
    message_vi: 'Thời gian không hợp lệ',
  },
  {
    code: null,
    message: 'Your password is incorrect',
    message_vi: 'Mật khẩu của bạn không chính xác',
  },
  {
    code: 0,
    message: 'Failed to get detail influencer via category',
    message_vi: 'Không có dữ liệu',
  },
  {
    code: null,
    message: 'Campaign registration denied',
    message_vi: 'Đăng ký chiến dịch bị từ chối',
  },
  {
    code: 413,
    message: 'Request failed with status code 413',
    message_vi: 'Dung lượng ảnh quá lớn!',
  },
  //Error login SSO
  {
    code: 400,
    message: 'Incorrect Username or Password',
    message_vi: 'Tên đăng nhập hoặc mật khẩu không chính xác.',
  },
  {
    code: 400,
    message: 'User does not exist!',
    message_vi: 'Tên đăng nhập hoặc email không tồn tại.',
  },
  {
    code: 400,
    message: 'User already existed!',
    message_vi: 'Tên đăng nhập hoặc email đã tồn tại.',
  },
  {
    code: 400,
    message: 'Email already existed!',
    message_vi: 'Email đã tồn tại.',
  },
  // ERROR( code: 1 , message: "System is busy (1)"),
  // DAO: ERROR DA0( code: 2 , message: "System is busy (2)"),
  // BusinessLogic: ERROR_BIZ( code: 3 , message: "Incorrect Username or Password"),
  // Workflow: ERROR_WORK FLOW( code: 4 , message: "Workflow is invalid"),
  // Converter: ERROR_CVT( code: 5 , message: "Bad request! Cannot convert request info"),
  // Service: ERROR_ENP( code: 6 , message: "Service API has error"),
  // Not exist USER_NOT EXIST( code: 1000 , message: "User does not exist!"),
  // USER_EXISTED( code: 1001 , message: "User already existed!"),
  // EMAIL_EXISTED( code: 1008 , message: "Email already existed!"),
  // ROLE_NOT EXIST( code: 1002 , message: "Role does not exist!"),
  // ROLE_EXISTED( code: 1010 message: "Role already existed!"),
  // ROLE_EXISTED_IN_USER( code: 1003 , message: "Role existed in User!"),
  // ROLE_NOT EXIST IN_USER( code: 1004 , message: "Role has not exist in User!"),
  // PERMISSION_NOT EXIST( code: 1005 message: "Permission does not exist!"),
  // PERMISSION_EXISTED( code: 1009 message: "Permission already existed!"),
  // PERMISSION_EXISTED_IN_ROLE( code: 1006 , message: "Permission existed in role!"),
  // PERMISSION_NOT EXIST IN_ROLE( code: 1007 , message: "Permission has not exist in role!"),
];
