import moment from 'moment';

/**
 * Check expireDate
 * @param {string} expireDate
 */
export const checkExpireDate = expireDate => {
  if (!expireDate) {
    return false;
  }

  const currentTime = moment().valueOf(),
    expiredTime = moment(expireDate).valueOf();
  return expiredTime < currentTime;
};

/**
 * Create expire time
 * expire milliseconds
 * @param {number} expire
 */
export const createExpiredDate = expire => {
  // if expire is 0 or undefined or null, return null
  if (!expire) {
    return null;
  }

  const expiredTime = moment().valueOf() + Number(expire);
  return expiredTime;
};
