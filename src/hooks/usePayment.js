import {useState} from 'react';
import RequestBook from '../services/RequestBook';

export const usePayment = () => {
  const [isLoadingPayment, setLoadingBuy] = useState(false);

  const payBook = async bookId => {
    try {
      setLoadingBuy(true);
      const body = {};
      const walletRes = await RequestBook.postWalletStory(bookId, body, {});
      setLoadingBuy(false);
      if (walletRes?.data?.message) {
        return {
          status: 'success',
          message: walletRes?.data?.message,
        };
      }
    } catch (error) {
      setLoadingBuy(false);
      console.log(error);
      return {
        status: 'fail',
        message: error?.message,
      };
    }
  };

  return {isLoadingPayment, payBook};
};
