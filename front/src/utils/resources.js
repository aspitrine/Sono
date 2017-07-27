import axios from 'axios';

import { API_BASE } from '../config/constants';

// Resources for /posts endpoint on API
// @see https://github.com/mzabriskie/axios#creating-an-instance
export const axiosResource = axios.create({
  baseURL: `${API_BASE}`,
  withCredentials: true
});
