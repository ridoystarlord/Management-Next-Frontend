import axios from 'axios';

import { API_URL } from 'environment';
import { LoginForm } from 'pages';

export type LoginUserResponse = {
  token: string;
  role: string;
};

export const login = () => {
  return {
    api(input: LoginForm) {
      return axios
        .post(`${API_URL}/user/login`, input)
        .then(({ data }) => data);
    },
    getKey() {
      return ['login'];
    },
  };
};

export const getUser = () => {
  return {
    api() {
      return axios.get<LoginUserResponse>('/api/user').then((res) => res.data);
    },
    getKey() {
      return ['user', 'session'];
    },
  };
};

export const sessionLogin = (input: LoginUserResponse) =>
  axios.post('/api/login', input).then((res) => res.data);

export const sessionLogout = () =>
  axios.post<{}>('/api/logout').then((res) => res.data);
