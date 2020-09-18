import axios from 'axios';
import { SERVER_URL } from './constants';
import { DataType } from './types';

export const postOrderData = (data: DataType): any => {
  const res = axios.post(SERVER_URL, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return res;
};
