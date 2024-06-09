import moment from 'moment';

export const formatDay = date => {
  if (date) {
    if (isNaN(date)) {
      return moment(date).format('DD/MM/YYYY'); //parse integer
    }
    return moment(date, 'x').format('DD/MM/YYYY'); //parse string
  }
};

export const formatDayPerMinute = date => {
  if (date) {
    if (isNaN(date)) {
      return moment(date, 'YYYY-MM-DDTHH:mm:ssZZ').format('DD/MM/YYYY'); //parse integer
    }
    return moment(date, 'YYYY-MM-DDTHH:mm:ssZZ').format('DD/MM/YYYY'); //parse string
  }
};

export const formatDate = date => {
  if (date) {
    if (isNaN(date)) {
      return moment(date).format('HH:mm, DD/MM/YYYY'); //parse integer
    }
    return moment(date, 'x').format('HH:mm, DD/MM/YYYY'); //parse string
  }
};

export const formatCash = n => {
  try {
    if (n < 1e3) {
      return n;
    }
    if (n >= 1e3 && n < 1e6) {
      return +(n / 1e3).toFixed(1) + 'k';
    }
    if (n >= 1e6 && n < 1e9) {
      return +(n / 1e6).toFixed(1) + 'm';
    }
    if (n >= 1e9 && n < 1e12) {
      return +(n / 1e9).toFixed(1) + 'b';
    }
    if (n >= 1e12) {
      return +(n / 1e12).toFixed(1) + 't';
    }
  } catch (error) {}
  return n;
};

export const formatCashVND = n => {
  try {
    let m = n;
    if (n < 1e3) {
      m = n;
    }
    if (n >= 1e3 && n < 1e6) {
      m = +(n / 1e3).toFixed(1) + ' nghìn';
    }
    if (n >= 1e6 && n < 1e9) {
      m = +(n / 1e6).toFixed(1) + ' triệu';
    }
    if (n >= 1e9 && n < 1e12) {
      m = +(n / 1e9).toFixed(1) + ' tỷ';
    }
    if (n >= 1e12) {
      m = +(n / 1e12).toFixed(1) + ' nghìn tỷ';
    }
    return m?.split('.').join('.');
  } catch (error) {}
  return n;
};

export const formatVNText = n => {
  try {
    let m = n;
    if (n < 1e3) {
      m = n;
    }
    if (n >= 1e3 && n < 1e6) {
      m = +(n / 1e3).toFixed(1) + ' k';
    }
    if (n >= 1e6 && n < 1e9) {
      m = +(n / 1e6).toFixed(1) + ' tr';
    }
    if (n >= 1e9 && n < 1e12) {
      m = +(n / 1e9).toFixed(1) + ' tỷ';
    }
    if (n >= 1e12) {
      m = +(n / 1e12).toFixed(1) + ' k tỷ';
    }
    return m?.split('.').join('.');
  } catch (error) {}
  return n;
};

export const formatMoney = (text, point = ',') => {
  if (text == 0) {
    return text;
  }
  if (text) {
    let number = text;
    number = String(text).split('.');
    number = String(number).split(',').join('');
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${point}`);
  }
};

export const renderCommissionMonth = (type, commission, note) => {
  switch (type) {
    case 1:
      return `₫${formatMoney(commission * 30)}`;

    case 2:
      return `${commission}%`;

    case 3:
      return note ? `${note}` : '';

    default:
      break;
  }
};

export const renderCommission = (type, commission, note) => {
  switch (type) {
    case 1:
      return `₫${formatMoney(commission)}`;

    case 2:
      return `${commission}%`;

    case 3:
      return note ? `${note}` : '';

    default:
      break;
  }
};

export const renderCommissionType = type => {
  switch (type) {
    case 1:
      return 'Thu nhập';

    case 2:
      return 'Hoa hồng';

    case 3:
      return 'Quà tặng';

    default:
      break;
  }
};

export const capitalizeEachWord = str => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const toEnglish = text => {
  return text
    .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    .replace(/\ /g, '-')
    .replace(/đ/g, 'd')
    .replace(/đ/g, 'd')
    .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ.+/g, 'o')
    .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ.+/g, 'e')
    .replace(/ì|í|ị|ỉ|ĩ/g, 'i');
};

export const formatNumberReport = n => {
  try {
    let m = n;
    if (n < 1e3) {
      m = n;
    }
    if (n >= 1e3 && n < 1e6) {
      m = +(n / 1e3).toFixed(2) + ' k';
    }
    if (n >= 1e6 && n < 1e9) {
      m = +(n / 1e6).toFixed(2) + ' tr';
    }
    if (n >= 1e9 && n < 1e12) {
      m = +(n / 1e9).toFixed(2) + ' tỷ';
    }
    if (n >= 1e12) {
      m = +(n / 1e12).toFixed(2) + ' n tỷ';
    }
    return m?.split('.').join('.');
  } catch (error) {}
  return n;
};

export const regexDomain =
  /(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/;

export const removeVietnameseTones = str => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, ' ');
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ' ',
  );
  return str;
};

export const convertFullName = (last, first) => {
  if (!last && !first) {
    return '-';
  }
  if (last && first) {
    return `${last} ${first}`;
  }
  if (last) {
    return last;
  }
  if (first) {
    return first;
  }
};

export const calTimeRemaining = time => {
  let date = moment(time).toDate();

  if (moment().diff(moment(date), 'minutes') < 1) {
    return 'Vừa xong';
  }
  if (
    moment().diff(moment(date), 'minutes') >= 1 &&
    moment().diff(moment(date), 'minutes') < 61
  ) {
    return `${moment().diff(moment(date), 'minutes')} phút trước`;
  }
  if (
    moment().diff(moment(date), 'hours') >= 1 &&
    moment().diff(moment(date), 'hours') < 24
  ) {
    return `${moment().diff(moment(date), 'hours')} giờ trước`;
  }
  if (
    moment().diff(moment(date), 'days') >= 1 &&
    moment().diff(moment(date), 'days') < 7
  ) {
    return `${moment().diff(moment(date), 'days')} ngày trước`;
  }
  if (
    moment().diff(moment(date), 'weeks') >= 1 &&
    moment().diff(moment(date), 'weeks') < 4
  ) {
    return `${moment().diff(moment(date), 'weeks')} tuần trước`;
  }
  if (
    moment().diff(moment(date), 'months') >= 1 &&
    moment().diff(moment(date), 'months') < 12
  ) {
    return `${moment().diff(moment(date), 'months')} tháng trước`;
  }
  if (moment().diff(moment(date), 'years') === 1) {
    return `${moment().diff(moment(date), 'months')} năm trước`;
  }
  return moment(date).format('DD/MM/YYYY');
};

export const GATEWAY_FORMAT_DATE = 'YYYY-MM-DDTHH:mm:ssZZ';

export const mapContractStatus = status => {
  if (typeof status === 'number') {
    switch (status) {
      case 0:
        return 'REJECTED';
      case 1:
        return 'PENDING';
      case 2:
        return 'APPROVED';
      case 3:
        return 'PAUSED';
      case 4:
        return 'BLOCKED';
      default:
        break;
    }
  }
};

export const calcExpireDate = time => {
  let date = moment(time).toDate();

  if (!time || moment(date).diff(moment(), 'minutes') <= 0) {
    return '';
  }
  if (moment(date).diff(moment(), 'minutes') < 61) {
    return `Hạn còn ${moment(date).diff(moment(), 'minutes')} phút`;
  }
  if (
    moment(date).diff(moment(), 'hours') >= 1 &&
    moment(date).diff(moment(), 'hours') < 24
  ) {
    return `Hạn còn ${moment(date).diff(moment(), 'hours')} giờ`;
  }
  if (
    moment(date).diff(moment(), 'days') >= 1 &&
    moment(date).diff(moment(), 'days') < 7
  ) {
    return `Hạn còn ${moment(date).diff(moment(), 'days')} ngày`;
  }
  if (
    moment(date).diff(moment(), 'weeks') >= 1 &&
    moment(date).diff(moment(), 'weeks') < 4
  ) {
    return `Hạn còn ${moment(date).diff(moment(), 'weeks')} tuần`;
  }
  if (
    moment(date).diff(moment(), 'months') >= 1 &&
    moment(date).diff(moment(), 'months') < 12
  ) {
    return `Hạn còn ${moment(date).diff(moment(), 'months')} tháng`;
  }
  if (moment(date).diff(moment(), 'years') === 1) {
    return `Hạn còn ${moment(date).diff(moment(), 'months')} năm`;
  }
  return `Hạn đến ${moment(date).format('DD/MM/YYYY')}`;
};

export const hiddenUser = username => {
  if (username?.includes('@')) {
    let splitUsername = username?.split('@');
    return `${splitUsername?.[0]?.slice(
      0,
      splitUsername?.[0]?.length - 3,
    )}***@${splitUsername?.[1]}`;
  } else {
    return `${username.slice(0, username?.length - 3)}***`;
  }
};
