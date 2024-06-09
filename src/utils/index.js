import _ from 'lodash';

export const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
};

export const convertObjectToArray = (object, keyName) => {
  const objectArray = Object.entries(object);
  let array = [];
  objectArray.forEach(([key, value]) => {
    array.push({
      [`${keyName}`]: key,
      ...value,
    });
  });
  return array;
};

export const validateEmail = email => {
  return (
    !checkAscent(email) &&
    String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:!#$%^&*\s@"]+(\.[^<>()[\]\\.,;:!#$%^&*\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
  );
};

export const validatePhoneNumber = phoneNumber => {
  var re =
    /(032|033|034|035|036|037|038|039|050|051|052|053|054|055|056|057|058|059|086|096|097|098|0162|0163|0164|0165|0166|0167|0168|0169|081|082|083|084|085|087|088|091|094|0123|0124|0125|0127|0129|070|076|077|078|079|089|090|093|0120|0121|0122|0126|0522|092|0188|0186|099|0199)+([0-9]{7})\b/g;
  return re.test(phoneNumber);
};

const checkAscent = str => {
  if (str === null || str === undefined) {
    return str;
  }
  str = str.toLowerCase();
  return (
    /à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g.test(str) ||
    /è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g.test(str) ||
    /ì|í|ị|ỉ|ĩ/g.test(str) ||
    /ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g.test(str) ||
    /ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g.test(str) ||
    /ỳ|ý|ỵ|ỷ|ỹ/g.test(str) ||
    /đ/g.test(str)
  );
};

export const validateNameHasNumber = name => {
  var re =
    /^([^0-9\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|]*)$/g;
  return re.test(name);
};

export const validateNameHasWhiteSpace = name => {
  var re = /^\S[\s\S]*\S$/;
  return re.test(name);
};
